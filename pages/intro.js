import Layout from '@components/Layout';
import { IntroP1, IntroP2, IntroP3, IntroP4 } from '@components/Intro';
import ReactFullpage from '@fullpage/react-fullpage';
import styled from 'styled-components';
import useUrlHash from '@hooks/useUrlHash';

const ANCHORS = ['P1', 'P2', 'P3', 'P4'];

const Intro = () => {
  const { hash } = useUrlHash('P1');

  return (
    <>
      <Layout>
        <ReactFullpage
          anchors={ANCHORS}
          render={() => {
            return (
              <ReactFullpage.Wrapper>
                <IntroP1 className="section" />
                <IntroP2 className="section" />
                <IntroP3 className="section" />
                <IntroP4 className="section" />
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </Layout>
      <IndicatorWrapper>
        {ANCHORS.map((dot) => (
          <Indicator key={dot} href={`#${dot}`} active={dot === hash} />
        ))}
      </IndicatorWrapper>
    </>
  );
};

export default Intro;

const IndicatorWrapper = styled.div`
  position: fixed;
  top: 50%;
  right: 80px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  z-index: 100;
`;

const Indicator = styled.a`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  transition: background-color 0.2s ease-out;
  background-color: ${({ theme, active }) =>
    active ? theme.palette.secondary.main : '#ffffff'};
`;
