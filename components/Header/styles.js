import styled from 'styled-components';

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 137px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.palette.background};
`;

export const Navigation = styled.div`
  display: flex;
  width: 100%;
  font-size: 24px;
  div {
    margin-left: 80px;
  }
  a {
    margin-left: 80px;
  }
`;

export const InfoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  font-size: 18px;
  div {
    margin: 5%;
  }
  .signin {
    color: white;
    width: 107px;
    text-align: center;
    border-radius: 18px;
    padding: 10px;
    background-color: ${(props) => props.theme.palette.accent}
  }
  .signup {
    color: white;
    width: 107px;
    text-align: center;
    border-radius: 18px;
    padding: 10px;
    background-color: ${(props) => props.theme.palette.primary};
  }
`;
