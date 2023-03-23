import { getFridgesById, useBookmarkMutation } from 'api/Fridges/useFridges';
import styled, { css } from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoLocationSharp } from 'react-icons/io5';
import { IoStarSharp, IoStarOutline } from 'react-icons/io5';
import DetailFoodList from '@components/Food/DetailFoodList';
import MessageList from '@components/Message/messageList';
import ReservationModal from '@components/Modal/ReservationModal';
import DonationModal from '@components/Modal/DonationModal';
import ConfirmModal from '@components/Modal/ConfirmModal';
import { getCanReserve } from 'api/Food/useFoods';

const FridgeDetail = ({ id }) => {
  const router = useRouter();
  const token = localStorage.getItem('accessToken');
  const [isList, setIsList] = useState(true);
  const [isReservation, setIsReservation] = useState(false);
  const [isDonation, setIsDonation] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [reservationList, setReservationList] = useState([]);
  const { data: numCanReserve } = getCanReserve({ token: token });

  const {
    data: fridgeDetailData,
    refetch,
    isLoading,
  } = getFridgesById({ fridgeId: id, token: token });

  const { mutate } = useBookmarkMutation(id);

  const onClickBtn = useCallback(
    (t) => {
      if (t === 'donate') {
        setIsDonation(true);
        setIsReservation(false);
      } else if (t === 'reserve') {
        setIsReservation(true);
        setIsDonation(false);
      }
    },
    [setIsDonation, setIsReservation]
  );

  const onCloseModal = () => {
    setReservationList([]);
    setIsReservation(false);
    setIsDonation(false);
    setIsConfirm(false);
  };

  const ReservationHandleSubmit = () => {
    if (reservationList.length === 0) {
      alert('하나 이상의 음식을 선택하세요!');
    } else if (numCanReserve < reservationList.length) {
      alert(
        `예약 가능 음식 개수를 초과했습니다. 예약 가능 음식 개수 : ${numCanReserve}`
      );
    } else {
      setIsReservation(false);
      setIsConfirm(true);
    }
  };

  const showReservation = () => {
    setIsReservation(true);
    setIsConfirm(false);
  };

  // if t == true이면 Food List를 눌렀을 때, 아니면 Hearty Talk을 눌렀을 때
  const onClickMenuBtn = useCallback((t) => {
    setIsList(t);
  }, []);

  const onClickExitBtn = useCallback(() => {
    router.push('/map');
  }, []);

  if (isLoading) {
    return <Wrapper>Loading...</Wrapper>;
  }
  return (
    <Wrapper>
      <GradientImage>
        <img
          src={
            'https://storage.googleapis.com/slowy_storage123/latrach-med-jamil-Eb6hMEhGlKY-unsplash.jpg'
          }
        />
      </GradientImage>
      <ExitButton onClick={onClickExitBtn}>X</ExitButton>
      {/* onClick 구현 */}
      <Bookmark
        onClick={() => {
          mutate({
            fridgeId: id,
            state: fridgeDetailData.isBookmark,
            token: token,
          });
        }}
      >
        {fridgeDetailData.isBookmark ? <IoStarSharp /> : <IoStarOutline />}
      </Bookmark>
      <Info>
        <Title>{fridgeDetailData.fridgeInfo.fridgeName}</Title>
        <Address>
          <IoLocationSharp /> {fridgeDetailData.fridgeInfo.fridgeAddress}
        </Address>
        <BtnArea>
          <Donate onClick={() => onClickBtn('donate')}>Donate</Donate>
          <Reserve onClick={() => onClickBtn('reserve')}>Reserve</Reserve>
        </BtnArea>
      </Info>
      <Sections>
        <Menu>
          <div
            className={`menu-btn ${isList ? 'active' : ''}`}
            onClick={() => onClickMenuBtn(true)}
          >
            Food List
          </div>
          <div> | </div>
          <div
            className={`menu-btn ${isList ? '' : 'active'}`}
            onClick={() => onClickMenuBtn(false)}
          >
            Hearty Talk
          </div>
        </Menu>
        <ContentWrapper>
          {isList ? (
            <DetailFoodList data={fridgeDetailData.foodList} />
          ) : (
            <MessageList data={fridgeDetailData.messageList} />
          )}
        </ContentWrapper>
      </Sections>
      {isReservation && (
        <ReservationModal
          show={isReservation}
          onCloseModal={onCloseModal}
          data={fridgeDetailData.foodList}
          reservationList={reservationList}
          setReservationList={setReservationList}
          handleSubmit={ReservationHandleSubmit}
        />
      )}
      {isConfirm && (
        <ConfirmModal
          id={id}
          data={reservationList}
          loc={fridgeDetailData.fridgeInfo.fridgeName}
          show={isConfirm}
          onCloseModal={onCloseModal}
          showReservation={showReservation}
        />
      )}
      {isDonation && (
        <DonationModal
          id={id}
          show={isDonation}
          setShow={setIsDonation}
          onCloseModal={onCloseModal}
        />
      )}
    </Wrapper>
  );
};

