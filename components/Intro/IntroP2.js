import styled from 'styled-components';
import Image from 'next/image';
import gif from 'public/image/intro/intro2_2.gif';

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
          height={800}
          width={620}
          style={{ marginLeft: '-50px' }}
          alt="gif"
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
  margin-top: 260px;
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
  margin-right: 90px;
  margin-left: 90px;
  width: 100%;
  height: 100%;
`;

const Detail = styled.div`
  display: flex;
  align-items: start;
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
