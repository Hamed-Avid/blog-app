import type { AxiosRequestConfig } from "axios";
import http from "./httpService";

export async function getAllPostsApi(
  queries?: string,
  options?: AxiosRequestConfig,
) {
  return await http
    .get(`/post/list?${queries}`, options)
    .then(({ data }) => data.data);
}

export async function getPostBySlugApi(slug: string) {
  return await http.get(`/post/slug/${slug}`).then(({ data }) => data.data);
}

export async function likePostApi(postId: string) {
  return await http.post(`/post/like/${postId}`).then(({ data }) => data.data);
}

export async function bookmarkPostApi(postId: string) {
  return http.post(`/post/bookmark/${postId}`).then(({ data }) => data.data);
}

export async function createPostApi(data: FormData) {
  return http.post("/post/create", data).then(({ data }) => data.data);
}
