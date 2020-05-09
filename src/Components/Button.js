import React from "react";
import clsx from "clsx";
import { func, string, node } from "prop-types";

import "../styles/Button.scss";

const Button = ({ children, className, onClick }) => {
  return (
    <button className={clsx(["button", className])} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: node.isRequired,
  onClick: func.isRequired,
  className: string
};

Button.defaultProps = {
  className: ""
};

export default Button;
