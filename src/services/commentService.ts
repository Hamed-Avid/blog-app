import type { AxiosRequestConfig } from "axios";
import http from "./httpService";

export async function createCommentApi(
  data: {
    postId: string;
    parentId: string | null;
    text: FormDataEntryValue | null;
  },
  options?: AxiosRequestConfig,
) {
  return http.post("/comment/add", data, options).then(({ data }) => data.data);
}

export async function getAllCommentsApi(options: AxiosRequestConfig) {
  return http.get("/comment/list", options).then(({ data }) => data.data);
}
