import { Helmet } from "react-helmet";
import { PrismicToolbar } from "@prismicio/react";

import { repositoryName } from "../prismic";
import { Footer } from "./Footer";

/**
 * Default layout wrapper component
 */
export const Layout = ({ wrapperClass, title, children }) => (
  <div className={wrapperClass}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
    <Footer />
    <PrismicToolbar repositoryName={repositoryName} />
  </div>
);
