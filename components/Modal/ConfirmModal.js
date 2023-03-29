import styled, { css } from 'styled-components';
import Modal from './Modal';
import { IoLocationSharp } from 'react-icons/io5';
import ConfirmFood from '@components/Food/ConfirmFood';
import { takeFood } from 'api/Food/useFoods';
import { getCanReserve } from 'api/Food/useFoods';
import { RxCross2 } from 'react-icons/rx';

const ConfirmModal = ({ data, loc, show, onCloseModal, showReservation }) => {
  const token = localStorage.getItem('accessToken');
  const { refetch } = getCanReserve({ token: token });
  // authorization이 생기면 수정해야 함.
  const onHandleSubmit = async () => {
    let flag = false;
    for (let i = 0; i < data.length; i++) {
      const res = await takeFood({ giveId: data[i].giveId, token: token });
      if (res.error) {
        flag = true;
        alert(res.error);
        break;
      }
    }
    if (!flag) {
      alert('Successful!');
      onCloseModal();
      refetch();
    }
  };
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Container>
        <Top>
          <Title>Confirmation of reservation</Title>
          <Exit onClick={onCloseModal}>
            <RxCross2
              style={{ color: '#594C48', width: '35px', height: '35px' }}
            />
          </Exit>
        </Top>
        <Info>
          <IoLocationSharp />
          {loc}
        </Info>
        <ContentWrapper>
          {data?.map((t) => (
            <ConfirmFood key={t.id} data={t.food} />
          ))}
          <Notification>
            <div>Please leave a message</div>
            <div>abount the completion of pick-up by 3:35.</div>
          </Notification>
        </ContentWrapper>
        <BtnWrapper>
          <button className="cancel" onClick={showReservation}>
            Back
          </button>
          <button className="submit" onClick={onHandleSubmit}>
            Submit
          </button>
        </BtnWrapper>
      </Container>
    </Modal>
  );
};

export default ConfirmModal;

const Container = styled.div`
  width: 700px;
  min-height: 500px;
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

const Exit = styled.div``;

const Info = styled.div`
  margin-top: 6px;
  display: flex;
  column-gap: 7px;
  align-items: center;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.secondary.main70};
`;

const ContentWrapper = styled.div`
  width: 674px;
  margin-left: 60px;
  margin-top: 38px;
`;

const BtnStyle = css`
  width: 98px;
  height: 40px;
  border-radius: 100px;
  border: none;
  color: white;
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  column-gap: 36px;
  font-size: 14px;
  justify-content: end;
  align-items: center;
  margin-top: 24px;
  .cancel {
    ${BtnStyle};
    background-color: #d9d9d9;
  }
  .submit {
    ${BtnStyle};
    background-color: ${({ theme }) => theme.palette.accent};
  }
`;

const Notification = styled.div`
  margin-top: 12px;
  line-height: 24px;
  color: ${({ theme }) => theme.palette.secondary.main70};
`;
