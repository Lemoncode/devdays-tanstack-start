import { createFileRoute } from "@tanstack/react-router";
import * as api from "#common/post.api";
import { PostList } from "#components";

export const Route = createFileRoute("/posts/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(api.getPostListQuery()),
  component: PostList,
});
