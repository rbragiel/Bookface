import React from "react";
import { Flex, useBoolean } from "@chakra-ui/react";
import { Post as PostType } from "@store/api/types";

import { PostEdit } from "./postEdit";
import { PostView } from "./postView";

interface PostProps {
  post: PostType;
  bg: string;
  userId: string;
}

const Post = ({ post, bg, userId }: PostProps) => {
  const [isEditing, { on, off }] = useBoolean(false);

  return (
    <Flex w="100%" p={4} borderRadius={10} flexDir="column" bg={bg}>
      {isEditing ? (
        <PostEdit stopEditing={off} userId={userId} post={post} />
      ) : (
        <PostView startEdit={on} userId={userId} post={post} />
      )}
    </Flex>
  );
};

export { Post };
