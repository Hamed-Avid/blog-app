import type { NextRequest } from "next/server";
import type { User } from "@/types/User";

type ResponseData = {
  statusCode: number;
  message?: string;
  data?: {
    user: User;
  };
};

export default async function middlewareAuth(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
    {
      method: "get",
      credentials: "include",
      headers: {
        Cookie: `${accessToken?.name}=${accessToken?.value}; ${refreshToken?.name}=${refreshToken?.value}`,
      },
    },
  );
  const { data }: ResponseData = await response.json();
  const { user } = data || {};
  return user;
}
