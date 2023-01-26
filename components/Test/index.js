import { BigDiv } from './styles';

const TestComponent = () => {
  return (
    <BigDiv>
      Hearty Fridge Component TEST
      <div
        style={{
          fontFamily: 'Playfair Display',
          fontStyle: 'italic',
          fontWeight: 900,
          color: 'red',
        }}
      >
        Playfair Display
      </div>
    </BigDiv>
  );
};

export default TestComponent;
