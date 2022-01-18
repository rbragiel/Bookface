import React from "react";
import { Flex, useBoolean } from "@chakra-ui/react";
import { Post as PostType } from "@store/api/types";

import { PostEdit } from "./postEdit";
import { PostView } from "./postView";

interface PostProps {
  post: PostType;
  bg: string;
}

const Post = ({ post, bg }: PostProps) => {
  const [isEditing, { on, off }] = useBoolean(false);

  return (
    <Flex w="100%" p={4} borderRadius={10} flexDir="column" bg={bg}>
      {isEditing ? (
        <PostEdit stopEditing={off} post={post} />
      ) : (
        <PostView startEdit={on} post={post} />
      )}
    </Flex>
  );
};

export { Post };
