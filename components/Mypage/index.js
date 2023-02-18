import styled from 'styled-components';
import ProfileData from './ProfileData';

const MypageComponent = () => {
  return (
    <Boxes>
      <ProfileBox>
        <ProfileData />
      </ProfileBox>
      <DataBox>
        <ReservationBox />
        <GnTBox />
        <MessageBox />
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
