import styled from 'styled-components';

export const IntroP1 = ({ className }) => {
  return (
    <Wrapper className={className}>
      <BackImg1 />
      <Title>
        Let’s donate <br /> with hearty fridge!
      </Title>
      {/* <BackImg1 /> */}
      <SubTitle>
        <How>How?</How>
        The expression is a simple sentence of <br />
        promoting a healthy life and the welfare of all <br />
        generations, e and the welfare of.
      </SubTitle>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 1023px;
`;
const Title = styled.div`
  font-family: 'Playfair Display';
  font-style: italic;
  font-size: 80px;
  font-weight: 900;

  line-height: 80px;
  text-align: 'center';
  color: ${({ theme }) => theme.palette.accent};
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-right: 61px;
`;

const SubTitle = styled.div`
  display: inline-block;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;

  letter-spacing: -0.01em;
  margin-top: 46px;
  z-index: 1;

  color: ${({ theme }) => theme.palette.secondary.main};
`;

const How = styled.div`
  display: inline-block;
  padding: 0px 11px 0px 11px;
  margin-right: 19px;
  font-weight: 300;
  font-size: 16px;
  border-radius: 50px;

  color: ${({ theme }) => theme.palette.accent};
  /* border: 1px soild ${({ theme }) => theme.palette.accent}; */
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.palette.accent};
`;

const BackImg1 = styled.div`
  /* position: absolute; */
  position: relative;
  padding-left: 132px;
  float: right;
  width: 425px;
  height: 334px;
  background-color: white;
  z-index: -1;
  bottom: 0;
  background-image: url(/image/mainP1_sample.png);
  filter: blur(5px);
`;
