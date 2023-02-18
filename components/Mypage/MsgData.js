import styled from 'styled-components';

const MsgData = () => {
  return (
    <Wrapper>
      <Title>My Hearty Fridge</Title>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 32px 30px;
`;

const Title = styled.div`
  padding-bottom: 24px;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

  color: ${({ theme }) => theme.palette.secondary.main};
`;

export default MsgData;
