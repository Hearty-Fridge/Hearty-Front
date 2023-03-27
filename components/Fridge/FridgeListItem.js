import styled from 'styled-components';
import { IoStarSharp, IoStarOutline } from 'react-icons/io5';
import { useBookmarkMutation } from 'api/Fridges/useFridges';

const ListItem = ({ id, onClick, info, activate }) => {
  const token = localStorage.getItem('accessToken');
  const { mutate } = useBookmarkMutation(id, 1);

  const onClickBookmark = () => {
    mutate({
      fridgeId: id,
      state: info.isBookmark,
      token: token,
    });
  };

  return (
    <Wrapper className={activate ? 'activate' : ''} onClick={onClick}>
      <ImgArea
        src={`https://storage.googleapis.com/slowy_storage123/latrach-med-jamil-Eb6hMEhGlKY-unsplash.jpg`}
        alt="fridge-image"
      />
      <InfoArea>
        <div className={`title ${activate ? 'activate' : ''}`}>
          {info.fridgeInfo.fridgeName}
        </div>
        <div className="address" style={{ display: 'flex', flexFlow: 'wrap' }}>
          {Object.keys(info).includes('dist') && info.dist ? (
            <div style={{ width: 'fit-content', minWidth: '60px' }}>
              <span className="distance">
                {info.dist >= 1000
                  ? `${(info.dist / 1000).toFixed(2)}km`
                  : `${info.dist}m`}{' '}
              </span>
              <span className="seperator">|</span>{' '}
              <span classname="loc">{info.fridgeInfo.fridgeAddress}</span>
            </div>
          ) : (
            <div className="loc">{info.fridgeInfo.fridgeAddress}</div>
          )}
        </div>
        <div className="status">
          Food Status: {info.numFoods} | Hearty Message: {info.numMessages}
        </div>
      </InfoArea>
      <Prefer onClick={onClickBookmark}>
        {info.isBookmark ? <IoStarSharp /> : <IoStarOutline />}
      </Prefer>
    </Wrapper>
  );
};

export default ListItem;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  padding: 20px;
  margin-bottom: 16px;
  width: 399px;
  max-height: 214px;
  background-color: ${({ theme }) => theme.palette.beigeWhite};
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 25%);
  &.activate {
    background-color: white;
  }
`;

const ImgArea = styled.img`
  width: 78px;
  height: 78px;
  border-radius: 10px;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
  width: 261px;
  max-height: 174px;
  color: ${({ theme }) => theme.palette.secondary.main};
  .address {
    margin-top: 6px;
    max-height: 72px;
  }
  .title {
    max-height: 72px;
    font-size: 20px;
    font-weight: 700;
    &.activate {
      color: ${({ theme }) => theme.palette.primary};
    }
  }
  .status {
    margin-top: 6px;
    font-size: 14px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.secondary.main70};
  }
  .distance {
    font-weight: 700;
  }
  .seperator {
    color: ${({ theme }) => theme.palette.secondary.main30};
    font-size: 16px;
    font-weight: 700;
  }
`;

const Prefer = styled.div`
  color: ${({ theme }) => theme.palette.primary};
`;
