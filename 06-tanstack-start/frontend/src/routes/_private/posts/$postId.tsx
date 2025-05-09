import { createFileRoute } from "@tanstack/react-router";
import * as api from "#common/api.ts";
import { Post } from "#components/post.component";

export const Route = createFileRoute("/_private/posts/$postId")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(api.getPostQuery(params.postId)),
  component: Post,
});
