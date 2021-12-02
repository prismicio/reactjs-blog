import { useEffect } from "react";
import { usePrismicPreviewResolver } from "@prismicio/react";
import { useNavigate } from "react-router-dom";

import { Loader } from "../components/Loader";

/**
 * Prismic preview component
 */
export const Preview = () => {
  const navigate = useNavigate();
  const previewURL = usePrismicPreviewResolver({ navigate });

  useEffect(() => {
    if (!previewURL) {
      return console.warn(`Unable to retrieve the preview token from provided url. \n
      Check https://prismic.io/docs/reactjs/beyond-the-api/in-website-preview for more info`);
    }
  }, [previewURL]);

  return <Loader />;
};
