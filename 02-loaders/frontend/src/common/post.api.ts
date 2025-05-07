import * as model from "./model";
const URL = "http://localhost:3000/api/posts";

export const getPosts = async (): Promise<model.Post[]> =>
  await fetch(URL).then((res) => res.json());

// Delay the loading
export const getPost = async (id: string): Promise<model.Post> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return await fetch(`${URL}/${id}`).then((res) => res.json());
};
