import React from 'react';
import PostItem from './PostItem';

/**
 * Post list component
 */
const PostList = ({ posts }) => {
  return (
    <div className="blog-main">
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
