import { useGetPaginatedPostsQuery } from "@store/api";
import React, { useState } from "react";

interface PostsProps {
  userId: string;
}

const Posts = ({ userId }: PostsProps) => {
  const [page, setPage] = useState(0);

  const { data } = useGetPaginatedPostsQuery({ userId, page });
  return <div>{JSON.stringify(data)}</div>;
};

export default Posts;
