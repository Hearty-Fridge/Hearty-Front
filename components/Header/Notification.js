import styled from 'styled-components';
import { useState } from 'react';
import { axiosInstance } from 'api';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import NotificationModal from '@components/Modal/NotificationModal';
import { AiFillBell } from 'react-icons/ai';
import axios from 'axios';

const Notification = () => {
  const [openModal, setOpenModal] = useState(false);

  const onClickBell = async () => {
    setOpenModal(true);

    try {
      const { data } = await axiosInstance.get(`/notification/getNotification`);

      console.log(data);
    } catch (error) {
      console.error('error: ', error);
    }
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
