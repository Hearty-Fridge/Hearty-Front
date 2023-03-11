import ListItem from '@components/Fridge/FridgeListItem';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useBookmarkMutation } from 'api/Fridges/useFridges';
import { IoStarSharp } from 'react-icons/io5';

// LocList: 동사무소 위치 정보, setLoc => google map center location setter
const FridgeList = ({
  visibleList,
  setCenterLoc,
  isFavorite,
  setIsFavorite,
}) => {
  const router = useRouter();
  const [id, setId] = useState(false);
  // 1 : memberId
  const onClickFridgeItem = useCallback(
    (info) => {
      router.push(`/map?id=${info.fridgeInfo.fridgeId}`);
      setCenterLoc({
        lat: info.fridgeInfo.lat,
        lng: info.fridgeInfo.lng,
      });
    },
    [setCenterLoc]
  );

  const onClickNav = (flag) => {
    setIsFavorite(flag);
  };

  useEffect(() => {
    setId(router.query.id);
  }, [setId, router.query.id]);

  return (
    <ListWrapper>
      <InnerNav>
        <div
          className={isFavorite ? '' : 'activate'}
          onClick={() => onClickNav(false)}
        >
          Map
        </div>
        <div> | </div>
        <div
          className={isFavorite ? 'activate' : ''}
          onClick={() => onClickNav(true)}
        >
          My Fridge <IoStarSharp />
        </div>
      </InnerNav>
      <SearchArea placeholder="Search" />
      <VisibleList>
        {visibleList?.map((l) => (
          <ListItem
            id={l.fridgeInfo.fridgeId}
            key={l.fridgeInfo.fridgeId}
            onClick={() => {
              onClickFridgeItem(l);
            }}
            info={l}
            activate={id === l.fridgeInfo.fridgeId.toString()}
          />
        ))}
      </VisibleList>
    </ListWrapper>
  );
};

export default FridgeList;

const ListWrapper = styled.div`
  width: 516px;
  height: calc(100vh - 112px);
  padding-left: 80px;
  background-color: ${({ theme }) => theme.palette.backgound};
  /* background-color: #f8f8f8; */
`;

const InnerNav = styled.div`
  display: flex;
  column-gap: 17px;
  font-size: 24px;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 30px;
  color: ${({ theme }) => theme.palette.secondary.main30};
  .activate {
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`;

const SearchArea = styled.input`
  background-color: ${({ theme }) => theme.palette.secondary.main30};
  color: white;
  margin: 24px 51px 16px 0px;
  padding: 0px 20px;
  font-size: 18px;
  width: 384px;
  height: 55px;
  border: none;
  border-radius: 50px;
  ::placeholder {
    color: white;
    background-image: url('https://cdn.discordapp.com/attachments/909308714161410071/1068343439441281164/icons.png');
    background-size: contain;
    background-position: 1px center;
    background-repeat: no-repeat;
    /* text-align: center; */
    text-indent: 30px;
  }
`;

const VisibleList = styled.div`
  height: calc(100vh - 268px);
  overflow-y: scroll;
`;
