import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';

export const Recommend = ({ show, setShow }) => {
  return (
    <Wrapper>
      <Top>
        <div>권장 섭취 기간</div>
        <IoCloseSharp onClick={() => setShow(false)} />
      </Top>
      <Info>
        <div>식품유형</div>
        <div>소비기한</div>
      </Info>
      <FoodArea>
        {Expiration.map((exp) => (
          <FoodWrapper>
            <div>{exp.name}</div>
            <div>{exp.expiration}</div>
          </FoodWrapper>
        ))}
      </FoodArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: 280px;
  top: 300px;
  width: 328px;
  height: 331px;
  padding: 18px 24px 21px;
  z-index: 300;
  background-color: white;
  border-radius: 10px: 
  filter: drop-shadow(0 0 20px #0000000B);
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 18px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.secondary.main50};
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 11px;
`;

const FoodArea = styled.div`
  max-height: 220px;
  overflow-y: scroll;
`;

const FoodWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 24px;
`;

const Expiration = [
  {
    name: '즉섭섭취식품(비살균)',
    expiration: '73시간',
  },
  {
    name: '전란액(액상 계란)',
    expiration: '4일',
  },
  {
    name: '즉석조리식품(인스턴트)',
    expiration: '5일',
  },
  {
    name: '간편조리세트(밀키트)',
    expiration: '8일',
  },
  {
    name: '신선편의식품(간편 샐러드 등)',
    expiration: '8일',
  },
  {
    name: '묵류',
    expiration: '19일',
  },
  {
    name: '과채음료',
    expiration: '20일',
  },
  {
    name: '두부',
    expiration: '23일',
  },
  {
    name: '가공유(가공우유)',
    expiration: '24일',
  },
  {
    name: '농후발효유',
    expiration: '24일',
  },
  {
    name: '유산균 음료',
    expiration: '26일',
  },
  {
    name: '크림발효유',
    expiration: '28일',
  },
  {
    name: '베이컨류',
    expiration: '28일',
  },
  {
    name: '빵류',
    expiration: '31일',
  },
  {
    name: '발효유',
    expiration: '32일',
  },
  {
    name: '과채주스',
    expiration: '35일',
  },
  {
    name: '생면',
    expiration: '42일',
  },
  {
    name: '어묵',
    expiration: '42일',
  },
  {
    name: '즉석섭취식품(살균)',
    expiration: '44일',
  },
  {
    name: '영/유아용 이유식',
    expiration: '46일',
  },
  {
    name: '소시지',
    expiration: '56일',
  },
  {
    name: '햄',
    expiration: '57일',
  },
  {
    name: '프레스햄',
    expiration: '66일',
  },
  {
    name: '과자',
    expiration: '81일',
  },
];
