import { PostItem } from "./PostItem";

/**
 * Post list component
 */
export const PostList = ({ posts }) => {
  return (
    <div className="blog-main">
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};
