import styled, { css } from 'styled-components';
import Modal from './Modal';
import { IoCloseSharp } from 'react-icons/io5';
import TakerForm from '@components/Form/TakerForm';

const TakerModal = ({ show, onCloseModal }) => {
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Container>
        <Top>
          <Title>Recipient authentication</Title>
          <Exit onClick={onCloseModal}>
            <IoCloseSharp
              style={{
                width: '41px',
                height: '41px',
                color: '#594C48',
                cursor: 'pointer',
              }}
            />
          </Exit>
        </Top>
        <Info>
          Authenticate your Supplemental Security Income recipient and try
          Hearty Fridge.
        </Info>
        <TakerForm />
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 898px;
  min-height: 706px;
  background-color: white;
  padding: 48px 48px 0px 59px;
  border-radius: 10px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary};
`;

const Exit = styled.div`
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  margin-top: 10px;
  color: rgba(89, 76, 72, 0.7);
  margin-bottom: 48px;
`;

export default TakerModal;
