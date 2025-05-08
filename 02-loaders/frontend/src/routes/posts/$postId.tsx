import { createFileRoute } from "@tanstack/react-router";
import * as api from "#common/api.ts";
import { Post } from "#components";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ params }) => api.getPost(params.postId),
  component: Post,
});
