import { useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import * as api from "#common/api.ts";

export const Post = () => {
  const { postId } = useParams({ from: "/posts/$postId" });
  const { data: post } = useSuspenseQuery(api.getPostQuery(postId));

  return (
    <div className="hero bg-base-200 h-full">
      <div className="hero-content text-center">
        <div className="max-w">
          <article className="prose lg:prose-xl">
            <h1>{post?.title}</h1>
            <p>{post?.description}</p>
          </article>
        </div>
      </div>
    </div>
  );
};
