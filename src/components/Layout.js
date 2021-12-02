import { Helmet } from "react-helmet";

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
  </div>
);
