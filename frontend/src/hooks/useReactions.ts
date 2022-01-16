import {
  useLikeMutation,
  useDislikeMutation,
  useUndoRectionMutation,
} from "@store/api";
import { Choice, Post } from "@store/api/types";
import { useState } from "react";

function useReactions(post: Post, shouldUpdateProfile: boolean) {
  const [reaction, setReaction] = useState({
    choice: post.choice,
    likes: post.reactions[0].quantity,
    dislikes: post.reactions[1].quantity,
  });

  const [_like, { isLoading: isLikeLoading }] = useLikeMutation({
    fixedCacheKey: "reactions",
  });
  const [_dislike, { isLoading: isUnlikeLoading }] = useDislikeMutation({
    fixedCacheKey: "reactions",
  });
  const [_undo, { isLoading: isUndoLoading }] = useUndoRectionMutation({
    fixedCacheKey: "reactions",
  });

  const isLoading = isUnlikeLoading || isUndoLoading || isLikeLoading;

  const postId = post.postData.postId;

  const like = async () => {
    await _like({ postId, shouldUpdateProfile });
    setReaction((prev) => ({
      ...prev,
      choice: Choice.LIKE,
      likes: prev.likes + 1,
    }));
  };

  const dislike = async () => {
    await _dislike({ postId, shouldUpdateProfile });
    setReaction((prev) => ({
      ...prev,
      choice: Choice.DISLIKE,
      dislikes: prev.dislikes + 1,
    }));
  };

  const undo = async () => {
    await _undo({ postId, shouldUpdateProfile });
    setReaction((prev) => {
      const latestReaction = {
        choice: null,
        dislikes: prev.dislikes,
        likes: prev.likes,
      };

      if (prev.choice === Choice.DISLIKE) {
        latestReaction.dislikes = prev.dislikes - 1;
      } else {
        latestReaction.likes = prev.likes - 1;
      }

      return latestReaction;
    });
  };

  return { reaction, isLoading, like, dislike, undo };
}

export { useReactions };
