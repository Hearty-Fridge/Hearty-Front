import { getFridgesById } from 'api/Fridges/useFridges';
import styled, { css } from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IoLocationSharp } from 'react-icons/io5';

const DETAIL_MENU = ['foodList, heartyTalk'];

const FridgeDetail = ({ isList, setIsList }) => {
  const router = useRouter();
  const [id, setId] = useState(-1);
  const {
    data: fridgeDetailData,
    refetch,
    isLoading,
    error,
  } = getFridgesById(router.query.id);

  const onClickBtn = (to) => {
    router.push(`/map?id=${id}&${to}=true`);
  };

  const onClickExitBtn = useCallback(() => {
    router.push(`/map`);
  }, []);

  // if t == true이면 Food List를 눌렀을 때, 아니면 Hearty Talk을 눌렀을 때
  const onClickMenuBtn = useCallback((t) => {
    setIsList(t);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      refetch();
      setId(router.query.id);
    }
  }, [refetch, setId]);

  if (isLoading) {
    return <Wrapper>Loading...</Wrapper>;
  }
  return (
    <Wrapper>
      <GradientImage>
        <img
          src={`${process.env.NEXT_PUBLIC_SERVER_NAME}/${fridgeDetailData.fridgeImage}`}
        />
      </GradientImage>
      <ExitButton onClick={onClickExitBtn}>X</ExitButton>
      <Info>
        <Title>{fridgeDetailData.name}</Title>
        <Address>
          <IoLocationSharp /> {fridgeDetailData.address}
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
        {isList ? <>Food List</> : <>Hearty Talk</>}
      </Sections>
    </Wrapper>
  );
};

export default FridgeDetail;

const Wrapper = styled.div`
  position: relative; //이걸 해줘야 img의 absolute가 제대로 들어감
  background-color: white;
  min-width: 480px;
  height: calc(100vh - 144px);
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

const ColoredHr = styled.hr`
  position: relative;
  border: 1px ${({ theme }) => theme.palette.beige2} solid;
  margin-left: 42px;
  margin-right: 42px;
`;

const Info = styled.div`
  width: 423px;
  height: 193px;
  position: relative;
  z-index: 3;
  display: flex;
  margin: 188px 26px 0px 31px;
  padding: 42px 0px;
  background-color: white;
  flex-direction: column;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 25%);
`;

const Title = styled.div`
  font-size: 32px;
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
  height: 450px;
  .name {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.secondary.main};
    margin-top: 24px;
    margin-bottom: 16px;
  }
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 25%);
`;

const Menu = styled.div`
  display: flex;
  font-size: 24px;
  column-gap: 16px;
  padding: 26px 0px 0px 33px;
  color: ${({ theme }) => theme.palette.secondary.main30};
  .active {
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;
