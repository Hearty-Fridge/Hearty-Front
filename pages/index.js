import Layout from '@components/Layout';
import HomeP1 from '@components/Home/HomeP1';
import HomeP2 from '@components/Home/HomeP2';
import HomeP3 from '@components/Home/HomeP3';
import HomeP4 from '@components/Home/HomeP4';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    dotsClass: 'dots_custom',
  };

  return (
    <Layout>
      <Slider {...settings}>
        <div>
          <HomeP1 />
        </div>
        <div>
          <HomeP2 />
        </div>
        <div>
          <HomeP3 />
        </div>
        <div>
          <HomeP4 />
        </div>
      </Slider>
    </Layout>
  );
};

export default Home;
