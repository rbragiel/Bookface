import React from "react";
import { PostComment } from "@store/api/types";
import {
  Flex,
  HStack,
  IconButton,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { Comment } from "./comment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDeleteCommentMutation } from "@store/api";
import { deleteCommentSuccessToast, deleteCommentErrorToast } from "@toasts";
import { EditableInput } from "./editableInput";

interface EditableCommentProps {
  comment: PostComment;
  postId: string;
  page: number;
}

const EditableComment = ({ comment, postId, page }: EditableCommentProps) => {
  const [isEditMode, { off, on }] = useBoolean(false);

  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await deleteComment({ commentId: comment.commentId, postId }).unwrap();
      toast(deleteCommentSuccessToast());
    } catch (error) {
      toast(deleteCommentErrorToast());
    }
  };

  return (
    <Flex flexDir="column" w="100%">
      {isEditMode ? (
        <EditableInput
          content={comment.content}
          postId={postId}
          commentId={comment.commentId}
          cancel={off}
          page={page}
        />
      ) : (
        <>
          <Comment comment={comment} />
          <HStack justifyContent="flex-end" spacing={2} px={4}>
            <IconButton
              colorScheme="teal"
              aria-label="edit"
              icon={<AiFillEdit />}
              onClick={on}
              isLoading={isLoading}
            />
            <IconButton
              colorScheme="red"
              aria-label="delete"
              icon={<AiFillDelete />}
              isLoading={isLoading}
              onClick={handleDelete}
            />
          </HStack>
        </>
      )}
    </Flex>
  );
};

export { EditableComment };
