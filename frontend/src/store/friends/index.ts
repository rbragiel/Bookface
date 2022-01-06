import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FriendsApiEndpoints } from "@api/friends";
import { RootState } from "..";

enum FriendsApiTagTypes {
  FRIENDS = "FRIENDS",
}

const friendsApi = createApi({
  reducerPath: "friendsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: FriendsApiEndpoints.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: Object.values(FriendsApiTagTypes),
  endpoints: (builder) => ({
    getFriends: builder.query<unknown, void>({
      query: () => FriendsApiEndpoints.getUrl,
      providesTags: [FriendsApiTagTypes.FRIENDS],
    }),
  }),
});

export const { useGetFriendsQuery } = friendsApi;
export { friendsApi };
