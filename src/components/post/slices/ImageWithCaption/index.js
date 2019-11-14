import React from 'react';
import DefaultImage from './DefaultImage';
import FullWidthImage from './FullWidthImage';

/**
 * Image caption slice component
 */
const ImageCaption = ({ slice }) => {
  switch (slice.slice_label) {
    case 'image-full-width':
      return <FullWidthImage slice={slice} />;
    default:
      return <DefaultImage slice={slice} />;
  }
};

export default ImageCaption;
