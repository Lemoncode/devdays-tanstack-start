import { posts } from "#common/mock-data";

export const Post = () => {
  const post = posts.find((post) => post.id === Number("1"));

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
