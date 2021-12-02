import React from "react";
import { PrismicLink } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { PostDate } from "./PostDate";
import { FirstParagraph } from "./FirstParagraph";

/**
 * Post list item component
 */
export const PostItem = ({ post }) => {
  const title = prismicH.asText(post.data.title) || "Untitled";

  return (
    <div className="blog-post">
      <PrismicLink document={post}>
        <h2>{title}</h2>
      </PrismicLink>

      <PostDate date={post.data.date} />

      <FirstParagraph sliceZone={post.data.body} textLimit={300} />
    </div>
  );
};
