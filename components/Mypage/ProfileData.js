import styled from 'styled-components';

const ProfileData = () => {
  return (
    <>
      {' '}
      <Wrapper>
        <Wrap>
          <UserImg />
          <UserName>윙스</UserName>
          <UserMail>hyunyoung2203@gmail.com</UserMail>
        </Wrap>
        <Bar />
        <Wrap>
          <Title>Record</Title>
          <RecData>
            <RecFlex>
              <div>전체 냉장고 거래</div>
              <div>27회</div>
            </RecFlex>
            <RecFlex>
              <div>마음 주기</div>
              <div>27회</div>
            </RecFlex>
            <RecFlex>
              <div>마음 받기</div>
              <div>27회</div>
            </RecFlex>
          </RecData>
        </Wrap>
        <Bar />
        <Wrap>
          <Title>Certification</Title>
          <Card>
            <CardM>수급자 인증이 완료되었습니다!</CardM>
            <CardD>2022.03.21 ~ 2023.03.21</CardD>
            <Flex>
              <CardB>취소하기</CardB>
            </Flex>
          </Card>
        </Wrap>
      </Wrapper>
      <SignDate>가입일 2020.06.12</SignDate>
    </>
  );
};

const Wrapper = styled.div`
  padding: 65px 52px 36px 47px;
  height: 975px;
`;

const Wrap = styled.div`
  margin: 0 auto;
`;
const UserImg = styled.div`
  width: 212px;
  height: 212px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin: 0 auto;
`;
const UserName = styled.div`
  padding-top: 25px;
  font-family: 'Playfair Display';
  font-weight: 800;
  font-size: 36px;
  line-height: 48px;
  color: #ed6335;
  text-align: center;
`;
const UserMail = styled.div`
  padding-top: 12px;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  color: rgba(237, 99, 53, 0.7);
`;

const Title = styled.div`
  padding-bottom: 20px;
  float: left;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;

  color: rgba(89, 76, 72, 0.5);
`;

const RecData = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  width: 296px;

  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  color: ${({ theme }) => theme.palette.secondary.main};
`;
const RecFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 296px;
  padding-bottom: 16px;
`;

const Card = styled.div`
  display: flex;
  flex-flow: column;
  align-items: start;
  width: 296px;
  height: 155px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  padding: 26px 24px 18px;
`;
const CardM = styled.div`
  padding-bottom: 6px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;

  color: ${({ theme }) => theme.palette.secondary.main};
`;
const CardD = styled.div`
  padding-bottom: 22px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: ${({ theme }) => theme.palette.secondary.main};
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const CardB = styled.button`
  padding: 9px 16px;
  background: rgba(89, 76, 72, 0.3);
  border-radius: 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: white;
  border: none;
  cursor: pointer;
`;

const SignDate = styled.div`
  float: bottom;
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  text-align: center;

  color: rgba(89, 76, 72, 0.5);
`;

const Bar = styled.hr`
  margin-top: 36px;
  margin-bottom: 36px;
  border: 1px solid #e9dfd2;
`;

export default ProfileData;
