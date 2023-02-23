import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import { getYear, getMonth } from 'date-fns';
import { useRef, useState } from 'react';

const Calendar = ({ expirationDate, setExpirationDate }) => {
  const calRef = useRef();
  const [curDate, setCurDate] = useState(expirationDate);

  const years = [...Array(100).keys()].map((key) => key + 1990);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  return (
    <DatePickerContainer>
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <Container>
            <YearControl name="year">
              {years.map((y) => {
                return (
                  <option
                    key={y}
                    value={y}
                    onChange={({ target: { value } }) => changeYear(value)}
                  >
                    {getYear(date)}
                  </option>
                );
              })}
            </YearControl>
            <ControlMonth>
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {'<'}
              </button>
              <div>{months[getMonth(date)]}</div>
              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {'>'}
              </button>
            </ControlMonth>
          </Container>
        )}
        ref={calRef}
        // style={{ zIndex: '1100' }}
        closeOnScroll={(e) => e.target === document}
        selected={expirationDate}
        onChange={(selectedDate) => setExpirationDate(selectedDate)}
        dateFormat="yyyy-MM-dd"
        shouldCloseOnSelect={false}
      >
        <CustomFooter>
          <BtnWrapper>
            <button
              type="button"
              onClick={() => {
                setExpirationDate(curDate);
                calRef.current.setOpen(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setCurDate(expirationDate);
                calRef.current.setOpen(false);
              }}
            >
              OK
            </button>
          </BtnWrapper>
        </CustomFooter>
      </DatePicker>
    </DatePickerContainer>
  );
};

export default Calendar;
const CustomFooter = styled.div`
  width: 328px;
  height: 40px;
`;

const BtnWrapper = styled.div`
  width: 121px;
  height: 40px;
  margin-left: auto;
  display: flex;
  align-items: center;
  column-gap: 20px;
  color: ${({ theme }) => theme.palette.primary};
  font-size: 14px;
  & > button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.palette.primary};
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  width: 328px;
`;

const YearControl = styled.select`
  background: none;
  border: none;
  font-size: 14px;
  color: black;
  margin: 8px 0px 8px 16px;
`;

const ControlMonth = styled.div`
  display: flex;
  width: 142px;
  height: 48px;
  margin: 4px 12px 4px 0px;
  align-items: center;
  justify-content: end;
  column-gap: 10px;
  font-size: 14px;
  & > div {
    width: 26px;
  }
  & > button {
    width: 48px;
    height: 48px;
    background: none;
    border: none;
    color: black;
  }
`;

// react-datepicker__day
// react-datepicker__day--023
// react-datepicker__day--keyboard-selected
// react-datepicker__day--today

const DatePickerContainer = styled.div`
  .react-datepicker {
    font-family: 'Pretendard Variable', 'Pretendard', sans-serif;
    width: 328px;
    height: 331px;
    border: 1px solid ${({ theme }) => theme.palette.beige2};
    font-size: 12px;
  }
  .react-datepicker__header--custom {
    background-color: white;
    border-bottom: none;
    padding: 0;
  }
  .react-datepicker__day--selected {
    color: white !important;
    background-color: ${({ theme }) => theme.palette.primary} !important;
    border-radius: 100px;
  }
  .react-datepicker__day--today {
    font-weight: 500;
    border: 1px solid ${({ theme }) => theme.palette.primary};
    background-color: white;
    color: ${({ theme }) => theme.palette.primary};
    border-radius: 100px;
  }
  .react-datepicker__day-names {
    border: none;
    padding: 0;
    margin: 0;
    height: 16px;
  }
  .react-datepicker__day-name {
    width: 40px;
    line-height: 12px;
    color: ${({ theme }) => theme.palette.secondary.main50};
  }
  .react-datepicker__month {
    margin: 0;
    width: 304px;
    height: 200px;
  }
  .react-datepicker__week {
    width: 328px;
    height: 40px;
  }
  .react-datepicker__day {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  .react-datepicker__day--outside-month {
    color: white;
  }
`;