export default FridgeDetail;

const Wrapper = styled.div`
  position: relative; //이걸 해줘야 img의 absolute가 제대로 들어감
  background-color: white;
  min-width: 480px;
  height: calc(100vh - 112px);
  z-index: 1;
`;

const GradientImage = styled.div`
  position: absolute;
  top: 0px;
  width: 480px;
  height: 193px;
  z-index: 2;
  & > img {
    width: 100%;
    height: 374px;
  }
  ::after {
    display: block;
    position: relative;
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0,
      #fff 100%
    );
    margin-top: -150px;
    height: 150px;
    width: 100%;
    content: '';
  }
`;

const ExitButton = styled.button`
  position: absolute;
  font-size: 20px;
  top: 5px;
  right: 5px;
  z-index: 10;
  background: none;
  border: none;
  :hover {
    background: gray;
  }
`;

const Bookmark = styled.div`
  text-align: center;
  float: right;
  position: relative;
  width: 40px;
  height: 48px;
  background-color: white;
  border-radius: 10% 10% 0px 0px;
  margin: 158px 26px -18px 31px;
  z-index: 4;
  svg {
    color: ${({ theme }) => theme.palette.primary};
    margin-top: 4px;
    width: 20px;
    height: 20px;
  }
`;

const Info = styled.div`
  width: 423px;
  height: 193px;
  position: relative;
  z-index: 3;
  display: flex;
  margin: -20px 26px 0px 31px;
  padding: 42px 0px;
  background-color: white;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.palette.beige2};
  box-shadow: 0px 0px 20 rgba(0, 0, 0, 5%);
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.secondary.main};
  margin-bottom: 8px;
`;

const Address = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.secondary.main70};
  margin-bottom: 21px;
`;

const BtnArea = styled.div`
  display: flex;
  column-gap: 9px;
`;

const BtnStyle = css`
  border: none;
  width: 80px;
  height: 32px;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
`;

const Donate = styled.button`
  ${BtnStyle};
  background-color: ${({ theme }) => theme.palette.primary};
  color: white;
`;

const Reserve = styled.button`
  ${BtnStyle}
  background-color: ${({ theme }) => theme.palette.beige1};
  color: ${({ theme }) => theme.palette.primary};
`;

const Sections = styled.div`
  margin: 12px 26px 0px 31px;
  border-radius: 10px;
  width: 423px;
  height: 517px;
  & > .name {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.secondary.main};
    margin-top: 24px;
    margin-bottom: 16px;
  }
  border: 1px solid ${({ theme }) => theme.palette.beige1};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 5%);
`;

const Menu = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: 600;
  column-gap: 16px;
  padding: 26px 0px 0px 33px;
  color: ${({ theme }) => theme.palette.secondary.main30};
  .active {
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

const ContentWrapper = styled.div`
  margin: 20px 0px 0px 20px;
  height: 437px;
  overflow-y: scroll;
`;
