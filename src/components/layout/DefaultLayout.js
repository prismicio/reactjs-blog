import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from './Footer';

/**
 * Default layout wrapper component
 */
const DefaultLayout = ({ wrapperClass, title, children }) => (
  <div className={wrapperClass}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
    <Footer />
  </div>
);

export default DefaultLayout;
