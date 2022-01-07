import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FriendsApiEndpoints } from "@api/friends";
import { RootState } from "..";
import { InvitationApiEndpoints } from "@api/invitations";
import { GetFriendsResponse, InvitedResponse, InviteesResponse } from "./types";

enum FriendsApiTagTypes {
  FRIENDS = "FRIENDS",
}

enum InvitationsApiTagTypes {
  INVITED = "INVITED",
  INVITEES = "INVITEES",
}

const baseUrl = "/api";

const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
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
  }),
});

export const {
  useGetFriendsQuery,
  useGetAllInvitedQuery,
  useGetAllInviteesQuery,
} = friendsApi;

export { friendsApi };
