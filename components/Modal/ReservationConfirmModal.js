import styled, { css } from 'styled-components';
import Modal from './modal';
import Food from '@components/Food/ReservationFood';

const ReservationContirmModal = ({ data, show, onCloseModal }) => {
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Container>
        <Top>
          <Title>Confirmation of reservation</Title>
          <Exit onClick={onCloseModal}>X</Exit>
        </Top>
        <Info>* You can make a reservation up to two foods per person.</Info>
        <FoodWrapper>
          {data?.map((food) => (
            <Food data={food} />
          ))}
        </FoodWrapper>
        <BtnWrapper>
          <button className="cancel">cancel</button>
          <button className="submit">submit</button>
        </BtnWrapper>
      </Container>
    </Modal>
  );
};

export default ReservationContirmModal;

const Container = styled.div`
  width: 700px;
  height: 500px;
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
  font-size: 16px;
  color: ${({ theme }) => theme.palette.secondary.main70};
`;

const FoodWrapper = styled.div`
  width: 674px;
  height: 632px;
  margin-left: 45px;
  margin-top: 25px;
  overflow-y: scroll;
`;

const BtnStyle = css`
  width: 98px;
  height: 40px;
  border-radius: 100px;
  border: none;
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
    background-color: ${({ theme }) => theme.palette.gray};
  }
  .submit {
    ${BtnStyle};
    background-color: ${({ theme }) => theme.palette.primary};
  }
`;
