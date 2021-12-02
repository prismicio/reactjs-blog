import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SliceZone, usePrismicDocumentByUID } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { components } from "../slices";
import { Layout } from "../components/Layout";
import { BackButton } from "../components/BackButton";
import { NotFound } from "./NotFound";

/**
 * Blog post page component
 */
export const Post = () => {
  const { uid } = useParams();
  const [prismicDoc, prismicDocState] = usePrismicDocumentByUID("post", uid);

  const notFound = prismicDocState.state === "failed";

  useEffect(() => {
    if (prismicDocState.state === "failed") {
      console.warn(
        "Blog post document was not found. Make sure it exists in your Prismic repository"
      );
    }
  }, [prismicDocState.state]);

  // Return the page if a document was retrieved from Prismic
  if (prismicDoc) {
    const title = prismicH.asText(prismicDoc.data.title) || "Untitled";

    return (
      <Layout wrapperClass="main" seoTitle={title}>
        <div className="outer-container">
          <BackButton />
          <h1>{title}</h1>
        </div>
        <SliceZone slices={prismicDoc.data.body} components={components} />
      </Layout>
    );
  } else if (notFound) {
    return <NotFound />;
  }

  return null;
};
