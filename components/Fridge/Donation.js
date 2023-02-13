import DonateForm from '@components/Modal/DonateForm';
import styled from 'styled-components';
import { getFridgesById } from 'api/Fridges/useFridges';

const Donation = ({ id }) => {
  const { data } = getFridgesById(id);
  return (
    <Container>
      {data?.name}
      <DonateForm id={id} />
    </Container>
  );
};

const Container = styled.div`
  min-width: 480px;
`;

export default Donation;
