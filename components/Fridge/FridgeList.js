import ListItem from '@components/Fridge/FridgeListItem';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { IoStarSharp } from 'react-icons/io5';
import { getFridgesByKeyword } from 'api/Fridges/useFridges';
import { IoLocationSharp } from 'react-icons/io5';
import { BiSearchAlt2 } from 'react-icons/bi';

const getMatchingData = ({ keyword, fridgeName }) => {
  const idx = fridgeName.indexOf(keyword);
  if (idx === -1) {
    return <>{fridgeName}</>;
  } else {
    return (
      <>
        {fridgeName.substring(0, idx)}
        <span className="matched">
          {fridgeName.substring(idx, idx + keyword.length)}
        </span>
        {fridgeName.substring(idx + keyword.length)}
      </>
    );
  }
};

const FridgeList = ({
  visibleList,
  setCenterLoc,
  isFavorite,
  setIsFavorite,
}) => {
  const router = useRouter();
  const [id, setId] = useState(false);
  const [token, setToken] = useState(null);
  const [matchedList, setMatchedList] = useState([]);
  const [keyword, setKeyword] = useState('');

  const onClickFridgeItem = useCallback(
    (info) => {
      router.push(`/map?id=${info.fridgeInfo.fridgeId}`);
      setCenterLoc({
        lat: info.fridgeInfo.lat,
        lng: info.fridgeInfo.lng,
      });
      setMatchedList([]);
    },
    [setCenterLoc]
  );

  const onChangeSearchList = async (e) => {
    setKeyword(e.target.value);
    if (e.target.value === '') {
      setMatchedList([]);
    } else {
      setMatchedList(
        await getFridgesByKeyword({
          keyword: e.target.value,
          token: token,
        })
      );
    }
  };

  const onClickNav = (flag) => {
    setIsFavorite(flag);
  };

  useEffect(() => {
    setId(router.query.id);
    setToken(localStorage.getItem('accessToken'));
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
        <MyFridge
          className={isFavorite ? 'activate' : ''}
          onClick={() => onClickNav(true)}
        >
          My Fridge <IoStarSharp style={{ marginLeft: '7px' }} />
        </MyFridge>
      </InnerNav>
      <SearchWrapper
        css={matchedList.length >= 1 ? ActivateSearch : InactivateSearch}
      >
        <ColoredSearchIcon />
        <SearchArea onChange={onChangeSearchList} placeholder="Search" />
      </SearchWrapper>
      {matchedList.length >= 1 && (
        <SearchedList>
          <SizedHr />
          {matchedList.map((ls) => (
            <SearchedListItem
              key={ls.fridgeInfo.fridgeId}
              onClick={() => onClickFridgeItem(ls)}
            >
              <div className="name">
                <IoLocationSharp
                  style={{
                    marginLeft: '30px',
                    marginRight: '12px',
                    width: '20px',
                    height: '20px',
                  }}
                />
                {getMatchingData({
                  keyword: keyword,
                  fridgeName: ls.fridgeInfo.fridgeName,
                })}
              </div>
              <div className="addr">{ls.fridgeInfo.fridgeAddress}</div>
            </SearchedListItem>
          ))}
        </SearchedList>
      )}
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

const MyFridge = styled.div`
  display: flex;
  align-items: center;
`;

const ActivateSearch = css`
  border-bottom: none;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  box-shadow: 0px -10px 20px 0px rgba(0, 0, 0, 0.1);
`;

const InactivateSearch = css`
  border-radius: 28px;
`;

const SearchWrapper = styled.div`
  position: relative;
  border: ${({ theme }) => theme.palette.accent} 1px solid;
  display: flex;
  align-items: center;
  margin: 24px 51px 0px 0px;
  width: 402px;
  height: 55px;
`;

const SearchArea = styled.input`
  background-color: white;
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: 700;
  font-size: 18px;
  border: none;
  ::placeholder {
    color: ${({ theme }) => theme.palette.secondary.main30};
    font-weight: 500;
  }
  :focus {
    outline: none;
  }
`;

const ColoredSearchIcon = styled(BiSearchAlt2)`
  color: ${({ theme }) => theme.palette.accent};
  margin-left: 24px;
  margin-right: 10px;
  width: 24px;
  height: 24px;
`;

const VisibleList = styled.div`
  height: calc(100vh - 293px);
  margin-top: 16px;
  overflow-y: scroll;
`;

const SearchedList = styled.div`
  position: absolute;
  max-height: 333px;
  overflow-y: scroll;
  border: ${({ theme }) => theme.palette.accent} 1px solid;
  background-color: white;
  border-top: none;
  width: 402px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const SearchedListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  height: 65px;
  .name {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.palette.secondary.main};
    .matched {
      color: ${({ theme }) => theme.palette.accent};
      font-weight: 700;
    }
  }
  .addr {
    color: ${({ theme }) => theme.palette.secondary.main70};
    margin-left: 62px;
  }
`;

const SizedHr = styled.hr`
  margin-left: 20px;
  width: 359px;
`;
