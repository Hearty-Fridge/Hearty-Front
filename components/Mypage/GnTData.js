import styled from 'styled-components';

const GnTData = () => {
  return (
    <Wrapper>
      <Title>Give & Take</Title>
      <SubTitle>내가 어쩌구한 내역을 확인할 수 있어요</SubTitle>
      <Table>
        <TH>
          <THTxt>Time</THTxt>
          <THTxt>Food</THTxt>
          <THTxt>Location</THTxt>
        </TH>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 32px 30px;
`;

const Title = styled.div`
  padding-bottom: 12px;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

  color: ${({ theme }) => theme.palette.secondary.main};
`;

const SubTitle = styled.div`
  padding-bottom: 22px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;

  color: rgba(89, 76, 72, 0.7);
`;

const Table = styled.div`
  width: 966px;
  height: 174px;
`;
const TH = styled.div`
  display: flex;
  align-items: center;
  column-gap: 150px;
  padding-left: 118px;
  width: 966px;
  height: 40px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.beige1};
`;
const THTxt = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;

  color: rgba(89, 76, 72, 0.7);
`;

export default GnTData;
