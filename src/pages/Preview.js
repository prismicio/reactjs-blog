import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Loader } from "../components";
import { linkResolver } from "../prismic-configuration";
import { client } from "../utils/prismicHelpers";

/**
 * Prismic preview component
 */
const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const documentId = params.get("documentId");

    if (!token) {
      return console.warn(`Unable to retrieve the session token from provided url. \n
      Check https://prismic.io/docs/reactjs/beyond-the-api/in-website-preview for more info`);
    }

    client
      .getPreviewResolver(token, documentId)
      .resolve(linkResolver, "/")
      .then((url) => navigate(url));
  });

  return <Loader />;
};

export default Preview;
