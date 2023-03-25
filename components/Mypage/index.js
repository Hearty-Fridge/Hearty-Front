import { axiosInstance } from 'api';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import ProfileData from './ProfileData';
import ReservationData from './ReservationData';
import GnTData from './GnTData';
import MsgData from './MsgData';

const MypageComponent = () => {
  const { data } = useQuery(
    ['getProfile'],
    async () => await axiosInstance.get(`/member/getProfile`)
  );

  if (!data) {
    return null;
  }

  const user = data.data.data;

  return (
    <Boxes>
      <ProfileBox>
        <ProfileData user={user} />
      </ProfileBox>
      <DataBox>
        <ReservationBox>
          <ReservationData />
        </ReservationBox>
        <GnTBox>
          <GnTData />
        </GnTBox>
        <MessageBox>
          <MsgData />
        </MessageBox>
      </DataBox>
    </Boxes>
  );
};
export default MypageComponent;

const Boxes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1439px;
  margin: 0 auto;
  margin-top: 35px;
  height: auto;
`;

const ProfileBox = styled.div`
  width: 395px;
  height: 1076px;
  background-color: #ffffff;

  border: 1px solid #f1eae0;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const DataBox = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  width: 1025px;
`;

const ReservationBox = styled.div`
  width: 1025px;
  height: 289px;
  background-color: #ffffff;

  border: 1px solid #f1eae0;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const GnTBox = styled.div`
  width: 1025px;
  height: 395px;
  background-color: #ffffff;

  border: 1px solid #f1eae0;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const MessageBox = styled.div`
  width: 1025px;
  height: 350px;
  background-color: #ffffff;

  border: 1px solid #f1eae0;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;
