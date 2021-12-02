import React from "react";
import * as prismicH from "@prismicio/helpers";

/**
 * Post list item date component
 */
export const PostDate = ({ date }) => {
  // Format the date to M d, Y
  const dateFormat = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  const displayDate = new Intl.DateTimeFormat("en-US", dateFormat).format(
    prismicH.asDate(date)
  );

  return (
    <p className="blog-post-meta">
      <time className="created-at">{displayDate}</time>
    </p>
  );
};
