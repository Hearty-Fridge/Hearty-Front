import { axiosInstance } from 'api';
import { useState } from 'react';
import { useQuery } from 'react-query';
import LeaveMsgModal from '@components/Modal/LeaveMsgModal';
import styled from 'styled-components';
import dayjs from 'dayjs';

const GnTData = () => {
  const [openModal, setOpenModal] = useState(false);

  const setCloseModal = () => {
    setOpenModal(false);
  };

  const onClickItem = () => {
    setOpenModal(true);
  };

  const { data: givesData } = useQuery(
    ['getGives'],
    async () => await axiosInstance.get(`/member/getGives`)
  );
  const { data: takesData } = useQuery(
    ['getTakes'],
    async () => await axiosInstance.get(`/member/getTakes`)
  );

  if (!givesData || !takesData) {
    return null;
  }

  const gives = givesData.data.data;
  const takes = takesData.data.data;

  const GNT_LIST = gives.concat(takes);
  const list = GNT_LIST.sort((a, b) => {
    const dateA = dayjs(a.time);
    const dateB = dayjs(b.time);
    return dateB - dateA;
  });

  return (
    <Wrapper>
      <Title>Give & Take</Title>
      <SubTitle>You can see what you've donated and received.</SubTitle>
      <Table>
        <TH>
          <THTxt>Time</THTxt>
          <THTxt>Food</THTxt>
          <THTxt>Location</THTxt>
        </TH>
        {list.length == 0 ? (
          <NoneText>
            <First>There is no recent activity.</First>
            <Second>Try the map function!</Second>
          </NoneText>
        ) : (
          <></>
        )}
        <TDWrapper>
          {list.map((item) => (
            <>
              <TD key={item.index}>
                {item.type == 'give' ? (
                  <TagGive>Give</TagGive>
                ) : (
                  <TagTake>Take</TagTake>
                )}
                <TDTxt>{dayjs(item.time).format('YYYY.MM.DD')}</TDTxt>
                <TDTxt>{item.foodName}</TDTxt>
                <LocBox>
                  <TDTxt>{item.fridgeAddress}</TDTxt>
                  <TDSubTxt>{item.fridgeName}</TDSubTxt>
                </LocBox>
                <Buttons>
                  {item.status == 'COMPLETED' ? (
                    <OffBtn>Leave a Message</OffBtn>
                  ) : (
                    <>
                      <OnBtn onClick={onClickItem}>Leave a Message</OnBtn>
                      {openModal && (
                        <>
                          <LeaveMsgModal
                            show={openModal}
                            onCloseModal={setCloseModal}
                            item={item}
                          />
                        </>
                      )}
                    </>
                  )}
                </Buttons>
              </TD>
              <Divider />
            </>
          ))}
        </TDWrapper>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 32px 30px;
`;

const Title = styled.div`
  padding-bottom: 5px;
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

const NoneText = styled.div`
  text-align: center;
  margin-top: 90px;
  color: #594c48;
`;
const First = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
`;
const Second = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;

const TDWrapper = styled.div`
  height: 210px;
  overflow-y: auto;
  overflow-x: hidden;
`;
const TD = styled.div`
  display: flex;
  align-items: center;
  padding-left: 44px;
  width: 966px;
  height: 70px;
`;
const TagTake = styled.div`
  margin-right: 28px;
  padding: 4px 10px;
  width: 46px;
  height: 22px;
  font-weight: 500;
  font-size: 12px;

  background: #a6cda5;
  border-radius: 5px;
  color: white;

  text-align: center;
`;
const TagGive = styled.div`
  margin-right: 28px;
  padding: 4px 10px;
  width: 46px;
  height: 22px;
  font-weight: 500;
  font-size: 12px;

  background: #d6a9a9;
  border-radius: 5px;
  color: white;

  text-align: center;
`;
const TDTxt = styled.div`
  width: 215px;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;
const TDSubTxt = styled.div`
  padding-top: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.palette.secondary.main};
`;
const LocBox = styled.div`
  width: 360px;
`;

const Buttons = styled.div`
  float: right;
  display: flex;
  width: 194px;
  column-gap: 23px;
`;
const OnBtn = styled.button`
  cursor: pointer;
  width: 148px;
  height: 37px;
  text-align: center;
  color: white;
  font-size: 16px;
  background-color: ${({ theme }) => theme.palette.primary};
  border: 1px solid #f2916e;
  border-radius: 10px;
`;
const OffBtn = styled.button`
  width: 148px;
  height: 37px;
  text-align: center;
  color: white;
  font-size: 16px;
  background: rgba(89, 76, 72, 0.3);
  border: 1px solid white;
  border-radius: 10px;
`;

const Divider = styled.hr`
  width: 965px;
  height: 0px;

  border: 1px solid #e9dfd2;
`;

export default GnTData;
