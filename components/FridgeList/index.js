import ListItem from '@components/ListItem';
import { ListWrapper, SearchArea } from './styles';
import { useCallback } from 'react';

// LocList: 동사무소 위치 정보, setLoc => google map center location setter
const FridgeList = ({ locList, setLoc }) => {
  return (
    <ListWrapper>
      <SearchArea placeholder="Search" />
      {locList.map((l) => (
        <ListItem key={l.id} setLoc={setLoc} info={l} />
      ))}
    </ListWrapper>
  );
};

export default FridgeList;
