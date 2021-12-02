import { PrismicText } from "@prismicio/react";

/**
 * Quote slice component
 */
export const Quote = ({ slice }) => (
  <div className="post-part single container">
    <blockquote className="block-quotation">
      <PrismicText field={slice.primary.quote} />
    </blockquote>
  </div>
);
