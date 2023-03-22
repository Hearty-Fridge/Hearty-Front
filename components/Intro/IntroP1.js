import styled from 'styled-components';
import Image from 'next/image';

const Phrases = [
  {
    id: 1,
    content: '내 주위의 공유 냉장고를 확인해보세요!',
  },
  {
    id: 2,
    content: '공유 냉장고를 선택하여 음식의 현황을 확인해보세요!',
  },
  {
    id: 3,
    content: '공유 냉장고를 통해 손쉽게 기부와 수급을 완료해보세요!',
  },
];

export const IntroP1 = ({ className }) => {
  return (
    <Wrapper className={className}>
      <FlexRowDiv>
        <div>
          <IntroMessage>
            Look for <span className="play-fair">Hearty Fridge</span> <br />
            around you!
          </IntroMessage>
          <FlexDiv>
            {Phrases.map((p) => (
              <div key={p.id} style={{ display: 'block' }}>
                <ContentWrapper>
                  <Image
                    src="/image/intro1/Ellipse.png"
                    width="120"
                    height="82"
                  />
                  <div className="id">{p.id}.</div>
                </ContentWrapper>
                <Phrase>{p.content}</Phrase>
              </div>
            ))}
          </FlexDiv>
        </div>
        <ImageWrapper>
          <Image
            className="location"
            src="/image/intro/location128.png"
            width="148"
            height="158"
          />
          <Image
            className="img1"
            src="/image/intro/fridge1.png"
            width="440"
            height="182"
          />
          <Image
            className="img2"
            src="/image/intro/fridge2.png"
            width="440"
            height="182"
          />
          <Image
            className="img3"
            src="/image/intro/fridge3.png"
            width="440"
            height="182"
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

const IntroMessage = styled.div`
  padding-top: 321px;
  padding-left: 160px;
  font-size: 80px;
  color: ${({ theme }) => theme.palette.beige2};
  .play-fair {
    color: ${({ theme }) => theme.palette.accent};
    font-family: 'Playfair Display';
    font-style: italic;
  }
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.background2};
`;

const FlexDiv = styled.div`
  display: flex;
  padding-top: 80px;
  padding-left: 100px;
  color: ${({ theme }) => theme.palette.accent};
`;

const Phrase = styled.div`
  font-size: 20px;
  width: 230px;
  margin-left: 50px;
  margin-top: 20px;
`;

const ContentWrapper = styled.div`
  display: block;
  position: relative;
  width: 120px;
  & > img {
    vertical-align: middle;
  }
  & > .id {
    font-family: 'Playfair Display';
    font-style: italic;
    position: absolute;
    font-size: 48px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const ImageWrapper = styled.div`
  width: 680px;
  height: 500px;
  margin-top: 302px;
  margin-left: 130px;
  .img1 {
    margin-left: 200px;
  }
  .img3 {
    margin-left: 250px;
  }
  .location {
    position: absolute;
    right: 225px;
    top: 220px;
  }
`;
