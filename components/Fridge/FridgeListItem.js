import styled from 'styled-components';

const ListItem = ({ onClick, info }) => {
  return (
    <Wrapper onClick={onClick}>
      <ImgArea
        src={`${process.env.NEXT_PUBLIC_SERVER_NAME}/${info.fridgeImage}`}
      />
      <InfoArea>
        <div className="title">{info.name}</div>
        {Object.keys(info).includes('dist') && (
          <div className="distance">{info.dist}m | </div>
        )}
        <div className="loc">{info.address}</div>
        <div className="status">
          {/* Food Status: {info.foods.length} | Hearty Message: 0 */}
        </div>
      </InfoArea>
      <Prefer>★</Prefer>
    </Wrapper>
  );
};

export default ListItem;

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  padding-left: 34px;
  padding: 20px;
  margin-bottom: 16px;
  width: 405px;
  height: 120px;
  background-color: ${({ theme }) => theme.palette.background};
  border-radius: 10px;
`;

const ImgArea = styled.img`
  /* padding: 1%; */
  width: 78px;
  height: 78px;
  border-radius: 10px;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
  width: 80%;
  .title {
    font-size: 20px;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
  .loc {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
  .status {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.gray};
  }
`;

const Prefer = styled.div`
  color: ${({ theme }) => theme.palette.primary};
`;
