import { axiosInstance } from 'api';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Message from './Message';

const MsgData = () => {
  const { data: sendMsg } = useQuery(
    ['getSendMessages'],
    async () => await axiosInstance.get(`/message/getSendMessages`)
  );
  const { data: receiveMsg } = useQuery(
    ['getReceiveMessages'],
    async () => await axiosInstance.get(`/message/getReceiveMessages`)
  );

  if (!sendMsg || !receiveMsg) {
    return null;
  }

  const receive = receiveMsg.data.data;
  const send = sendMsg.data.data;
  const MSG_LIST = receive.concat(send);
  const list = MSG_LIST.sort((a, b) => {
    const dateA = dayjs(a.time);
    const dateB = dayjs(b.time);
    return dateB - dateA;
  });

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dotsClass: 'dots_custom',
  };

  console.log('LIST', list);
  return (
    <Wrapper>
      <Title>Hearty Messages</Title>
      <Slider {...settings}>
        {list.map((item) => (
          <div>
            <Message item={item} />
          </div>
        ))}
      </Slider>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 32px 30px;
`;

const Title = styled.div`
  padding-bottom: 24px;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;

  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Card = styled.div`
  position: relative;
  width: 310px;
  padding: 26px 30px;
  height: 198.96px;

  background: #f8f8f8;

  border: 1px solid #f1eae0;
  border-radius: 10px;
`;

const TagSend = styled.div`
  margin-right: 28px;
  padding: 4px 10px;
  width: 46px;
  height: 22px;
  font-weight: 500;
  font-size: 12px;

  background: #a6cda5;
  border-radius: 5px;
  color: white;

  text-align: center;
`;
const TagReceive = styled.div`
  margin-right: 28px;
  padding: 4px 10px;
  width: 64px;
  height: 22px;
  font-weight: 500;
  font-size: 12px;

  background: #d6a9a9;
  border-radius: 5px;
  color: white;

  text-align: center;
`;

const Contents = styled.div`
  margin-top: 18px;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;

  color: #594c48;
`;

const Address = styled.div`
  position: absolute;
  bottom: 25px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;

  color: #594c48;
`;

export default MsgData;
