import styled from 'styled-components';

export const Wrapper = styled.div`
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

export const ImgArea = styled.img`
  /* padding: 1%; */
  width: 90px;
  height: 90px;
  border-radius: 10px;
`;

export const InfoArea = styled.div`
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

export const Prefer = styled.div`
  color: ${(props) => props.theme.palette.primary};
`;
