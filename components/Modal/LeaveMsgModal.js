import styled from 'styled-components';
import Modal from './Modal';
import { IoCloseSharp } from 'react-icons/io5';
import { useState, memo } from 'react';
import { axiosInstance } from 'api';
import { useQueryClient } from 'react-query';

const LeaveMsgModal = ({ show, onCloseModal, item }) => {
  const queryClient = useQueryClient();

  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const maxLength = 300;
  const remainingChars = maxLength - value.length;
  const counter = remainingChars > maxLength ? 300 : value.length;

  const sendMessage = async (id) => {
    try {
      const response = await axiosInstance.post(`/message/leaveMessage`, {
        takeId: id,
        content: value,
      });
      queryClient.invalidateQueries('getSendMessages');
      queryClient.invalidateQueries('getReceiveMessages');
      queryClient.invalidateQueries('getGives');
      queryClient.invalidateQueries('getTakes');
      onCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Container>
        <Top>
          <Title>
            Message about <Food> {item.foodName}</Food>
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
          {item.type == 'give' ? (
            <TagGive>Give</TagGive>
          ) : (
            <TagTake>Take</TagTake>
          )}
          <Address>{item.fridgeName}</Address>
        </Info>
        <Wrap>
          <Box
            value={value}
            onChange={handleChange}
            maxLength={maxLength}
            data-counter={`${counter}/${maxLength}`}
            placeholder="Please leave your message"
          ></Box>
          <Valid>
            {counter}/{maxLength}
          </Valid>
        </Wrap>
        <Buttons>
          <CancelBtn onClick={onCloseModal}>Cancel</CancelBtn>
          <ConfirmBtn
            onClick={() => {
              sendMessage(item.id);
            }}
          >
            Confirm
          </ConfirmBtn>
        </Buttons>
      </Container>
    </Modal>
  );
};
const Container = styled.div`
  width: 898px;
  min-height: 524px;
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

const TagTake = styled.div`
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
const TagGive = styled.div`
  margin-right: 28px;
  padding: 4px 10px;
  width: 46px;
  height: 22px;
  font-weight: 500;
  font-size: 12px;

  background: #d6a9a9;
  border-radius: 5px;
  color: white;

  text-align: center;
`;

const Wrap = styled.div`
  padding: 20px 35px;
`;

// const Box = memo(styled.textarea`
//   cursor: pointer;
//   font-family: 'Pretendard';
//   font-style: normal;
//   font-weight: 400;
//   font-size: 18px;
//   color: black;
//   background-color: ${({ theme }) => theme.palette.background};
//   margin-top: 20px;
//   margin: 0 auto;
//   border: 1px solid #f1eae0;
//   border-radius: 10px;
//   height: 270px;
//   width: 724px;
//   padding: 24px;

//   &::after {
//     content: attr(data-counter);
//     position: absolute;
//     right: 16px;
//     bottom: 10px;
//     font-size: 12px;
//   }
// `);

const Box = styled.textarea`
  cursor: pointer;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: black;
  background-color: ${({ theme }) => theme.palette.background};
  margin-top: 20px;
  margin: 0 auto;
  border: 1px solid #f1eae0;
  border-radius: 10px;
  height: 270px;
  width: 724px;
  padding: 24px;
`;

const Buttons = styled.div`
  display: flex;
  float: right;
  width: 194px;
  column-gap: 26px;
  margin-right: 30px;
  margin-top: 5px;
`;

const CancelBtn = styled.button`
  cursor: pointer;
  width: 148px;
  height: 37px;
  text-align: center;
  color: white;
  font-size: 16px;
  background: rgba(89, 76, 72, 0.3);
  border: 1px solid white;
  border-radius: 10px;
`;

const ConfirmBtn = styled.button`
  cursor: pointer;
  width: 148px;
  height: 37px;
  text-align: center;
  color: white;
  font-size: 16px;
  background-color: ${({ theme }) => theme.palette.accent};
  border: 1px solid #f2916e;
  border-radius: 10px;
`;

const Valid = styled.div`
  float: right;
  font-size: 15px;
  align-items: center;
  text-align: right;
  color: rgba(89, 76, 72, 0.7);
`;

export default LeaveMsgModal;
