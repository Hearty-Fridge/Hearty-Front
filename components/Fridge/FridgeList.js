import ListItem from '@components/Fridge/FridgeListItem';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// LocList: 동사무소 위치 정보, setLoc => google map center location setter
const FridgeList = ({ visibleList, setCenterLoc }) => {
  const router = useRouter();
  const onClickFridgeItem = useCallback(
    (info) => {
      router.push(`/map?id=${info.id}`);
      setCenterLoc({
        lat: info.lat,
        lng: info.lng,
      });
    },
    [setCenterLoc]
  );

  return (
    <ListWrapper>
      <SearchArea placeholder="Search" />
      <VisibleList>
        {visibleList?.map((l) => (
          <ListItem
            key={l.id}
            onClick={() => {
              onClickFridgeItem(l);
            }}
            info={l}
          />
        ))}
      </VisibleList>
    </ListWrapper>
  );
};

export default FridgeList;

const ListWrapper = styled.div`
  width: 591px;
  height: calc(100vh - 144px);
  padding-left: 80px;
  background-color: ${({ theme }) => theme.palette.beige1};
`;

const SearchArea = styled.input`
  background-color: ${({ theme }) => theme.palette.secondary.main30};
  color: white;
  margin: 50px 51px 30px 0px;
  padding: 0px 20px;
  font-size: 18px;
  width: 460px;
  height: 56px;
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
  height: calc(100vh - 273.5px);
  overflow-y: scroll;
`;
