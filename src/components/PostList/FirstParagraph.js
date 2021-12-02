import * as prismicH from "@prismicio/helpers";

/**
 * Component that returns the first paragraph of a post
 */
export const FirstParagraph = ({ sliceZone, textLimit = 300 }) => {
  // Find the first text slice of post's body
  const firstTextSlice = sliceZone.find((slice) => slice.slice_type === "text");

  if (firstTextSlice) {
    const text = prismicH.asText(firstTextSlice.primary.text);
    let limitedText = text.substring(0, textLimit);

    if (text.length > textLimit) {
      // Cut only up to the last word and attach '...' for readability
      limitedText = `${limitedText.substring(
        0,
        limitedText.lastIndexOf(" ")
      )}...`;
    }

    return <p>{limitedText}</p>;
  }

  // If there are no slices of type 'text', return nothing
  return null;
};
