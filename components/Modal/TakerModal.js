import styled from 'styled-components';
import Modal from './Modal';
import { IoCloseSharp } from 'react-icons/io5';
import { axiosInstance } from 'api';
import { useState } from 'react';

const TakerModal = ({ show, onCloseModal }) => {
  const [name, setName] = useState('');
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [num3, setNum3] = useState();
  const [num4, setNum4] = useState();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleNum1Change = (e) => {
    const input = e.target.value;
    const numInput = parseInt(input, 10);
    setNum1(numInput);
  };
  const handleNum2Change = (e) => {
    const input = e.target.value;
    const numInput = parseInt(input, 10);
    setNum2(numInput);
  };
  const handleNum3Change = (e) => {
    const input = e.target.value;
    const numInput = parseInt(input, 10);
    setNum3(numInput);
  };
  const handleNum4Change = (e) => {
    const input = e.target.value;
    const numInput = parseInt(input, 10);
    setNum4(numInput);
  };

  const handleCancel = () => {
    onCloseModal();
  };

  const submitForm = async () => {
    try {
      const response = await axiosInstance.put(`/member/authTaker`, {
        name: name,
        issueNum: 0,
        serialNum1: num1,
        serialNum2: num2,
        serialNum3: num3,
        serialNum4: num4,
      });
      alert('Complete!');
      onCloseModal();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <Container>
        <Top>
          <Title>Recipient authentication</Title>
          <Exit onClick={onCloseModal}>
            <IoCloseSharp
              style={{
                width: '41px',
                height: '41px',
                color: '#594C48',
                cursor: 'pointer',
              }}
            />
          </Exit>
        </Top>
        <Info>
          Authenticate your Supplemental Security Income recipient and try
          Hearty Fridge.
        </Info>
        <StyledForm>
          <Container2>
            <Section0>
              <SectionName>
                <div className="name">Issuing site</div>
              </SectionName>
              <Flex>
                <BigDot />
                <Label htmlFor="r1">Government 24(www.gov.kr)</Label>
              </Flex>
            </Section0>
            <Bar />
            <Section>
              <SectionName>
                <div className="name">
                  <Dot>*</Dot> name
                </div>
              </SectionName>
              <TextInput
                placeholder=""
                type="text"
                value={name}
                onChange={handleNameChange}
              />
            </Section>
            <Bar />
            <Section2>
              <SectionName>
                <div className="name">
                  <Dot>*</Dot>Document Verification Number
                </div>
              </SectionName>
              <NumberInput>
                <NumInput
                  type="number"
                  value={num1}
                  onChange={handleNum1Change}
                />{' '}
                <Dash>-</Dash>
                <NumInput
                  type="number"
                  value={num2}
                  onChange={handleNum2Change}
                />{' '}
                <Dash>-</Dash>
                <NumInput
                  type="number"
                  value={num3}
                  onChange={handleNum3Change}
                />{' '}
                <Dash>-</Dash>
                <NumInput
                  type="number"
                  value={num4}
                  onChange={handleNum4Change}
                />
              </NumberInput>
            </Section2>
          </Container2>
        </StyledForm>
        <Buttons>
          <BtnCancel onClick={handleCancel}>Cancel</BtnCancel>
          <BtnSubmit onClick={submitForm}>Submit</BtnSubmit>
        </Buttons>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 898px;
  min-height: 706px;
  background-color: white;
  padding: 48px 48px 0px 59px;
  border-radius: 10px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary};
`;

const Exit = styled.div`
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  margin-top: 10px;
  color: rgba(89, 76, 72, 0.7);
  margin-bottom: 48px;
`;

const StyledForm = styled.form`
  width: 759px;
`;

const Container2 = styled.div`
  width: 759px;
  margin-top: 25px;
`;

const Section0 = styled.div`
  min-height: 100px;
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
    border: 1px solid #f1eae0;
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
    border: 1px solid #f1eae0;
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

const Buttons = styled.div`
  float: right;
  display: flex;
  width: 194px;
  column-gap: 23px;
`;
const BtnCancel = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  text-align: center;
  color: white;

  font-size: 16px;

  background: #d9d9d9;
  border: 1px solid #d9d9d9;
  border-radius: 100px;
`;
const BtnSubmit = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  text-align: center;
  color: white;
  font-size: 16px;
  background: #ed6335;
  border-radius: 100px;
  border: 1px solid #ed6335;
`;

export default TakerModal;
