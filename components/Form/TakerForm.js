import styled from 'styled-components';
import React from 'react';

const TakerForm = () => {
  return (
    <StyledForm>
      <Container>
        <Section>
          <SectionName>
            <div className="name">Issuing site</div>
          </SectionName>
          <Flex>
            <BigDot />
            <Label htmlFor="r1">Government 24(www.gov.kr)</Label>
          </Flex>
        </Section>
        <Bar />
        <Section>
          <SectionName>
            <div className="name">
              <Dot>*</Dot> name
            </div>
          </SectionName>
          <TextInput placeholder="" />
        </Section>
        <Bar />
        <Section2>
          <SectionName>
            <div className="name">
              <Dot>*</Dot>Document Verification Number
            </div>
            {/* <div className="error">
              {errors.expirationDate && errors.expirationDate.message}
            </div> */}
          </SectionName>
          <NumberInput>
            <NumInput /> <Dash>-</Dash>
            <NumInput /> <Dash>-</Dash>
            <NumInput /> <Dash>-</Dash>
            <NumInput />
          </NumberInput>
        </Section2>
      </Container>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 759px;
`;

const Container = styled.div`
  width: 759px;
  margin-top: 25px;
`;

const Section = styled.div`
  min-height: 151px;
  div > input,
  & > input {
    margin-top: 24px;
    margin-left: 36px;
    width: 723px;
    height: 60px;
    padding: 20px;
    font-size: 18px;
    color: ${({ theme }) => theme.palette.secondary.main};
    background: none;
    background-color: ${({ theme }) => theme.palette.background};
    border: none;
    border-radius: 10px;
  }
`;

const Section2 = styled.div`
  min-height: 151px;
  div > input,
  & > input {
    margin-top: 24px;
    margin-left: 36px;
    width: 89px;
    height: 48px;
    padding: 20px;
    font-size: 18px;
    color: ${({ theme }) => theme.palette.secondary.main};
    background: none;
    background-color: ${({ theme }) => theme.palette.background};
    border: none;
    border-radius: 10px;
  }
`;

const SectionName = styled.div`
  align-items: center;
  column-gap: 24px;
  .name {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
  .error {
    color: ${({ theme }) => theme.palette.error};
  }
`;
const Dot = styled.span`
  color: ${({ theme }) => theme.palette.primary};
  margin-right: 20px;
`;

const TextInput = styled.input``;

const NumberInput = styled.div`
  display: flex;
`;

const NumInput = styled.input``;

const Dash = styled.div`
  margin: 35px 17px 0px 17px;
`;

const Bar = styled.hr`
  border: 1px solid #f1eae0;
  margin-bottom: 24px;
`;

// radio custom

const Flex = styled.div`
  display: flex;
  margin-left: 36px;
  margin-top: 24px;
`;

const BigDot = styled.div`
  margin-top: 3px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.primary};
`;

const Label = styled.label`
  color: #594c48;
  font-size: 14px;
  padding-left: 14px;
  font-weight: 400;
  font-size: 18px;
`;

export default TakerForm;
