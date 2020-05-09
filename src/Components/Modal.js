import React from "react";
import clsx from "clsx";

import "../styles/modal.scss";

const Modal = ({ onCloseClick, children, show }) => (
  <div className={clsx({ "modal-container": true, hide: !show })}>
    <div className="modal-content">
      {children}
      <span className="close" onClick={onCloseClick}>
        X
      </span>
    </div>
  </div>
);

export default Modal;
