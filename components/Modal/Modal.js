import styled from 'styled-components';
import { useCallback, useEffect } from 'react';
import ModalContainer from './ModalContainer';

const Modal = ({ children, show, onCloseModal }) => {
  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // 외부 스크롤을 막기 위해
  useEffect(() => {
    const $body = document.querySelector('body');
    const overflow = $body.style.overflow;
    $body.style.overflow = 'hidden';
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);

  if (!show) return null;
  return (
    <ModalContainer>
      <Container onClick={onCloseModal}>
        <Content onClick={stopPropagation}>{children}</Content>
      </Container>
    </ModalContainer>
  );
};

export default Modal;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background-color: #000000cc;
  z-index: 1001;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
