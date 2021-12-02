import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom";
import { BlogHome, NotFound, Post, Preview } from "./pages";
import { apiEndpoint } from "./prismic-configuration";

/**
 * Main app component
 */
const App = () => {
  const repoNameArray = /([^/]+)\.cdn.prismic\.io\/api/.exec(apiEndpoint);
  const repoName = repoNameArray[1];

  return (
    <Fragment>
      <Helmet>
        <script
          async
          defer
          src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`}
        />
      </Helmet>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogHome />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/blog" element={<Navigate to="/" />} />
          <Route path="/blog/:uid" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
