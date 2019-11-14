import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Post back button component
 */
const BackButton = () => (
  <div className="back">
    <Link to="/">back to list</Link>
  </div>
);

export default BackButton;
