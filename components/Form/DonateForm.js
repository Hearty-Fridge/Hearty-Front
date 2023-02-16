import useInput from '@hooks/useInput';
import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import useFoodsMutation, { postFoods } from 'api/Food/useFoods';
import moment from 'moment';
import Calendar from '@components/Calendar/Calendar';
import { getFridgesById } from 'api/Fridges/useFridges';
import { IoCamera } from 'react-icons/io5';

// import './calendar.module.css';
import 'react-datepicker/dist/react-datepicker.css';
// import './calendar.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const FORM_SECTIONS = [
  {
    name: '음식명',
    placeholder: '음식명을 입력해주세요.',
    isRequired: true,
    isInput: true,
  },
  {
    name: '권장 섭취 기간',
    placeholder: moment().format('LL'),
    isRequired: true,
    isInput: true,
  },
  {
    name: '음식량',
    placeholder: '음식량을 입력해주세요.',
    isRequired: true,
    isInput: true,
  },
  {
    name: '음식 종류',
    placeholder: '음식 종류를 입력해주세요.',
    isRequired: true,
    isInput: true,
  },
  {
    name: '음식사진',
    placeholder: '음식량을 입력해주세요.',
    isRequired: true,
    isInput: true,
  },
  {
    name: '음식량',
    placeholder: '음식량을 입력해주세요.',
    isRequired: true,
    isInput: true,
  },
];

const CATEGORY = [
  'Rice/Nooddle',
  'Soup',
  'Side Dish',
  'Snack Bar',
  'Fruit',
  'Vegetables/Salad',
  'Meat/Egg/Fish',
  'Drink/Coffee',
  'Snack/Chocolate/Serial',
  'Bread/Jam',
  'Milk/Yogurt',
  'Oil/Sauce',
  'Ham',
  'Etc',
];

export default function DonateForm({ id, setShow }) {
  const { refetch } = getFridgesById(id);
  const { register, handleSubmit } = useForm();
  const [foodName, foodNameHandler] = useInput();
  const [foodAmount, foodAmountHandler] = useInput();
  const [heartyMessage, heartyMessageHandler] = useInput();
  const [selectedImage, setSelectedImage] = useState();
  const [category, setCategory] = useState();
  // const [show, setShow] = useState(false);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const { mutate } = useFoodsMutation();

  const checkBoxOnChange = useCallback(
    (e) => {
      const curCategory = e.target.value;
      setCategory(curCategory);
    },
    [category, setCategory]
  );

  const selectedImageChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
      }
    },
    [setSelectedImage]
  );

  const onHandleSubmit = async (e) => {
    console.log(e);
    const data = {
      ...e,
      expiration: expirationDate,
      fridgeId: id,
      category: category,
      giverId: 1,
    };
    mutate(data);
    setShow(false);
    refetch();
  };

  // category
  return (
    <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
      <Container>
        <Section>
          <div className="name">음식명</div>
          <input
            value={foodName}
            onChange={foodNameHandler}
            placeholder="Food Name"
            {...register('name')}
          />
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <div className="name">권장 섭취 기간</div>
          <Calendar
            expirationDate={expirationDate}
            setExpirationDate={setExpirationDate}
          />
          {/* <input value={date} onClick={handleClick} /> */}
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <div className="name">음식량</div>
          <input
            value={foodAmount}
            onChange={foodAmountHandler}
            placeholder="Food Amount"
            {...register('amount')}
          />
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <div className="name">음식 종류</div>
          <CategoryWrapper>
            {CATEGORY.map((c) => {
              return (
                <label key={c} style={{ width: '33%' }}>
                  <Radio
                    type="radio"
                    onChange={checkBoxOnChange}
                    name="category"
                    value={c}
                  />
                  <span>{c}</span>
                </label>
              );
            })}
          </CategoryWrapper>
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <div className="name">음식 사진</div>
          <Info>사진을 선택하지 않으면, 기본 이미지가 선택됩니다.</Info>
          <label>
            <input
              accept="image/*"
              type="file"
              onChange={selectedImageChange}
              style={{ display: 'none' }}
            />
            <InputImage>
              <IoCamera />
            </InputImage>
          </label>
          {selectedImage && (
            <>
              <div>
                <img src={URL.createObjectURL(selectedImage)} alt="Thumb" />
              </div>
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </>
          )}
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <div className="name">쪽지 남기기</div>
          <Info>잘 먹으라고 인사하세요~!~!</Info>
          <input
            value={heartyMessage}
            onChange={heartyMessageHandler}
            placeholder="Hearty Message"
            {...register('message')}
          />
        </Section>
      </Container>
      <BtnWrapper>
        <button type="button" className="cancel">
          Cancel
        </button>
        <button type="submit" className="submit">
          Submit
        </button>
      </BtnWrapper>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  width: 745px;
  height: 670px;
`;

const Container = styled.div`
  width: 745px;
  height: 606px;
  overflow-y: scroll;
  margin-top: 25px;
  margin-left: 40px;
`;

const Section = styled.div`
  width: 690px;
  min-height: 151px;
  & > .name {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
  div > div > input,
  & > input {
    margin-top: 24px;
    margin-left: 2px;
    width: 688px;
    height: 61px;
    padding: 20px;
    font-size: 18px;
    color: ${({ theme }) => theme.palette.secondary.main};
    background: none;
    background-color: ${({ theme }) => theme.palette.background};
    border: none;
    border-radius: 10px;
  }
`;

const BtnStyle = css`
  width: 98px;
  height: 40px;
  border-radius: 100px;
  border: none;
`;

const BtnWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  column-gap: 36px;
  font-size: 14px;
  justify-content: end;
  align-items: center;
  margin-top: 24px;
  .cancel {
    ${BtnStyle};
    background-color: ${({ theme }) => theme.palette.gray};
  }
  .submit {
    ${BtnStyle};
    background-color: ${({ theme }) => theme.palette.primary};
  }
`;

const CategoryWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 36px;
  display: flex;
  max-width: 670px;
  height: 169px;
  flex-wrap: wrap;
`;

const Info = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.secondary.main70};
`;

const InputImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-color: ${({ theme }) => theme.palette.secondary.main30};
  border-radius: 10px;
  margin-top: 24px;
  margin-bottom: 36px;
  & > svg {
    width: 48px;
    height: 48px;
    color: white;
  }
`;

const Radio = styled.input`
  margin-right: 8px;
  vertical-align: middle;
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  /* border-radius: 50%; */
  width: 1.25em;
  height: 1.25em;
  :checked {
    border: 0.4em solid tomato;
  }
`;
