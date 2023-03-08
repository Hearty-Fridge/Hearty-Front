import styled, { css } from 'styled-components';
import Modal from './Modal';
import ReservationFood from '@components/Food/ReservationFood';
import { IoCloseSharp } from 'react-icons/io5';
import { useCallback, useEffect } from 'react';

const ReservationModal = ({
  data,
  show,
  onCloseModal,
  reservationList,
  setReservationList,
  handleSubmit,
}) => {
  const onClickCheck = useCallback(
    (obj, food) => {
      if (reservationList.find((l) => l.giveId === food.food.id)) {
        setReservationList(
          reservationList.filter((l) => l.giveId !== food.food.id)
        );
      } else {
        if (reservationList.length == 2) {
          alert('2개까지 선택할 수 있습니다.');
          obj.target.checked = false;
        } else {
          setReservationList(() => [...reservationList, food]);
        }
      }
    },
    [setReservationList, reservationList]
  );

  useEffect(() => {
    reservationList.forEach((elem) => {
      const d = document.getElementById(`reserve-${elem.food.id}`);
      d.checked = true;
    });
  }, []);

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Container>
        <Top>
          <Title>Reservation</Title>
          <Exit onClick={onCloseModal}>
            <IoCloseSharp
              style={{
                width: '41px',
                height: '41px',
              }}
            />
          </Exit>
        </Top>
        <Info>* You can make a reservation up to two foods per person.</Info>
        <FoodWrapper>
          {data?.map((food) => (
            <ReservationFood
              key={food.food.id}
              data={food}
              onClickCheck={onClickCheck}
              disabled={food.isReserved}
            />
          ))}
        </FoodWrapper>
        <BtnWrapper>
          <button type="button" className="cancel" onClick={onCloseModal}>
            Cancel
          </button>
          <button className="submit" onClick={handleSubmit}>
            Confirm
          </button>
        </BtnWrapper>
      </Container>
    </Modal>
  );
};

export default ReservationModal;

const Container = styled.div`
  width: 898px;
  height: 857px;
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
