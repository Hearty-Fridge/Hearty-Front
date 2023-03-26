import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';

const TakerForm = () => {
  return (
    <StyledForm>
      <Container>
        <Section>
          <SectionName>
            <div className="name">
              <Dot>*</Dot> Issuing site
            </div>
            <RadioForm>
              <RadioGroupRoot defaultValue="default" aria-label="View density">
                <Flex css={{ alignItems: 'center' }}>
                  <RadioGroupItem value="default" id="r1">
                    <RadioGroupIndicator />
                  </RadioGroupItem>
                  <Label htmlFor="r1">Government 24(www.gov.kr)</Label>
                </Flex>
                <Flex css={{ alignItems: 'center' }}>
                  <RadioGroupItem value="comfortable" id="r2">
                    <RadioGroupIndicator />
                  </RadioGroupItem>
                  <Label htmlFor="r2">기타</Label>
                </Flex>
              </RadioGroupRoot>
            </RadioForm>
          </SectionName>
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
            <NumberInput>
              <NumInput /> <Dash>-</Dash>
              <NumInput /> <Dash>-</Dash>
              <NumInput /> <Dash>-</Dash>
              <NumInput />
            </NumberInput>
          </SectionName>
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
const RadioForm = styled.form`
  display: flex;
`;

const RadioGroupRoot = styled(RadioGroup.Root)`
  margin-top: 30px;
  margin-left: 36px;
  display: flex;
  gap: 24px;
`;

const RadioGroupItem = styled(RadioGroup.Item)`
  all: unset;
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  box-shadow: 0 0 0 2px #f2916e;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    box-shadow: 0 0 0 2px #f2916e;
  }
`;

const RadioGroupIndicator = styled(RadioGroup.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  &::after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #f2916e;
  }
`;

const Flex = styled.div`
  display: 'flex';
`;

const Label = styled.label`
  color: #594c48;
  font-size: 14px;
  padding-left: 14px;
  font-weight: 400;
  font-size: 18px;
`;

export default TakerForm;
