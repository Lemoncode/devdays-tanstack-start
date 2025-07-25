import { createFileRoute } from "@tanstack/react-router";
import * as api from "#common/api.ts";
import { Post } from "#components";

export const Route = createFileRoute("/posts/$postId")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(api.getPostQuery(params.postId)),
  component: Post,
});
