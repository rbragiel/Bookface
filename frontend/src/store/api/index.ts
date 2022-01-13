import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FriendsApiEndpoints } from "@api/friends";
import { InvitationApiEndpoints } from "@api/invitations";
import {
  GetFriendsResponse,
  GetUserResponse,
  InvitedResponse,
  InviteesResponse,
  Post,
} from "./types";
import { getTokenFromLS } from "@store/auth";
import { PostsApiEndpoints } from "@api/posts";

enum FriendsApiTagTypes {
  FRIENDS = "FRIENDS",
}

enum InvitationsApiTagTypes {
  INVITED = "INVITED",
  INVITEES = "INVITEES",
}

enum PostApiTagTypes {
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
    addPost: builder.mutation<
      unknown,
      { id: string; data: { title: string; content: string } }
    >({
      query: ({ data, id }) => ({
        method: "POST",
        url: `/posts/${id}`,
        body: data,
      }),
    }),
    getPaginatedUserProfilePosts: builder.query<
      { allPosts: Post[] },
      { userId: string; page: number }
    >({
      query: ({ userId, page }) =>
        `${PostsApiEndpoints.postsUrl}/${userId}/?page=${page}`,
      providesTags: [PostApiTagTypes.POSTS],
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
} = api;

export { api };
