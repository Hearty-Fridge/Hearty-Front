import styled from 'styled-components';

const RESERV_LIST = [
  {
    time: '21:23',
    food: '페퍼로니 피자',
    location: {
      main: '서울시 노원구 공릉동 123',
      sub: '공릉 1동 주민센터 냉장고',
    },
  },
  {
    time: '29:40',
    food: '유기농 계란',
    location: {
      main: '서울시 노원구 공릉동 123',
      sub: '공릉 1동 주민센터 냉장고',
    },
  },
];

const ReservationData = () => {
  return (
    <>
      <Wrapper>
        <Title>Reservation</Title>
        <Table>
          <TH>
            <THTxt>Time</THTxt>
            <THTxt>Food</THTxt>
            <THTxt>Location</THTxt>
          </TH>
          {RESERV_LIST.map((reserv) => (
            <TD key={reserv}>
              <Time>{reserv.time}</Time>
              <TDTxt>{reserv.food}</TDTxt>
              <LocBox>
                <TDTxt>{reserv.location.main}</TDTxt>
                <TDSubTxt>{reserv.location.sub}</TDSubTxt>
              </LocBox>
              <Buttons>
                <BtnCancel>Cancel</BtnCancel>
                <BtnCheck>Check</BtnCheck>
              </Buttons>
            </TD>
          ))}
        </Table>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding: 32px 30px;
`;

const Title = styled.div`
  padding-bottom: 24px;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Table = styled.div`
  width: 966px;
  height: 174px;
`;
const TH = styled.div`
  display: flex;
  align-items: center;
  column-gap: 150px;
  padding-left: 44px;
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
const Time = styled.div`
  width: 185px;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  color: ${({ theme }) => theme.palette.accent};
`;
const TDTxt = styled.div`
  width: 185px;
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
const BtnCancel = styled.button`
  width: 84px;
  height: 37px;
  text-align: center;
  color: ${({ theme }) => theme.palette.primary};

  background-color: white;
  border: 1px solid #f2916e;
  border-radius: 10px;
`;
const BtnCheck = styled.button`
  width: 84px;
  height: 37px;
  text-align: center;
  color: white;

  background-color: ${({ theme }) => theme.palette.primary};
  border: 1px solid #f2916e;
  border-radius: 10px;
`;
export default ReservationData;
