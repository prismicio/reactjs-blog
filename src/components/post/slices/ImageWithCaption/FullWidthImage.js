import React from 'react';
import Caption from './Caption';

/**
 * Full width image component
 */
const FullWidthImage = ({ slice }) => {
  const imageUrl = slice.primary.image.url;
  const caption = slice.primary.caption;

  return (
    <div
      className="full-width-image single"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="wrapper">
        <Caption caption={caption} />
      </div>
    </div>
  );
};

export default FullWidthImage;
