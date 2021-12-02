import { PrismicText } from "@prismicio/react";

/**
 * Homepage header component
 */
export const Header = ({ image, headline, description }) => (
  <div className="home">
    <div
      className="blog-avatar"
      style={{ backgroundImage: `url(${image.url})` }}
    />
    <h1 className="blog-title">
      <PrismicText field={headline} />
    </h1>
    <p className="blog-description">
      <PrismicText field={description} />
    </p>
  </div>
);
