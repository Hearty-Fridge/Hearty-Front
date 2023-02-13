import useInput from '@hooks/useInput';
import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import { postFoods } from 'api/Food/useFoods';
import moment from 'moment';

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

export default function DonateForm({ id }) {
  const { register, handleSubmit } = useForm();
  const [foodName, foodNameHandler] = useInput();
  const [foodAmount, foodAmountHandler] = useInput();
  const [heartyMessage, heartyMessageHandler] = useInput();
  const [selectedImage, setSelectedImage] = useState();
  const [category, setCategory] = useState([]);

  const checkBoxOnChange = useCallback(
    (e) => {
      const curCategory = e.target.value;
      if (category.find((c) => c === curCategory)) {
        setCategory(category.filter((c) => c !== curCategory));
      } else {
        setCategory([...category, curCategory]);
      }
      console.log(category);
    },
    [category, setCategory]
  );

  const selectedImageChange = useCallback(
    (e) => {
      console.log(e);
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
      }
    },
    [setSelectedImage]
  );

  const onHandleSubmit = (e) => {
    // console.log('###################', e);
    // console.log(selectedImage);
    // console.log(category);
    // console.log(e);
    const data = {
      ...e,
      fridgeId: id,
      category: category[0],
      giverId: 1,
      expiration: new Date(),
    };
    const res = postFoods(data);
  };

  // category
  return (
    <Container>
      <StyledForm>
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
          <div className="name">음식량</div>
          <input
            value={foodAmount}
            onChange={foodAmountHandler}
            placeholder="Food Amount"
            {...register('amount')}
          />
        </Section>
        {/* 캘린더? */}
        {/* 체크 박스 */}
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <div className="name">음식 종류</div>
          <CategoryWrapper>
            {CATEGORY.map((c) => {
              return (
                <div style={{ width: '33%' }}>
                  <input
                    type="checkbox"
                    onChange={checkBoxOnChange}
                    name={c}
                    value={c}
                  />
                  {c}
                </div>
              );
            })}
          </CategoryWrapper>
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <div className="name">음식 사진</div>
          <input
            accept="image/*"
            type="file"
            onChange={selectedImageChange}
            // {...register('image')}
          />
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
          <input
            value={heartyMessage}
            onChange={heartyMessageHandler}
            placeholder="Hearty Message"
            {...register('message')}
          />
        </Section>

        {/* 쪽지 남기기 */}
        {/* <button onClick={handleSubmit(onHandleSubmit)}>Submit</button> */}
      </StyledForm>
      <BtnWrapper>
        <button className="cancel">cancel</button>
        <button className="submit">submit</button>
      </BtnWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 745px;
  height: 670px;
`;

const StyledForm = styled.form`
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
  & > input {
    margin-top: 24px;
    width: 690px;
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