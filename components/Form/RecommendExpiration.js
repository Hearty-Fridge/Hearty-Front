import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';

export const Recommend = ({ show, setShow }) => {
  return (
    <Wrapper>
      <Top>
        <div>Recommended intake period</div>
        <IoCloseSharp onClick={() => setShow(false)} />
      </Top>
      <Info>
        <div>Category</div>
        <div>expiration date</div>
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
    name: 'Instant food (non-sterile)',
    expiration: '73 hours',
  },
  {
    name: 'Liquid egg',
    expiration: '4 days',
  },
  {
    name: 'Instant cooking food',
    expiration: '5 days',
  },
  {
    name: 'meal kit',
    expiration: '8 days',
  },
  {
    name: 'Fresh convenience food',
    expiration: '8 days',
  },
  {
    name: 'Starch jelly',
    expiration: '19 days',
  },
  {
    name: 'Fruit and vegetable juice',
    expiration: '20 days',
  },
  {
    name: 'Tofu',
    expiration: '23 days',
  },
  {
    name: 'Processed milk',
    expiration: '24 days',
  },
  {
    name: 'Matured fermented milk',
    expiration: '24 days',
  },
  {
    name: 'Probiotic drink',
    expiration: '26 days',
  },
  {
    name: 'Creamy fermented milk',
    expiration: '28 days',
  },
  {
    name: 'Bacon',
    expiration: '28 days',
  },
  {
    name: 'Bread',
    expiration: '31 days',
  },
  {
    name: 'Fermented milk',
    expiration: '32 days',
  },
  {
    name: 'Fruit and vegetable juice',
    expiration: '35 days',
  },
  {
    name: 'Fresh noodles',
    expiration: '42 days',
  },
  {
    name: 'Fish cake',
    expiration: '42 days',
  },
  {
    name: 'Instant food (sterilized)',
    expiration: '44 days',
  },
  {
    name: 'Baby food',
    expiration: '46 days',
  },
  {
    name: 'Sausage',
    expiration: '56 days',
  },
  {
    name: 'Ham',
    expiration: '57 days',
  },
  {
    name: 'Pressed ham',
    expiration: '66 days',
  },
  {
    name: 'Snacks',
    expiration: '81 days',
  },
];
