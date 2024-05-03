import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addLike,
  createComment,
  createPost,
  deleteComment,
  deleteCover,
  deletePost,
  deleteProfilePic,
  getComments,
  getLikes,
  getPosts,
  getUsers,
  login,
  register,
  removeLike,
  updateMe,
} from "./api";
import { storeUser } from "../hooks/handleAuth";

// AUTHENTICATION QUERIES
export function useLogin() {
  return useMutation({
    mutationFn: (data) => login(data),
    onError: (error) => console.log(error),
    onSuccess: ({ jwt }, { isRemember }) => {
      storeUser(jwt, isRemember);
      location.pathname = "/";
    },
  });
}
export function useSignUp() {
  return useMutation({
    mutationFn: (data) => register(data),
    onError: (error) => console.log(error),
    onSuccess: ({ jwt }) => {
      storeUser(jwt, false);
      location.pathname = "/";
    },
  });
}

// POST QUERIES
export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createPost(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePost(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["posts"] });
      }
    },
  });
}

// COMMENT QUERIES
export function useComments(postID) {
  return useInfiniteQuery({
    queryKey: ["comments", { postID }],
    queryFn: ({ pageParam }) => getComments(postID, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
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

export function useDeleteComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteComment(id),
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

// LIKES QUERIES

export function useLikes(postID) {
  return useQuery({
    queryKey: ["likes", { postID }],
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

//PROFILE QUERIES

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getUsers,
  });
}

export function useUpdateCover() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateMe(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    },
  });
}

export function useDeleteCover() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCover,
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    },
  });
}

export function useUpdateProfilePic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateMe(data),
    onSettled: (_, error) => {
      if (error) console.log(error);
      queryClient.invalidateQueries("profile");
    },
  });
}

export function useDeleteProfilePic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProfilePic,
    onSettled: (_, error) => {
      if (error) console.log(error);
      queryClient.invalidateQueries("profile");
    },
  });
}

export function useUpdateIntroInfo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateMe(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    },
  });
}
