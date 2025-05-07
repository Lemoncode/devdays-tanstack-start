import { createFileRoute } from "@tanstack/react-router";
import * as api from "#common/post.api";
import { Post } from "#components";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ params }) => api.getPost(params.postId),
  component: Post,
});
