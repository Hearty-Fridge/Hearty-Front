import Layout from '@components/Layout';
import styled from 'styled-components';
import { BiCurrentLocation } from 'react-icons/bi';

const Home = () => {
  return (
    <Full>
      <Layout>
        <Title>
          Let’s <Bold>donate</Bold> <br /> with <Bold>hearty Fridge!</Bold>
        </Title>
      </Layout>
      <Ellipse />
      <Flex>
        <Box>
          <BoxFlex>
            <What>What?</What>
            <BiCurrentLocation
              style={{
                width: '24px',
                height: '24px',
                color: '#FAF4EC',
                marginTop: '5px',
              }}
            />
          </BoxFlex>
          <BoxText>
            We look forward to a world <br />
            where everyone can protect <br />
            the environment
          </BoxText>
        </Box>
        <FoodList>
          <FoodNum>(1)</FoodNum>
          <FoodImg1></FoodImg1>
        </FoodList>
        <FoodList>
          <FoodNum>(2)</FoodNum>
          <FoodImg2></FoodImg2>
        </FoodList>
        <FoodList>
          <FoodNum>(3)</FoodNum>
          <FoodImg3></FoodImg3>
        </FoodList>
        <FoodList>
          <FoodNum>(4)</FoodNum>
          <FoodImg4></FoodImg4>
        </FoodList>
        <FoodList>
          <FoodNum>(5)</FoodNum>
          <FoodImg5></FoodImg5>
        </FoodList>
      </Flex>
    </Full>
  );
};

const Full = styled.div`
  width: 100vw;
  position: relative;
`;

const Title = styled.div`
  margin: 100px 184px 0px 0px;
  float: right;

  font-family: 'Playfair Display';
  font-style: italic;
  font-weight: 400;
  font-size: 130px;
  line-height: 150px;
  text-align: right;
  color: #ed6335;
  text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
`;
const Bold = styled.span`
  font-weight: 700;
`;

const Ellipse = styled.div`
  float: right;
  margin-right: 143px;
  width: 140px;
  height: 110px;
  background-image: url(/image/home/ellipse.png);
`;

const Flex = styled.div`
  display: flex;
  margin-top: 64px;
`;

const Box = styled.div`
  margin-left: 80px;
  margin-right: 80px;
  width: 361px;
  height: 403px;
  background: #f2916e;
  padding: 24px;

  border: 1px solid #ed6335;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const BoxFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoxText = styled.div`
  font-weight: 400;
  font-size: 36px;
  display: flex;
  align-items: flex-end;
  text-align: right;
  color: #faf4ec;
  letter-spacing: -0.01em;
  margin-top: 100px;
`;

const What = styled.div`
  width: 89.26px;
  height: 35.1px;
  background: #faf4ec;
  border: 1px solid #faf4ec;
  border-radius: 50px;
  font-weight: 500;
  font-size: 18px;
  align-items: center;
  text-align: center;
  padding-top: 5px;

  color: #f2916e;
`;

const FoodList = styled.div`
  margin-left: 20px;
  margin-top: 220px;
`;

const FoodNum = styled.div`
  font-family: 'Playfair Display';
  font-style: italic;
  font-weight: 600;
  font-size: 16px;
  line-height: 48px;
  align-items: flex-end;
  text-align: right;
  letter-spacing: -0.01em;
  color: #ed6335;
`;

const FoodImg1 = styled.div`
  margin-right: 17px;
  width: 131px;
  height: 131px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  background-image: url(/image/home/food1.png);
`;
const FoodImg2 = styled.div`
  margin-right: 17px;
  width: 131px;
  height: 131px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  background-image: url(/image/home/food2.png);
`;
const FoodImg3 = styled.div`
  margin-right: 17px;
  width: 131px;
  height: 131px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  background-image: url(/image/home/food3.png);
`;
const FoodImg4 = styled.div`
  margin-right: 17px;
  width: 131px;
  height: 131px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  background-image: url(/image/home/food4.png);
`;
const FoodImg5 = styled.div`
  margin-right: 17px;
  width: 131px;
  height: 131px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  background-image: url(/image/home/food5.png);
`;

export default Home;
