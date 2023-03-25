import { createPortal } from 'react-dom';

const ModalContainer = ({ children }) => {
  return createPortal(<>{children}</>, document.body);
};

export default ModalContainer;
