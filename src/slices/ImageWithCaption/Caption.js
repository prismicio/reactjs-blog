import * as prismicH from "@prismicio/helpers";

/**
 * Image caption component
 */
export const Caption = ({ caption }) => {
  const text = prismicH.asText(caption);

  if (text) {
    return (
      <p>
        <span className="image-label">{text}</span>
      </p>
    );
  } else {
    return null;
  }
};
