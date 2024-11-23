import { AxiosRequestConfig } from "axios";
import http from "./httpService";

export async function GetCategoriesApi(options?: AxiosRequestConfig) {
  return http.get("/category/list", options).then(({ data }) => data.data);
}
