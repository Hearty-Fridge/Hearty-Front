import styled from 'styled-components';
import moment from 'moment';

const MessageList = ({ data }) => {
  console.log(data);
  return (
    <>
      {data.map((d) => (
        <Container>
          <div className="message">{d.message}</div>
          <div className="date">{moment(d.sendTime).format('YYYY.MM.DD')}</div>
        </Container>
      ))}
    </>
  );
};

export default MessageList;

const Container = styled.div`
  max-width: 355px;
  max-height: 95px;
  width: fit-content;

  padding: 12px 20px 11px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.beige2};
  background-color: ${({ theme }) => theme.palette.beige1};
  line-height: 1.5;
  & > .message {
    font-size: 14px;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
  & > .date {
    font-size: 10px;
    vertical-align: middle;
    color: ${({ theme }) => theme.palette.secondary.main70};
  }
`;
