import styled from 'styled-components';
import moment from 'moment';
import { useEffect, useState } from 'react';

const ReservationFood = ({ data, onClickCheck, disabled }) => {
  const [expirationDate] = useState(
    moment(data.food.expiration).format('YYYY.MM.DD')
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
    <FoodWrapper disabled={disabled}>
      <div style={{ height: '63px', display: 'flex', alignItems: 'center' }}>
        <FoodCheckbox
          id={`reserve-${data.food.id}`}
          type="checkbox"
          disabled={disabled}
          onClick={(obj) => onClickCheck(obj, data)}
        />
      </div>
      <FoodPhoto disabled={disabled} />

      <Info disabled={disabled}>
        <div
          style={{ display: 'flex', columnGap: '12px', alignItems: 'center' }}
        >
          <div className="foodName">{data.food.name}</div>
          {expLeft == 1 && <Tag>{`${expLeft} day`}</Tag>}
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
  background-color: ${(props) =>
    props.disabled ? props.theme.palette.background : ''};
  :hover {
    background-color: ${(props) =>
      props.disabled ? '' : props.theme.palette.beige1};
  }
`;

const FoodCheckbox = styled.input`
  vertical-align: middle;
  width: 1.25em;
  height: 1.25em;
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  :checked {
    content: '✓';
    border: 0.4em solid tomato;
  }
  :disabled {
    background-color: gray;
  }
`;

const FoodPhoto = styled.div`
  min-width: 63px;
  height: 63px;
  background-color: ${(props) => (props.disabled ? '#f8f8f8B3' : 'red')};
`;

const Info = styled.div`
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  .foodName {
    font-size: 18px;
    font-weight: 700;
    color: ${(props) =>
      props.disabled
        ? props.theme.palette.secondary.main50
        : props.theme.palette.primary};
  }
  .etc {
    font-weight: 600;
    color: ${(props) =>
      props.disabled
        ? props.theme.palette.secondary.main50
        : props.theme.palette.secondary.main};
  }
  .message {
    color: ${(props) =>
      props.disabled
        ? props.theme.palette.secondary.main50
        : props.theme.palette.secondary.main30};
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
