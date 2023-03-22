import styled from 'styled-components';
import Image from 'next/image';

export const IntroP3 = ({ className }) => {
  return (
    <Wrapper className={className}>
      <FlexRowDiv>
        <Description>
          leave a <br />
          <span className="play-fair">Hearty Fridge</span>
          <Flex>
            <SubTitle>
              <How>How?</How>
              Look for Hearty Fridge around you Look Look for Hearty Fridge
              around you Look Hearty
            </SubTitle>
          </Flex>
        </Description>
        <MessageWrapper>
          <Image
            className="message1 popIn duration10ms"
            src="/image/intro/message1.png"
            width="680"
            height="188"
          />
          <Image
            className="message2 popIn delay15ms duration10ms"
            src="/image/intro/message2.png"
            width="400"
            height="150"
          />
          <Image
            className="message3 popIn delay30ms duration10ms"
            src="/image/intro/message3.png"
            width="690"
            height="188"
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
  background-color: #383838;
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
  margin-top: 300px;
  width: 776px;
  height: 545px;
  .message1 {
    margin-left: 130px;
  }
  .message2 {
    margin-left: 240px;
  }
`;
