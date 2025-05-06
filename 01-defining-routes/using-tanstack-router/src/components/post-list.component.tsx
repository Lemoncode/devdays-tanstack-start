import type * as model from "../model.ts";
import { posts } from "../mock-data.ts";

export const PostList = () => {
  return (
    <div className="hero bg-base-200 h-full">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-lg opacity-60 tracking-wide">Post list</li>

        {posts.map((post, index) => (
          <Row key={post.id} post={post} index={index} onNavigate={() => {}} />
        ))}
      </ul>
    </div>
  );
};

interface RowProps {
  post: model.Post;
  index: number;
  onNavigate: (id: number) => void;
}

const Row: React.FC<RowProps> = (props) => {
  const { post, index, onNavigate } = props;
  return (
    <li className="list-row">
      <div className="text-4xl font-thin opacity-30 tabular-nums">
        {`${index + 1}`.padStart(2, "0")}
      </div>
      <div className="list-col-grow">
        <div>{post.title}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {post.subtitle}
        </div>
      </div>
      <button
        className="btn btn-square btn-ghost"
        onClick={() => onNavigate(post.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </li>
  );
};
