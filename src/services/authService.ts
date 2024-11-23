import type { AuthData } from "@/context/AuthContext";
import http from "./httpService";
import type { AxiosRequestConfig } from "axios";

export async function signupApi(data: AuthData) {
  return await http.post("/user/signup", data).then(({ data }) => data.data);
}

export async function signinApi(data: Omit<AuthData, "name">) {
  return await http.post("/user/signin", data).then(({ data }) => data.data);
}

export async function getUserApi() {
  return await http.get("/user/profile").then(({ data }) => data.data);
}

export async function getAllUsersApi(options: AxiosRequestConfig) {
  return http.get("/user/list", options).then(({ data }) => data.data);
}
