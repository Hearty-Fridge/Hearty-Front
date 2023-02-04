import { getFridgesById } from 'api/Fridges/useFridges';
import styled from 'styled-components';
import { useEffect } from 'react';
import Image from 'next/image';

const FridgeDetail = ({ showDetail, setShow }) => {
  const { data: detailData, refetch, isLoading } = getFridgesById(showDetail);
  useEffect(() => {
    refetch();
  }, [showDetail]);
  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Wrapper>
        <div onClick={() => setShow(null)}>X</div>
        <StyledImg
          src={`${process.env.NEXT_PUBLIC_SERVER_NAME}/${detailData.fridgeImage}`}
        />
        <Info>
          <Title>{detailData.name}</Title>
          <Address>{detailData.address}</Address>
          <BtnArea>
            <Donate>Donate</Donate>
            <Reserve>Reserve</Reserve>
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
  }
};

export default FridgeDetail;

const Wrapper = styled.div`
  position: relative; //이걸 해줘야 img의 absolute가 제대로 들어감
  background-color: white;
  width: 500px;
  z-index: -2;
`;

const StyledImg = styled.img`
  position: absolute;
  top: 0px;
  width: 350px;
  z-index: -1;
`;

const ColoredHr = styled.hr`
  position: relative;
  margin-left: 42px;
  margin-right: 42px;
`;

const Info = styled.div`
  z-index: 1;
  display: flex;
  margin: 30px;
  margin-top: 220px;
  padding-top: 42px;
  padding-bottom: 42px;
  background-color: white;
  flex-direction: column;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 36px;
  color: ${(props) => props.theme.palette.secondary.main};
`;

const Address = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.palette.secondary.main70};
`;

const BtnArea = styled.div`
  display: flex;
`;
const Donate = styled.button`
  background-color: ${(props) => props.theme.palette.primary};
  color: white;
  border: none;
  width: 80px;
  height: 32px;
  border-radius: 10px;
  font-size: 14px;
`;

const Reserve = styled.button`
  background-color: ${(props) => props.theme.palette.beige1};
  color: ${(props) => props.theme.palette.primary};
  border: none;
  width: 80px;
  height: 32px;
  border-radius: 10px;
  font-size: 14px;
`;

const Sections = styled.div`
  margin-left: 70px;
  margin-right: 70px;
`;

const Section = styled.div`
  .name {
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.palette.secondary.main};
    margin-top: 24px;
    margin-bottom: 16px;
  }
`;
