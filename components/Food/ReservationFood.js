import styled from 'styled-components';
import moment from 'moment';
import { useEffect, useState } from 'react';

const ReservationFood = ({ data }) => {
  const [expirationDate, setExpirationDate] = useState(
    moment(data.expiration).format('YYYY.MM.DD')
  );
  const [expLeft, setExpLeft] = useState(100);

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
      <FoodCheckbox type="checkbox" />
      <FoodPhoto />
      <Info>
        <div
          style={{ display: 'flex', columnGap: '12px', alignItems: 'center' }}
        >
          <div className="foodName">{data.food.name}</div>
          {expLeft <= 1 && <Tag>{`${expLeft} day`}</Tag>}
        </div>
        <div className="etc">{`${data.food.amount} | ~${expirationDate}`}</div>
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
`;

const FoodCheckbox = styled.input`
  height: 63px;
`;

const FoodPhoto = styled.div`
  min-width: 63px;
  height: 63px;
  background-color: red;
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
