import React from "react";
import { Modal } from "semantic-ui-react";

import "./ModalAddRegistro.scss";

export function ModalAddRegistro(props) {
  const { show, size, title, children, onClose } = props;
  return (
    <Modal className="modal-addregistro" open={show} onClose={onClose} size={size}>
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

ModalAddRegistro.defaultProps = {
  size: "tiny",
};
