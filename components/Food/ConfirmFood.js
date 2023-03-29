import styled from 'styled-components';
import moment from 'moment';
import { getFoodImageById } from 'api/Food/useFoods';

const ConfirmFood = ({ data }) => {
  const token = localStorage.getItem('accessToken');
  const { data: imageData, refetch } = getFoodImageById({
    giveId: data.id,
    token: token,
  });
  return (
    <FoodWrapper>
      {imageData && imageData.images.length ? (
        <StyledImg
          src={`${imageData.baseUri}${imageData.images[0].uuidFileName}`}
          alt="foodImage"
        />
      ) : (
        <FoodImg></FoodImg>
      )}

      <FoodInfo>
        <Name>{data.name}</Name>
        <Detail>{`${data.amount} | ~${moment(data.expiration).format(
          'YYYY.MM.DD'
        )}`}</Detail>
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
  box-shadow: 0 0 20px rgba(0, 0, 0, 5%);
`;

const StyledImg = styled.img`
  width: 120px;
  height: 120px;
`;

const FoodImg = styled.div`
  min-width: 120px;
  min-height: 120px;
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
  margin-bottom: 8px;
`;
