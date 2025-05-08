import { queryOptions } from "@tanstack/react-query";
import * as model from "./model";

const URL = "http://localhost:3000/api/posts";

const getPosts = async (): Promise<model.Post[]> =>
  await fetch(URL).then((res) => res.json());

export const getPostListQuery = () =>
  queryOptions({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

const getPost = async (id: string): Promise<model.Post> =>
  await fetch(`${URL}/${id}`).then((res) => res.json());

export const getPostQuery = (id: string) =>
  queryOptions({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });
