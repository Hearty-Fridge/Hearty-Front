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

  const settings2 = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 3,
    centerMode: true,
    arrows: false,
    dotsClass: 'dots_custom',
  };

  const settings1 = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 3,
    centerMode: true,
    arrows: false,
    dotsClass: 'dots_custom',
  };

  return (
    <Wrapper>
      <Title>Hearty Messages</Title>
      {list.length == 0 ? (
        <NoneText>
          <First>There is no Hearty Messages.</First>
          <Second>Use Hearty Fridge and leave a message!</Second>
        </NoneText>
      ) : (
        <></>
      )}
      {list.length <= 2 ? (
        list.length == 1 ? (
          <Slider {...settings1}>
            {list.map((item) => (
              <div>
                <Message item={item} />
              </div>
            ))}
          </Slider>
        ) : (
          <Slider {...settings2}>
            {list.map((item) => (
              <div>
                <Message item={item} />
              </div>
            ))}
          </Slider>
        )
      ) : (
        <Slider {...settings}>
          {list.map((item) => (
            <div>
              <Message item={item} />
            </div>
          ))}
        </Slider>
      )}
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
const NoneText = styled.div`
  text-align: center;
  margin-top: 90px;
  color: #594c48;
`;
const First = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
`;
const Second = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
`;
export default MsgData;
