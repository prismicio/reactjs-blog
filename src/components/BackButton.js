import React from "react";
import { Link } from "react-router-dom";

/**
 * Post back button component
 */
export const BackButton = () => (
  <div className="back">
    <Link to="/">back to list</Link>
  </div>
);
