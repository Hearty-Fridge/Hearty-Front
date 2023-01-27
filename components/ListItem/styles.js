import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  padding: 5%;
  margin-bottom: 3%;
  width: 95%;
  background-color: ${(props) => props.theme.palette.background};
  border-radius: 10px;
`;

export const ImgArea = styled.img`
  /* padding: 1%; */
  width: 70px;
  height: 70px;
  border-radius: 10px;
`;

export const InfoArea = styled.div`
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

export const Prefer = styled.div`
  color: ${(props) => props.theme.palette.primary};
`;
