import styled, { css } from 'styled-components';
import Modal from './Modal';
import { IoCloseSharp } from 'react-icons/io5';

const ViewMsgModal = ({ show, onCloseModal, item }) => {
  console.log(item);
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Container>
        <Top>
          <Title>
            <Food>우유 1팩</Food>에 대한 메시지
          </Title>
          <Exit onClick={onCloseModal}>
            <IoCloseSharp
              style={{
                width: '41px',
                height: '41px',
                color: '#594C48',
              }}
            />
          </Exit>
        </Top>
        <Info>
          {item.type == 'receive' ? (
            <TagReceive>Receive</TagReceive>
          ) : (
            <TagSend>Send</TagSend>
          )}
          <Address>{item.fridgeAddress}</Address>
        </Info>
        <Contents>{item.message}</Contents>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 898px;
  min-height: 368px;
  background-color: white;
  padding: 48px 48px 0px 59px;
  border-radius: 10px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Food = styled.span`
  color: ${({ theme }) => theme.palette.primary};
`;

const Exit = styled.div`
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Address = styled.div`
  font-weight: 600;
  font-size: 18px;
  color: rgba(89, 76, 72, 0.7);
`;

const TagSend = styled.div`
  margin-right: 19px;
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
  margin-right: 19px;
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
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  color: #594c48;
  padding-top: 36px;
  margin: 0 auto;
  width: 714px;
`;

export default ViewMsgModal;
