import styled from 'styled-components';
import Image from 'next/image';
import gif from 'public/image/intro/intro2.gif';

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
              Use the Hearty Fridge to
              <br /> donate food!
            </Detail>
            <Detail>
              <GnTIcon>Take</GnTIcon>
              Get food donations with
              <br /> Hearty Fridge!
            </Detail>
          </GnT>
        </div>
        <Image
          src={gif}
          height={900}
          width={800}
          style={{ paddingTop: '150px', marginLeft: '-50px' }}
          alt="gif"
        />
      </FlexRowDiv>
    </Wrapper>
  );
};

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 1080px;
`;

const Description = styled.div`
  margin-top: 380px;
  width: 970px;
  height: 324px;
  font-size: 80px;
  color: ${({ theme }) => theme.palette.secondary.main};
  .play-fair {
    z-index: 99999;
    font-family: 'Playfair Display';
    font-style: italic;
    color: ${({ theme }) => theme.palette.accent};
  }
`;

const GnT = styled.div`
  display: flex;
  margin-top: -120px;
  column-gap: 120px;
`;

const Wrapper = styled.div`
  height: 1080px;
  width: 100vw;
  margin-right: 90px;
  margin-left: 90px;
`;

const Detail = styled.div`
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.01em;
  margin-top: 60px;
  color: ${(props) => props.theme.palette.accent};
  z-index: 999;
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
