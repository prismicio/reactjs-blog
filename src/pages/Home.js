import { useEffect } from "react";
import {
  usePrismicDocumentsByType,
  useSinglePrismicDocument,
} from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { Layout } from "../components/Layout";
import { Header } from "../components/Header";
import { PostList } from "../components/PostList";
import { NotFound } from "./NotFound";

/**
 * Blog homepage component
 */
export const Home = () => {
  const [homeDoc, homeDocState] = useSinglePrismicDocument("blog_home");
  const [blogPosts, blogPostsState] = usePrismicDocumentsByType("post", {
    orderings: [{ field: "my.post.date", direction: "desc" }],
  });

  const notFound =
    homeDocState.state === "failed" || blogPostsState.state === "failed";

  useEffect(() => {
    if (!homeDocState.state === "failed") {
      console.warn(
        "Blog Home document was not found. Make sure it exists in your Prismic repository"
      );
    }
  }, [homeDocState.state]);

  // Return the page if a document was retrieved from Prismic
  if (homeDoc && blogPosts?.results) {
    const title = prismicH.asText(homeDoc.data.headline);

    return (
      <Layout seoTitle={title}>
        <Header
          image={homeDoc.data.image}
          headline={homeDoc.data.headline}
          description={homeDoc.data.description}
        />
        <PostList posts={blogPosts?.results} />
      </Layout>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
};
