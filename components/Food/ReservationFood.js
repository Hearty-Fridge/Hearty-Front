import styled from 'styled-components';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { getFoodImageById } from 'api/Food/useFoods';

const ReservationFood = ({ data, onClickCheck }) => {
  const token = localStorage.getItem('accessToken');
  const [expirationDate] = useState(
    moment(data.food.expiration).format('YYYY.MM.DD')
  );
  const [expLeft, setExpLeft] = useState(100);
  const { data: imageData, refetch } = getFoodImageById({
    giveId: data.giveId,
    token: token,
  });

  // 남은 일자 계산
  useEffect(() => {
    const exp = moment(data.food.expiration).format('YYYY.MM.DD').split('.');
    const now = moment(new Date()).format('YYYY.MM.DD').split('.');
    var stDate = new Date(now[0], now[1], now[2]);
    var endDate = new Date(exp[0], exp[1], exp[2]);
    var btMs = endDate.getTime() - stDate.getTime();
    var btDay = btMs / (1000 * 60 * 60 * 24);
    setExpLeft(btDay);
  }, [setExpLeft]);

  return (
    <FoodWrapper>
      <div
        style={{
          marginLeft: '20 px',
          height: '63px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FoodCheckbox
          id={`reserve-${data.food.id}`}
          type="checkbox"
          onClick={(obj) => onClickCheck(obj, data)}
        />
      </div>
      {imageData && imageData.images.length ? (
        <StyledImg
          src={`${imageData.baseUri}${imageData.images[0].uuidFileName}`}
          alt="hi"
        />
      ) : (
        <NotLoaded></NotLoaded>
      )}
      <Info>
        <div
          style={{ display: 'flex', columnGap: '12px', alignItems: 'center' }}
        >
          <div className="foodName">{data.food.name}</div>
          {expLeft == 1 && <Tag>{`${expLeft} day`}</Tag>}
        </div>
        <div className="etc">
          {data.food.amount} <span className="seperator">|</span> ~
          {expirationDate}
        </div>
        <div className="message">{data.food.message}</div>
      </Info>
    </FoodWrapper>
  );
};

export default ReservationFood;

const FoodWrapper = styled.div`
  display: flex;
  height: 129px;
  border-top: solid 1px ${({ theme }) => theme.palette.beige2};
  padding-top: 18px;
  column-gap: 20px;
  :hover {
    background-color: ${({ theme }) => theme.palette.beige1};
  }
`;

const FoodCheckbox = styled.input`
  vertical-align: middle;
  width: 1.25em;
  height: 1.25em;
  appearance: none;
  margin-left: 10px;
  border: max(2px, 0.1em) solid gray;
  border-radius: 10px;
  :checked {
    content: '✓';
    border: 0.4em solid tomato;
  }
`;

const StyledImg = styled.img`
  width: 63px;
  height: 63px;
`;
const NotLoaded = styled.div`
  min-width: 63px;
  height: 63px;
`;

const Info = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  .foodName {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.primary};
  }
  .etc {
    font-weight: 600;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
  .message {
    display: -webkit-box;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.palette.secondary.main30};
    -webkit-line-clamp: 2;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
  .seperator {
    color: ${({ theme }) => theme.palette.secondary.main30};
  }
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 49px;
  height: 22px;
  background-color: #a3c2d3;
  color: white;
  font-size: 12px;
  border-radius: 5px;
`;
