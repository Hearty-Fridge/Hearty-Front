import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Card from './Message';

const MSG_LIST = [
  {
    is: 'R',
    time: '2023.03.12',
    message: '안녕하세요',
    loc: '서울시 노원구 공릉동 123',
  },
  {
    is: 'S',
    time: '2023.03.15',
    message: '안녕하세요2',
    loc: '서울시 노원구 공릉동 123',
  },
  {
    is: 'R',
    time: '2023.03.14',
    message: '안녕하세요3',
    loc: '서울시 노원구 공릉동 123',
  },
  {
    is: 'R',
    time: '2023.03.20',
    message: '안녕하세요4',
    loc: '서울시 노원구 공릉동 123',
  },
  {
    is: 'R',
    time: '2023.03.20',
    message: '안녕하세요4',
    loc: '서울시 노원구 공릉동 123',
  },
];

const MsgData = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dotsClass: 'dots_custom',
  };

  return (
    <Wrapper>
      <Title>Hearty Messages</Title>

      <Slider {...settings}>
        {MSG_LIST.map((item) => (
          <Card key={item} />
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

export default MsgData;
