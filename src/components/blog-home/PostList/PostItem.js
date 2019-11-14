import React from 'react';
import { Link } from 'react-router-dom';
import { RichText } from 'prismic-reactjs';

import PostDate from './PostDate';
import FirstParagraph from './FirstParagraph';
import { linkResolver } from '../../../prismic-configuration';

/**
 * Post list item component
 */
const PostItem = ({ post }) => {
  const title =
    RichText.asText(post.data.title) ?
    RichText.asText(post.data.title) :
    'Untitled';
  
  return (
    <div className="blog-post">
      <Link to={linkResolver(post)}>
        <h2>{title}</h2>
      </Link>

      <PostDate date={post.data.date} />
      
      <FirstParagraph
        sliceZone={post.data.body}
        textLimit={300}
      />
    </div>
  );
};

export default PostItem;
