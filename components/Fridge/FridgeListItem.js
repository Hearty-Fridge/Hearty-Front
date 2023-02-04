import styled from 'styled-components';

const ListItem = ({ onClick, info }) => {
  return (
    <Wrapper onClick={onClick}>
      <ImgArea
        src={`${process.env.NEXT_PUBLIC_SERVER_NAME}/${info.fridgeImage}`}
      />
      <InfoArea>
        <div className="title">{info.name}</div>
        <div className="loc">{info.address}</div>
        <div className="status">
          {/* Food Status: {info.foods.length} | Hearty Message: 0 */}
        </div>
        {Object.keys(info).includes('dist') && <div>{info.dist}m</div>}
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
  padding: 30px 30px;
  margin-bottom: 3%;
  width: 490px;
  height: 150px;
  background-color: ${(props) => props.theme.palette.background};
  border-radius: 10px;
`;

const ImgArea = styled.img`
  /* padding: 1%; */
  width: 90px;
  height: 90px;
  border-radius: 10px;
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 2%;
  width: 80%;
  .title {
    font-size: 24px;
    color: ${(props) => props.theme.palette.secondary.main};
  }
  .loc {
    font-size: 18px;
    color: ${(props) => props.theme.palette.secondary.main};
  }
  .status {
    font-size: 16px;
    color: ${(props) => props.theme.palette.gray};
  }
`;

const Prefer = styled.div`
  color: ${(props) => props.theme.palette.primary};
`;
