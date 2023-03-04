import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const MsgData = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'dots_custom',
  };

  return (
    <Wrapper>
      <Title>Hearty Messages</Title>

      <Slider {...settings}>
        <div>
          <Card>1</Card>
        </div>
        <div>
          <Card>2</Card>
        </div>
        <div>
          <Card>3</Card>
        </div>
        <div>
          <Card>4</Card>
        </div>
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
  width: 310px;
  padding: 50px;
  height: 198.96px;

  background: #f8f8f8;

  border: 1px solid #f1eae0;
  border-radius: 10px;
`;

export default MsgData;
