import styled from 'styled-components';
import { getFridgesById } from 'api/Fridges/useFridges';

const Reservation = ({ id }) => {
  const { data } = getFridgesById(id);
  return (
    <Container>
      <div>This is Reservation Page</div>
    </Container>
  );
};

const Container = styled.div`
  min-width: 480px;
  background-color: ${({ theme }) => theme.palette.background};
`;

export default Reservation;
