import React from "react";
import { Card } from "./Card";
import { fetchCardData } from "@/lib/dashboardData";

export default async function CardsWrapper() {
  const { numOfUsers, numOfPosts, numOfComments } = await fetchCardData();

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-3">
      <Card title="کاربران" value={numOfUsers} type="users" />
      <Card title="پست ها" value={numOfPosts} type="posts" />
      <Card title="نظرات" value={numOfComments} type="comments" />
    </div>
  );
}
