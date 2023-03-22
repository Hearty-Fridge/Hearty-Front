import styled from 'styled-components';
import Image from 'next/image';

export const IntroP2 = ({ className }) => {
  return (
    <Wrapper className={className}>
      <FlexRowDiv>
        <div>
          <Description>
            Donate and receive food through the
            <span className="play-fair"> Hearty Fridge</span>
          </Description>
          <GnT>
            <Detail>
              <GnTIcon>Give</GnTIcon>
              Look for Hearty Fridge
              <br /> around you Look for Hearty
            </Detail>
            <Detail>
              <GnTIcon>Take</GnTIcon>
              Look for Hearty Fridge
              <br /> around you Look for Hearty
            </Detail>
          </GnT>
        </div>
        <ImageWrapper>
          <Image
            className="img1 scaleUp duration10ms"
            src="/image/intro/food1.png"
            width="440"
            height="140"
          />
          <Image
            className="img2 scaleUp delay15ms duration10ms"
            src="/image/intro/food2.png"
            width="440"
            height="140"
          />
          <Image
            className="img3 scaleUp delay30ms duration10ms"
            src="/image/intro/food3.png"
            width="440"
            height="140"
          />
          <Image
            className="img4 scaleUp delay45ms duration10ms"
            src="/image/intro/food4.png"
            width="440"
            height="141"
          />
        </ImageWrapper>
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
  width: 970px;
  height: 324px;
  font-size: 80px;
  color: ${({ theme }) => theme.palette.secondary.main};
  .play-fair {
    font-family: 'Playfair Display';
    font-style: italic;
    color: ${({ theme }) => theme.palette.accent};
  }
`;

const GnT = styled.div`
  display: flex;
  margin-top: -120px;
  margin-left: 150px;
  column-gap: 120px;
`;

const Wrapper = styled.div`
  height: 1080px;
`;

const Detail = styled.div`
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.01em;
  margin-top: 60px;
  color: ${(props) => props.theme.palette.accent};
`;

const GnTIcon = styled.div`
  display: inline-block;
  padding: 0px 12px 0px 12px;
  margin-right: 25px;
  font-size: 12px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.palette.accent};
  color: white;
`;

const ImageWrapper = styled.div`
  width: 600px;
  height: 575px;
  margin-top: 260px;
  margin-left: 20px;
  img {
    float: right;
  }
  position: relative;
  right: 0;
`;
