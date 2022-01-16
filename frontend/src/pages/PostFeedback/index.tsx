import { ContentWrapper } from "@components/contentWrapper";
import { useGetSinglePostQuery } from "@store/api";
import React from "react";
import { useParams } from "react-router-dom";

const PostFeedback = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSinglePostQuery({
    postId: id as string,
  });

  return <ContentWrapper>{JSON.stringify(data)}</ContentWrapper>;
};

export { PostFeedback };
