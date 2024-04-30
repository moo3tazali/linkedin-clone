import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addLike,
  createComment,
  getComments,
  getLikes,
  getPosts,
  removeLike,
} from "./api";

// POST QUERIES
export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}

// COMMENT QUERIES
export function useComments(postID) {
  return useQuery({
    queryKey: ["comments", postID],
    queryFn: () => getComments(postID),
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createComment(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["posts"] });
        await queryClient.invalidateQueries({ queryKey: ["comments"] });
      }
    },
  });
}

// LIKES API

export function useLikes(postID) {
  return useQuery({
    queryKey: ["likes", postID],
    queryFn: () => getLikes(postID),
  });
}
export function useAddLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postID) => addLike(postID),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
  });
}
export function useRemoveLike() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postID) => removeLike(postID),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
  });
}
