import styled from 'styled-components';

const GNT_LIST = [
  {
    gnt: 'Take',
    time: '2023.02.12',
    food: '군고구마',
    location: {
      main: '서울시 노원구 공릉동 123',
      sub: '공릉 1동 주민센터 냉장고',
    },
    message: '',
  },
  {
    gnt: 'Give',
    time: '2023.02.14',
    food: '우유',
    location: {
      main: '서울시 노원구 공릉동 123',
      sub: '공릉 1동 주민센터 냉장고',
    },
    message: '맛있게 잘먹었어요!',
  },
  {
    gnt: 'Take',
    time: '2023.02.14',
    food: '계란',
    location: {
      main: '서울시 노원구 공릉동 123',
      sub: '공릉 1동 주민센터 냉장고',
    },
    message: '맛있게 잘먹었어요!',
  },
];

const GnTData = () => {
  return (
    <Wrapper>
      <Title>Give & Take</Title>
      <SubTitle>내가 기부하고 수급한 내역을 확인할 수 있어요</SubTitle>
      <Table>
        <TH>
          <THTxt>Time</THTxt>
          <THTxt>Food</THTxt>
          <THTxt>Location</THTxt>
        </TH>
        {GNT_LIST.map((item) => (
          <TD key={item}>
            <TagTake>Take</TagTake>
            <TDTxt>{item.time}</TDTxt>
            <TDTxt>{item.food}</TDTxt>
            <LocBox>
              <TDTxt>{item.location.main}</TDTxt>
              <TDSubTxt>{item.location.sub}</TDSubTxt>
            </LocBox>
            <Buttons>
              <OnBtn>Leave a Message</OnBtn>
            </Buttons>
          </TD>
        ))}
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 32px 30px;
`;

const Title = styled.div`
  padding-bottom: 12px;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

  color: ${({ theme }) => theme.palette.secondary.main};
`;

const SubTitle = styled.div`
  padding-bottom: 22px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;

  color: rgba(89, 76, 72, 0.7);
`;

const Table = styled.div`
  width: 966px;
  height: 174px;
`;
const TH = styled.div`
  display: flex;
  align-items: center;
  column-gap: 150px;
  padding-left: 118px;
  width: 966px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.beige1};
`;
const THTxt = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  color: rgba(89, 76, 72, 0.7);
`;
const TD = styled.div`
  display: flex;
  align-items: center;
  padding-left: 44px;
  width: 966px;
  height: 70px;
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
const TDTxt = styled.div`
  width: 215px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;
const TDSubTxt = styled.div`
  padding-top: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;
const LocBox = styled.div`
  width: 360px;
`;

const Buttons = styled.div`
  float: right;
  display: flex;
  width: 194px;
  column-gap: 23px;
`;
const OnBtn = styled.button`
  width: 148px;
  height: 37px;
  text-align: center;
  color: white;
  font-size: 16px;
  background-color: ${({ theme }) => theme.palette.primary};
  border: 1px solid #f2916e;
  border-radius: 10px;
`;
const OffBtn = styled.button`
  width: 148px;
  height: 37px;
  text-align: center;
  color: white;
  font-size: 16px;
  background: rgba(89, 76, 72, 0.3);
  border: 1px solid white;
  border-radius: 10px;
`;

export default GnTData;
