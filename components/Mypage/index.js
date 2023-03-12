import { axiosInstance } from 'api';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import dayjs from 'dayjs';

import ProfileData from './ProfileData';
import ReservationData from './ReservationData';
import GnTData from './GnTData';
import MsgData from './MsgData';

const MypageComponent = () => {
  const { data } = useQuery(
    ['getProfile'],
    async () => await axiosInstance.get(`/member/getProfile3`)
  );

  if (!data) {
    return null;
  }

  const user = data.data.data.profile;
  const reservations = data.data.data.reservations;
  const gives = data.data.data.gives;
  const takes = data.data.data.takes;

  const GNT_LIST = gives.concat(takes);
  const SORTED_GNT = GNT_LIST.sort((a, b) => {
    const dateA = dayjs(a.time);
    const dateB = dayjs(b.time);
    return dateB - dateA;
  });

  const receive = data.data.data.receiveMessages;
  const send = data.data.data.sendMessages;
  const MSG_LIST = receive.concat(send);
  const SORTED_MSG = MSG_LIST.sort((a, b) => {
    const dateA = dayjs(a.time);
    const dateB = dayjs(b.time);
    return dateB - dateA;
  });

  return (
    <Boxes>
      <ProfileBox>
        <ProfileData user={user} gives={gives} takes={takes} />
      </ProfileBox>
      <DataBox>
        <ReservationBox>
          <ReservationData reservations={reservations} />
        </ReservationBox>
        <GnTBox>
          <GnTData list={SORTED_GNT} />
        </GnTBox>
        <MessageBox>
          <MsgData list={SORTED_MSG} />
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

// const MyData = ({ datas }) => {
//   return (
//     <>
//       <div>데이터</div>
//       {datas && datas.map((data) => <div>{data.name}</div>)}
//     </>
//   );
// };

// export default MyData;
