import styled from 'styled-components';
import Image from 'next/image';
import gif from 'public/image/intro/intro1.gif';

const Phrases = [
  {
    id: 1,
    content: 'Shared Fridge Near Me around me!',
  },
  {
    id: 2,
    content: 'Select a shared fridge to to check the status of your food!',
  },
  {
    id: 3,
    content:
      'Shared fridges make it easy to giving and receiving through your refrigerator!',
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
                    src="/image/intro/ellipse.png"
                    width="120"
                    height="82"
                    alt="ellipse"
                  />
                  <div className="id">{p.id}.</div>
                </ContentWrapper>
                <Phrase>{p.content}</Phrase>
              </div>
            ))}
          </FlexDiv>
        </div>
        <Image
          src={gif}
          height={900}
          width={800}
          style={{ marginTop: '50px' }}
          alt="gif"
        />
      </FlexRowDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw !important;
  height: 100vh !important;
  background-color: ${({ theme }) => theme.palette.background2};
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const IntroMessage = styled.div`
  margin-top: 301px;
  margin-left: 160px;
  font-size: 80px;
  color: ${({ theme }) => theme.palette.beige2};
  .play-fair {
    color: ${({ theme }) => theme.palette.accent};
    font-family: 'Playfair Display';
    font-style: italic;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  padding-top: 80px;
  margin-left: 100px;
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
