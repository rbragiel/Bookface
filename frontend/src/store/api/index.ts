import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FriendsApiEndpoints } from "@api/friends";
import { InvitationApiEndpoints } from "@api/invitations";
import {
  Choice,
  GetFriendsResponse,
  GetUserResponse,
  InvitedResponse,
  InviteesResponse,
  Post,
} from "./types";
import { getTokenFromLS } from "@store/auth";
import { PostsApiEndpoints } from "@api/posts";
import { ReactionsApiEndpoints } from "@api/reactions";

enum FriendsApiTagTypes {
  FRIENDS = "FRIENDS",
}

enum InvitationsApiTagTypes {
  INVITED = "INVITED",
  INVITEES = "INVITEES",
}

enum PostApiTagTypes {
  USER_POSTS = "USER_POSTS",
  USER_POST = "USER_POST",
  POST = "POST",
  POSTS = "POSTS",
}

const UserRootTag = "User";

const baseUrl = "/api";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getTokenFromLS();
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: Object.keys(FriendsApiTagTypes).concat(
    Object.keys(InvitationsApiTagTypes)
  ),
  endpoints: (builder) => ({
    getFriends: builder.query<GetFriendsResponse, void>({
      query: () => FriendsApiEndpoints.getUrl,
      providesTags: [FriendsApiTagTypes.FRIENDS],
    }),
    getAllInvitees: builder.query<InviteesResponse, void>({
      query: () => InvitationApiEndpoints.inviteesUrl,
      providesTags: [InvitationsApiTagTypes.INVITEES],
    }),
    getAllInvited: builder.query<InvitedResponse, void>({
      query: () => InvitationApiEndpoints.invitedUrl,
      providesTags: [InvitationsApiTagTypes.INVITED],
    }),
    addPost: builder.mutation<unknown, { data: FormData }>({
      query: ({ data }) => ({
        method: "POST",
        url: `/posts`,
        body: data,
      }),
      invalidatesTags: [PostApiTagTypes.USER_POSTS],
    }),
    getPaginatedUserProfilePosts: builder.query<
      { allPosts: Post[] },
      { userId: string; page: number }
    >({
      query: ({ userId, page }) =>
        `${PostsApiEndpoints.postsUrl}/${userId}/?page=${page}`,
      providesTags: (result) => {
        if (result) {
          return [
            ...result.allPosts.map((post) => ({
              id: post.postData.postId,
              type: PostApiTagTypes.USER_POST,
            })),
            PostApiTagTypes.USER_POSTS,
          ];
        } else {
          return [PostApiTagTypes.USER_POSTS];
        }
      },
    }),
    getUserPaginatedPosts: builder.query<
      { allPosts: Post[] },
      { userId: string; page: number }
    >({
      query: ({ userId, page }) =>
        `${PostsApiEndpoints.postsUrl}/${userId}/?page=${page}`,
      providesTags: [PostApiTagTypes.POSTS],
    }),
    getPaginatedFriendsPosts: builder.query<unknown, { page: number }>({
      query: ({ page }) => `${PostsApiEndpoints.friendsPostsUrl}/?page=${page}`,
    }),
    getUser: builder.query<GetUserResponse, string>({
      query: (userId) => `/user/${userId}`,
      providesTags: (result) =>
        result
          ? [UserRootTag, { type: "User", id: result?.user.userId }]
          : [UserRootTag],
    }),
    accept: builder.mutation<unknown, { id: string }>({
      invalidatesTags: [
        FriendsApiTagTypes.FRIENDS,
        InvitationsApiTagTypes.INVITEES,
        UserRootTag,
      ],
      query: ({ id }) => ({
        method: "POST",
        url: `${InvitationApiEndpoints.acceptUrl}/${id}`,
      }),
    }),
    reject: builder.mutation<unknown, { id: string }>({
      invalidatesTags: [InvitationsApiTagTypes.INVITEES, UserRootTag],
      query: ({ id }) => ({
        method: "POST",
        url: `${InvitationApiEndpoints.rejectUrl}/${id}`,
      }),
    }),
    invite: builder.mutation<unknown, { id: string }>({
      invalidatesTags: (_, __, { id }) => [
        InvitationsApiTagTypes.INVITED,
        { type: UserRootTag, id },
      ],
      query: ({ id }) => ({
        method: "POST",
        url: `${InvitationApiEndpoints.inviteUrl}/${id}`,
      }),
    }),
    deleteInvite: builder.mutation<unknown, { id: string }>({
      invalidatesTags: [InvitationsApiTagTypes.INVITED, UserRootTag],
      query: ({ id }) => ({
        method: "DELETE",
        url: `${InvitationApiEndpoints.inviteUrl}/${id}`,
      }),
    }),
    deleteFriend: builder.mutation<unknown, { id: string }>({
      invalidatesTags: (_, __, { id }) => [
        FriendsApiTagTypes.FRIENDS,
        { type: "User", id },
      ],
      query: ({ id }) => ({
        method: "DELETE",
        url: `${FriendsApiEndpoints.deleteUrl}/${id}`,
      }),
    }),
    modifyPost: builder.mutation<
      unknown,
      {
        userId: string;
        postId: string;
        data: { title: string; content: string };
      }
    >({
      query: ({ userId, postId, data }) => ({
        method: "PUT",
        url: `${PostsApiEndpoints.postsUrl}/${userId}/${postId}`,
        body: data,
      }),
      invalidatesTags: (_, __, { postId }) => [
        { id: postId, type: PostApiTagTypes.USER_POST },
      ],
    }),
    deletePost: builder.mutation<
      unknown,
      {
        userId: string;
        postId: string;
      }
    >({
      query: ({ userId, postId }) => ({
        method: "DELETE",
        url: `${PostsApiEndpoints.postsUrl}/${userId}/${postId}`,
      }),
      invalidatesTags: (_, __, { postId }) => [
        { id: postId, type: PostApiTagTypes.USER_POST },
      ],
    }),
    like: builder.mutation<
      unknown,
      {
        postId: string;
      }
    >({
      query: ({ postId }) => ({
        method: "POST",
        url: `${ReactionsApiEndpoints.reactionsUrl}/${postId}`,
        body: {
          choice: Choice.LIKE,
        },
      }),
    }),
    dislike: builder.mutation<
      unknown,
      {
        postId: string;
      }
    >({
      query: ({ postId }) => ({
        method: "POST",
        url: `${ReactionsApiEndpoints.reactionsUrl}/${postId}`,
        body: {
          choice: Choice.DISLIKE,
        },
      }),
    }),
    undoRection: builder.mutation<
      unknown,
      {
        postId: string;
      }
    >({
      query: ({ postId }) => ({
        method: "DELETE",
        url: `${ReactionsApiEndpoints.reactionsUrl}/${postId}`,
      }),
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetAllInvitedQuery,
  useGetAllInviteesQuery,
  useGetUserQuery,
  useAcceptMutation,
  useDeleteInviteMutation,
  useRejectMutation,
  useDeleteFriendMutation,
  useInviteMutation,
  useGetPaginatedFriendsPostsQuery,
  useAddPostMutation,
  useGetPaginatedUserProfilePostsQuery,
  useModifyPostMutation,
  useDeletePostMutation,
  useDislikeMutation,
  useLikeMutation,
  useUndoRectionMutation,
} = api;

export { api };
