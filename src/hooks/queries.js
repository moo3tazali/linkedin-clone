import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import useAxios from './useAxios';
import { useAuth } from './AuthContext';

// AUTHENTICATION QUERIES
export function useLogin() {
  const axios = useAxios();
  const login = async (data) =>
    (await axios.post('/auth/login', data, { withCredentials: true })).data;
  const { storeToken } = useAuth();

  return useMutation({
    mutationFn: (data) => login(data),
    onError: (error) => console.log(error),
    onSuccess: ({ accessToken }) => {
      storeToken(accessToken);
      location.pathname = '/';
    },
  });
}
export function useSignUp() {
  const axios = useAxios();
  const register = async (data) =>
    (await axios.post('/auth/register', data, { withCredentials: true })).data;
  const { storeToken } = useAuth();
  return useMutation({
    mutationFn: (data) => register(data),
    onError: (error) => console.log(error),
    onSuccess: ({ accessToken }) => {
      storeToken(accessToken);
      location.pathname = '/';
    },
  });
}

// POST QUERIES
export function usePosts() {
  const axios = useAxios();
  const getPosts = async (pageParam) =>
    (await axios.get(`/posts?page=${pageParam + 1}`)).data.data;
  return useInfiniteQuery({
    queryKey: ['posts'],
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
  const axios = useAxios();
  const createPost = async (data) => await axios.post('/posts', data);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createPost(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
  });
}

export function useDeletePost() {
  const axios = useAxios();
  const deletePost = async (id) => await axios.delete(`/posts/${id}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePost(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
  });
}

// COMMENT QUERIES
export function useComments(postID) {
  const axios = useAxios();
  const getComments = async (postID, pageParam) =>
    (await axios.get(`/posts/${postID}/comments?page=${pageParam + 1}`)).data
      .data;
  return useInfiniteQuery({
    queryKey: ['comments', { postID }],
    queryFn: ({ pageParam }) => getComments(postID, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) return undefined;
      return lastPageParam + 1;
    },
  });
}

export function useCreateComment(postId) {
  const axios = useAxios();
  const createComment = async (postID, data) =>
    await axios.post(`/posts/${postID}/comments`, data);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createComment(postId, data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
        await queryClient.invalidateQueries({ queryKey: ['comments'] });
      }
    },
  });
}

export function useDeleteComment() {
  const axios = useAxios();
  const deleteComment = async (id) => await axios.delete(`/comments/${id}`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteComment(id),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
        await queryClient.invalidateQueries({ queryKey: ['comments'] });
      }
    },
  });
}

// LIKES QUERIES

export function useLikes(postID) {
  const axios = useAxios();
  const getLikes = async (postID) =>
    (await axios.get(`/posts/${postID}/likes`)).data.data;
  return useQuery({
    queryKey: ['likes', { postID }],
    queryFn: () => getLikes(postID),
  });
}
export function useToggleLike() {
  const axios = useAxios();
  const toggleLike = async (postID) =>
    await axios.post(`/posts/${postID}/likes`);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postID) => toggleLike(postID),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
      }
    },
  });
}

//PROFILE QUERIES

export function useProfile(username) {
  const axios = useAxios();
  const getProfile = async (username) =>
    (await axios.get(`users/${username}`)).data.data;
  return useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(username),
  });
}

export function useUsers() {
  const axios = useAxios();
  const getUsers = async () => (await axios.get('users?limit=3')).data.data;
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
}

export function useChangeMyAvatarOrCover() {
  const axios = useAxios();
  const changeMyAvatarOrCover = async (data) =>
    await axios.put('users/me', data);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => changeMyAvatarOrCover(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    },
  });
}

export function useDeleteMyAvatarOrCover() {
  const axios = useAxios();
  const deleteMyAvatarOrCover = async (data) =>
    await axios.delete('users/me', { data });

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteMyAvatarOrCover(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    },
  });
}

export function useUpdateMyInfo() {
  const axios = useAxios();
  const updateMyInfo = async (data) => await axios.patch('users/me', data);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateMyInfo(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    },
  });
}
