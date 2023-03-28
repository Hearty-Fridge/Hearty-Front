import styled from 'styled-components';
import Image from 'next/image';
import gif from 'public/image/intro/intro3.gif';

export const IntroP3 = ({ className }) => {
  return (
    <Wrapper className={className}>
      <FlexRowDiv>
        <Description>
          Leave a <br />
          <span className="play-fair">Hearty Fridge</span>
          <Flex>
            <SubTitle>
              <How>How?</How>
              Make someone's day with a warm message from the Hearty-fridge.
            </SubTitle>
          </Flex>
        </Description>
        <MessageWrapper>
          <Image
            src={gif}
            height={800}
            width={800}
            style={{ marginLeft: '-50px' }}
          />
        </MessageWrapper>
      </FlexRowDiv>
    </Wrapper>
  );
};
const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 1080px;
  min-width: 1920px;
`;

const Description = styled.div`
  margin-top: 380px;
  margin-left: 150px;
  width: 810px;
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
  margin-right: 42px;
  font-weight: 300;
  font-size: 12px;
  border-radius: 50px;

  color: ${(props) => props.theme.palette.accent};
  border-style: solid;
  border-width: 1px;
  border-color: ${({ theme }) => theme.palette.accent};
`;

const MessageWrapper = styled.div`
  margin-top: 150px;
  width: 776px;
  height: 545px;
  .message1 {
    margin-left: 130px;
  }
  .message2 {
    margin-left: 240px;
  }
`;
