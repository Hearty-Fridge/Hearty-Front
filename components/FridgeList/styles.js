import styled from 'styled-components';

export const ListWrapper = styled.div`
  width: 35%;
  height: calc(100vh - 137px);
  padding-left: 2%;
  overflow-y: scroll;
  /* padding-left: 80px;
  padding-top: 50px; */
  background-color: ${(props) => props.theme.palette.beige1};
`;

export const SearchArea = styled.input`
  background-color: ${(props) => props.theme.palette.secondary.main30};
  color: white;
  margin-top: 5%;
  margin-bottom: 5%;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 18px;
  width: 90%;
  height: 40px;
  border: none;
  border-radius: 50px;
  ::placeholder {
    color: white;
    background-image: url('https://cdn.discordapp.com/attachments/909308714161410071/1068343439441281164/icons.png');
    background-size: contain;
    background-position: 1px center;
    background-repeat: no-repeat;
    /* text-align: center; */
    text-indent: 30px;
  }
`;
