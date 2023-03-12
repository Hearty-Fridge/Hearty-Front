import { AiFillBell } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import NotificationModal from '@components/Modal/NotificationModal';

const Notification = () => {
  const [openModal, setOpenModal] = useState(false);
  const onClickBell = () => {
    setOpenModal(true);
    console.log(openModal);
  };
  const setCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Bell onClick={onClickBell}>
        <AiFillBell className="icon" color="#594C48" />
      </Bell>
      {openModal && (
        <>
          <NotificationModal show={openModal} onCloseModal={setCloseModal} />
        </>
      )}
    </>
  );
};

const Bell = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background-color: rgba(255, 0, 0, 0);
`;

export default Notification;
