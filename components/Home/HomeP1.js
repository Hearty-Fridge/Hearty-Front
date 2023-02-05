import styled from 'styled-components';

export const HomeP1 = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Title>
        Let’s donate <br /> with hearty fridge!
      </Title>
      <Flex>
        <SubTitle>
          <How>How?</How>
          The expression is a simple sentence of <br />
          promoting a healthy life and the welfare of all <br />
          generations, e and the welfare of.
        </SubTitle>
        <BackImg />
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 99px;
  /* height: 943px; */
`;
const Title = styled.div`
  font-family: 'Playfair Display';
  font-style: italic;
  font-size: 96px;
  font-weight: 900;

  line-height: 110px;
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
  font-size: 30px;
  line-height: 36px;

  letter-spacing: -0.01em;
  margin-top: 60px;
  z-index: 1;

  color: ${({ theme }) => theme.palette.secondary.main};
`;

const How = styled.div`
  display: inline-block;
  padding: 0px 12px 0px 12px;
  margin-right: 42px;
  font-weight: 300;
  font-size: 18px;
  border-radius: 50px;

  color: ${({ theme }) => theme.palette.accent};
  /* border: 1px soild ${({ theme }) => theme.palette.accent}; */
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.palette.accent};
`;

const BackImg = styled.div`
  /* position: absolute; */
  position: relative;
  width: 1101px;
  height: 648px;
  background-color: white;
  z-index: -1;
  bottom: 0;
  background-image: url(/image/mainP1_sample.png);
  filter: blur(5px);
`;
