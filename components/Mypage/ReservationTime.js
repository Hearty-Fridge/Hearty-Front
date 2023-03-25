// 사용하지 않는 Count 컴포넌트

const dayjs = require('dayjs');
const { useState, useEffect } = require('react');
const { default: styled } = require('styled-components');

const ReservationTime = ({ time }) => {
  const [currentTime, setCurrentTime] = useState(dayjs(time));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => prevTime.subtract(1, 'second'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <StyledReservation>{currentTime.format('mm:ss')}</StyledReservation>;
};

export default ReservationTime;

const StyledReservation = styled.div`
  width: 185px;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  color: ${({ theme }) => theme.palette.accent};
`;
