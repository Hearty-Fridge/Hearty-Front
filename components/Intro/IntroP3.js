import styled from 'styled-components';
import Image from 'next/image';
import gif from 'public/image/intro/intro3.gif';

export const IntroP3 = ({ className }) => {
  return (
    <Wrapper className={className}>
      <FlexRowDiv>
        <Description>
          Leave a <br />
          <span className="play-fair">Hearty Message</span>
          <Flex>
            <SubTitle>
              <How>How?</How>
              Make someone's day with a warm message from the Hearty-fridge.
            </SubTitle>
          </Flex>
        </Description>
        <Image
          src={gif}
          height={800}
          width={800}
          style={{ marginLeft: '-50px', marginTop: '-50px' }}
        />
      </FlexRowDiv>
    </Wrapper>
  );
};
const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const Description = styled.div`
  margin-top: 180px;
  margin-left: 150px;
  width: 770px;
  height: 350px;
  font-size: 80px;
  color: ${({ theme }) => theme.palette.beige2};
  .play-fair {
    font-family: 'Playfair Display';
    font-style: italic;
    color: ${({ theme }) => theme.palette.accent};
  }
`;

const Wrapper = styled.div`
  background-color: #373537;
  width: 100%;
  height: 100%;
`;

const SubTitle = styled.div`
  width: 445px;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;

  letter-spacing: -0.01em;
  margin-top: 60px;

  color: ${(props) => props.theme.palette.accent};
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
`;

const How = styled.div`
  display: inline-block;
  padding: 0px 12px 0px 12px;
  margin-right: 25px;
  font-weight: 300;
  font-size: 12px;
  border-radius: 10px;

  color: ${(props) => props.theme.palette.accent};
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.palette.accent};
`;
