import styled from 'styled-components';
import { useState } from 'react';
import { axiosInstance } from 'api';
import { useQuery } from 'react-query';
import TakerModal from '@components/Modal/TakerModal';

const Cancel = () => {};

const ProfileData = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);

  const setCloseModal = () => {
    setOpenModal(false);
  };

  const handleTaker = () => {
    setOpenModal(true);
  };

  const { data: takeData } = useQuery(
    ['getTakes'],
    async () => await axiosInstance.get(`/take/getTakes`)
  );
  const { data: giveData } = useQuery(
    ['getGives'],
    async () => await axiosInstance.get(`/give/getGives`)
  );

  if (!takeData || !giveData) {
    return null;
  }

  const takes = takeData.data.data;
  const gives = giveData.data.data;
  return (
    <>
      {' '}
      <Wrapper>
        <Wrap>
          <UserImg src="http://34.64.101.33:8080/images/defaultImage.png" />
          <UserName>{user.name}</UserName>
          <UserMail>{user.email}</UserMail>
        </Wrap>
        <Bar />
        <Wrap>
          <Title>Record</Title>
          <RecData>
            <RecFlex>
              <div>Whole Refrigerator Deals</div>
              <div>{gives.length + takes.length}</div>
            </RecFlex>
            <RecFlex>
              <div>Sending hearts</div>
              <div>{gives.length}</div>
            </RecFlex>
            <RecFlex>
              <div>Receiving hearts</div>
              <div>{takes.length}</div>
            </RecFlex>
          </RecData>
        </Wrap>
        <Bar />
        <Wrap>
          <Title>Certification</Title>
          {user.isTaker ? (
            <Card>
              <CardM>Beneficiary authentication is complete!</CardM>
              <CardD>2022.03.21 ~ 2023.03.21</CardD>
              <Flex>
                <CardB onClick={() => Cancel()}>Cancel</CardB>
              </Flex>
            </Card>
          ) : (
            <Card>
              <CardMC>Recipient authentication is required!</CardMC>
              <CardD>Initial authentication is required.</CardD>
              <Flex>
                <CardBC onClick={handleTaker}>Authenticate</CardBC>
              </Flex>
              {openModal && (
                <>
                  <TakerModal show={openModal} onCloseModal={setCloseModal} />
                </>
              )}
            </Card>
          )}
        </Wrap>
      </Wrapper>
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

const UserImg = styled.img`
  width: 212px;
  height: 212px;
  border-radius: 50%;
  background-color: #d9d9d9;
  margin-left: 40px;
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
  justify-content: right;
  width: 100%;
`;

const CardBC = styled.button`
  padding: 9px 16px;
  background: ${({ theme }) => theme.palette.primary};
  border-radius: 10px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: white;
  border: none;
  cursor: pointer;
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

const CardMC = styled.div`
  padding-bottom: 6px;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;

  color: ${({ theme }) => theme.palette.primary};
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
