import { Routes, BrowserRouter, Route, Navigate, Link } from "react-router-dom";
import { PrismicProvider, PrismicToolbar } from "@prismicio/react";

import { client, repositoryName } from "./prismic";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Post } from "./pages/Post";
import { Preview } from "./pages/Preview";

/**
 * Main app component
 */
const App = () => {
  return (
    <PrismicProvider
      client={client}
      internalLinkComponent={({ href, ...props }) => (
        <Link to={href} {...props} />
      )}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/blog" element={<Navigate to="/" />} />
          <Route path="/blog/:uid" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <PrismicToolbar repositoryName={repositoryName} />
    </PrismicProvider>
  );
};

export default App;
