import { Wrapper, ImgArea, InfoArea, Prefer } from './styles';

const ListItem = ({ setLoc, info }) => {
  return (
    <Wrapper
      onClick={() => {
        setLoc({ lat: info.lat, lng: info.lng });
      }}
    >
      <ImgArea
        src={`${process.env.NEXT_PUBLIC_SERVER_NAME}/${info.fridgeImage}`}
      />
      <InfoArea>
        <div className="title">{info.name}</div>
        <div className="loc">{info.address}</div>
        <div className="status">Food Status: {info.foods.length}</div>
      </InfoArea>
      <Prefer>★</Prefer>
    </Wrapper>
  );
};

export default ListItem;
