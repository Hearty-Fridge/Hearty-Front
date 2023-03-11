import styled from 'styled-components';

export const HomeP2 = ({ className }) => {
  return (
    <Wrapper className={className}>
      <Title>P2</Title>
      <Flex>
        <SubTitle>
          <How>How?</How>
          The expression is a simple sentence of <br />
          promoting a healthy life and the welfare of all <br />
          generations, e and the welfare of.
        </SubTitle>
      </Flex>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 1023px;
`;
const Title = styled.div`
  font-family: 'Playfair Display';
  font-style: italic;
  font-size: 96px;
  font-weight: 900;

  line-height: 110px;
  text-align: 'center';
  color: ${(props) => props.theme.palette.accent};
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
`;

const SubTitle = styled.div`
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;

  letter-spacing: -0.01em;
  margin-top: 60px;

  color: ${(props) => props.theme.palette.secondary.main};
`;

const How = styled.div`
  display: inline-block;
  padding: 0px 12px 0px 12px;
  margin-right: 42px;
  font-weight: 300;
  font-size: 18px;
  border-radius: 50px;

  color: ${(props) => props.theme.palette.accent};
  /* border: 1px soild ${({ theme }) => theme.palette.accent}; */
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.palette.accent};
`;
