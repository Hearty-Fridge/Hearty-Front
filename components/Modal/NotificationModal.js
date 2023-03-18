import Modal from './Modal';
import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';
import { AiFillBell } from 'react-icons/ai';
import { FaEnvelope } from 'react-icons/fa';

const NotificationModal = ({ show, onCloseModal, list }) => {
  return (
    <Modal show={show} onCloseModal={onCloseModal} bright={true}>
      <Container>
        <Top>
          <Title>Notification</Title>
          <Exit onClick={onCloseModal}>
            <IoCloseSharp
              style={{
                width: '24px',
                height: '24px',
                color: 'rgba(89, 76, 72, 0.5)',
              }}
            />
          </Exit>
        </Top>
        <List>
          <AlarmBar>
            <AiFillBell className="icon" color="#ED6335" />
            <div>
              <Text>예약중인 유기농 계란이 있습니다!</Text>
              <Date>2023.02.12</Date>
            </div>
          </AlarmBar>
          <MessageBar>
            <FaEnvelope className="icon" color="rgba(89, 76, 72, 0.5)" />
            <div>
              <Text>레드향에 대한 메시지가 도착했습니다!</Text>
              <Date>2023.02.12</Date>
            </div>
          </MessageBar>
        </List>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 540px;
  height: 391px;
  background-color: white;
  padding: 20px 30px;
  z-index: 999;

  border: 1px solid #f1eae0;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;

  color: #594c48;
`;

const Exit = styled.div`
  cursor: pointer;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;

  height: 292px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const AlarmBar = styled.div`
  padding: 16px 11px;
  display: flex;
  column-gap: 5px;
  width: 467px;
  height: 66px;
  background: ${({ theme }) => theme.palette.beige1};

  border: 1px solid ${({ theme }) => theme.palette.beige2};
  border-radius: 10px;
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  align-items: center;

  color: ${({ theme }) => theme.palette.secondary.main};
`;
const Date = styled.div`
  padding-top: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;

  color: rgba(89, 76, 72, 0.7);
`;

const MessageBar = styled.div`
  padding: 16px 11px;
  display: flex;
  column-gap: 5px;
  width: 467px;
  height: 66px;
  background: white;

  border: 1px solid ${({ theme }) => theme.palette.beige2};
  border-radius: 10px;
`;

export default NotificationModal;
