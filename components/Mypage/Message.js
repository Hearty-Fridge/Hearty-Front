import styled from 'styled-components';
import { useState } from 'react';
import ViewMsgModal from '@components/Modal/ViewMsgModal';

const Message = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);

  const setCloseModal = () => {
    setOpenModal(false);
  };

  const onClickCard = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Card onClick={onClickCard}>
        {item.type == 'receive' ? (
          <TagReceive>Receive</TagReceive>
        ) : (
          <TagSend>Send</TagSend>
        )}
        <Contents>{item.message}</Contents>
        <Address>{item.fridgeAddress}</Address>
      </Card>
      {openModal && (
        <>
          <ViewMsgModal
            show={openModal}
            onCloseModal={setCloseModal}
            item={item}
          />
        </>
      )}
    </>
  );
};

const Card = styled.div`
  position: relative;
  width: 310px;
  padding: 26px 30px;
  height: 198.96px;

  background: #f8f8f8;

  border: 1px solid #f1eae0;
  border-radius: 10px;
`;

const TagSend = styled.div`
  margin-right: 28px;
  padding: 4px 10px;
  width: 46px;
  height: 22px;
  font-weight: 500;
  font-size: 12px;

  background: #a6cda5;
  border-radius: 5px;
  color: white;

  text-align: center;
`;

const TagReceive = styled.div`
  margin-right: 28px;
  padding: 4px 10px;
  width: 64px;
  height: 22px;
  font-weight: 500;
  font-size: 12px;

  background: #d6a9a9;
  border-radius: 5px;
  color: white;

  text-align: center;
`;

const Contents = styled.div`
  margin-top: 18px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  color: #594c48;
`;

const Address = styled.div`
  position: absolute;
  bottom: 25px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-right: 20px;
  color: #594c48;
`;

export default Message;
