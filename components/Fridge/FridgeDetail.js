import styled from 'styled-components';
const FridgeDetail = ({ setShow }) => {
  return (
    <Wrapper>
      <div onClick={() => setShow(null)}>X</div>This is FridgeDetail
    </Wrapper>
  );
};

export default FridgeDetail;

const Wrapper = styled.div`
  background-color: white;
`;
