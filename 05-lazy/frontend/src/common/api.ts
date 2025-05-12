import { queryOptions } from "@tanstack/react-query";
import * as model from "./model";

const API_URL = "http://localhost:3000/api";

export const login = async (
  email: string,
  password: string
): Promise<string | null> =>
  await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((response) => response.json());

export const logout = async (): Promise<void> => {
  await fetch(`${API_URL}/logout`, { method: "POST" });
};

const getPosts = async (): Promise<model.Post[]> =>
  await fetch(`${API_URL}/posts`).then((res) => res.json());

export const getPostListQuery = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

const getPost = async (id: string): Promise<model.Post> =>
  await fetch(`${API_URL}/posts/${id}`).then((res) => res.json());

export const getPostQuery = (id: string) =>
  queryOptions({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
