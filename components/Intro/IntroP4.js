import styled from 'styled-components';
import Image from 'next/image';

export const IntroP4 = ({ className }) => {
  return (
    <Wrapper className={className}>
      Say Hello to the
      <br />
      <div className="mb-150 play-fair">Hearty Fridge!</div>
      <Image src="/image/intro/go.png" width="180" height="130" alt="go" />
      <div className="mt-30 play-fair underline">start with GOOGLE</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 1080px;
  text-align: center;
  font-size: 80px;
  color: ${({ theme }) => theme.palette.secondary.main};
  .play-fair {
    font-family: 'Playfair Display';
    font-style: italic;
    color: ${({ theme }) => theme.palette.accent};
  }
  .underline {
    text-decoration: underline 2px;
  }
  .mb-150 {
    margin-bottom: 150px;
  }
  .mt-30 {
    margin-top: 30px;
  }
  background-color: ${({ theme }) => theme.palette.beige2};
`;
