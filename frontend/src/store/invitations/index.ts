import { InvitationApiEndpoints } from "@api/invitations";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";

enum InvitationsApiTagTypes {
  INVITED = "INVITED",
  INVITEES = "INVITEES",
}

const invitationsApi = createApi({
  reducerPath: "invitationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: InvitationApiEndpoints.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: Object.values(InvitationsApiTagTypes),
  endpoints: (builder) => ({
    getAllInvitees: builder.query<unknown, void>({
      query: () => InvitationApiEndpoints.inviteesUrl,
      providesTags: [InvitationsApiTagTypes.INVITEES],
    }),
    getAllInvited: builder.query<unknown, void>({
      query: () => InvitationApiEndpoints.invitedUrl,
      providesTags: [InvitationsApiTagTypes.INVITED],
    }),
  }),
});

export const { useGetAllInvitedQuery, useGetAllInviteesQuery } = invitationsApi;

export { invitationsApi };
