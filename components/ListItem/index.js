import { Wrapper, ImgArea, InfoArea, Prefer } from './styles';

const ListItem = ({ setCenterLoc, info }) => {
  return (
    <Wrapper
      onClick={() => {
        setCenterLoc({ lat: info.lat, lng: info.lng });
      }}
    >
      <ImgArea
        src={`${process.env.NEXT_PUBLIC_SERVER_NAME}/${info.fridgeImage}`}
      />
      <InfoArea>
        <div className="title">{info.name}</div>
        <div className="loc">{info.address}</div>
        <div className="status">
          Food Status: {info.foods.length} | Hearty Message: 0
        </div>
        {/* {Object.keys(info).includes('dist') && <div>{info.dist}</div>} */}
      </InfoArea>
      <Prefer>★</Prefer>
    </Wrapper>
  );
};

export default ListItem;
