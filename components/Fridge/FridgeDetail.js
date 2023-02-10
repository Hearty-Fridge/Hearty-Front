import { getFridgesById } from 'api/Fridges/useFridges';
import styled, { css } from 'styled-components';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

const FridgeDetail = ({ fridgeId, setIsDetail, setDetailData }) => {
  const router = useRouter();
  const { data: fridgeDetailData, isLoading, error } = getFridgesById(fridgeId);

  const onClickBtn = (to) => {
    router.push(`/map?id=${fridgeId}&${to}=true`);
  };

  const onClickExitBtn = useCallback(() => {
    router.push(`/map`);
    setIsDetail(null);
  }, [setIsDetail]);

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
        <Address>{fridgeDetailData.address}</Address>
        <BtnArea>
          <Donate onClick={() => onClickBtn('donate')}>Donate</Donate>
          <Reserve onClick={() => onClickBtn('reserve')}>Reserve</Reserve>
        </BtnArea>
      </Info>
      <ColoredHr />
      <Sections>
        <Section>
          <div className="name">Food List</div>
        </Section>
        <Section>
          <div className="name">Hearty Talk</div>
        </Section>
      </Sections>
    </Wrapper>
  );
};

export default FridgeDetail;

const Wrapper = styled.div`
  position: relative; //이걸 해줘야 img의 absolute가 제대로 들어감
  background-color: white;
  min-width: 527px;
  height: calc(100vh - 137px);
  z-index: 1;
`;

const GradientImage = styled.div`
  position: absolute;
  top: 0px;
  width: 527px;
  height: 374px;
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
  width: 466px;
  height: 213px;
  position: relative;
  z-index: 3;
  display: flex;
  margin: 228px 30px 0px;
  padding: 42px 0px;
  background-color: white;
  flex-direction: column;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
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
  margin-left: 70px;
  margin-right: 70px;
`;

const Section = styled.div`
  .name {
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.secondary.main};
    margin-top: 24px;
    margin-bottom: 16px;
  }
`;
