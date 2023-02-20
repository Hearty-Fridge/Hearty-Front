import styled from 'styled-components';

const ConfirmFood = ({ data }) => {
  return (
    <FoodWrapper>
      <FoodImg></FoodImg>
      <FoodInfo>
        <Name>{data.name}</Name>
        <Detail>{`${data.amount} | ${data.expiration}`}</Detail>
        <div>{data.message}</div>
      </FoodInfo>
    </FoodWrapper>
  );
};

export default ConfirmFood;

const FoodWrapper = styled.div`
  display: flex;
  padding: 20px;
  /* align-items: center; */
  column-gap: 24px;
  width: 458px;
  height: 158px;
  border-radius: 10px;
  margin-bottom: 12px;
  border: 1px solid ${({ theme }) => theme.palette.beige2};
  background-color: ${({ theme }) => theme.palette.beigeWhite};
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const FoodImg = styled.div`
  width: 120px;
  height: 120px;
  background-color: ${({ theme }) => theme.palette.secondary.main30};
`;

const FoodInfo = styled.div``;
const Name = styled.div`
  font-family: 'Playfair Display';
  font-style: italic;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.palette.primary};
`;

const Detail = styled.div`
  font-weight: 16px;
  font-weight: 600;
  line-height: 1.6rem;
`;
