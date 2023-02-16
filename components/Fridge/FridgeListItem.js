import styled from 'styled-components';
import { useRouter } from 'next/router';

const ListItem = ({ onClick, info, activate }) => {
  return (
    <Wrapper className={activate ? 'activate' : ''} onClick={onClick}>
      <ImgArea
        src={`${process.env.NEXT_PUBLIC_SERVER_NAME}/${info.fridgeImage}`}
        alt="fridge-image"
      />
      <InfoArea>
        <div className={`title ${activate ? 'activate' : ''}`}>{info.name}</div>
        <div style={{ display: 'flex', flexFlow: 'wrap' }}>
          {Object.keys(info).includes('dist') && (
            <div
              className="distance"
              style={{ width: 'fit-content', minWidth: '60px' }}
            >
              {info.dist}m |{' '}
            </div>
          )}
          <div className="loc">{info.address}</div>
        </div>
        <div className="status">
          Food Status: {info.numFoods} | Hearty Message: {info.numMessages}
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
  margin-top: 2px;
  margin-left: 2px;
  width: 401px;
  height: 116px;
  background-color: ${({ theme }) => theme.palette.beigeWhite};
  /* background-color: #ffffff; */
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 25%);
  &.activate {
    background-color: white;
  }
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
    font-weight: 700;
    color: ${({ theme }) => theme.palette.secondary.main};
    &.activate {
      color: ${({ theme }) => theme.palette.primary};
    }
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
