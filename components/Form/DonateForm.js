import { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useFoodsMutation } from 'api/Food/useFoods';
import Calendar from '@components/Calendar/Calendar';
import { getFridgesById } from 'api/Fridges/useFridges';
import { IoCamera } from 'react-icons/io5';
import { Controller } from 'react-hook-form';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

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
  const token = localStorage.getItem('accessToken');
  const { refetch } = getFridgesById({ fridgeId: id, token: token });
  const [selectedImage, setSelectedImage] = useState();
  const {
    register,
    handleSubmit,
    formState,
    reset,
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      foodName: '',
      foodAmount: '',
      message: '',
      selectedImage: null,
      category: '',
      expirationDate: new Date(),
    },
  });
  const { errors } = formState;
  const { mutate } = useFoodsMutation({ fridgeId: id });
  // const selectedImageChange = useCallback(
  //   (e) => {
  //     if (e.target.files && e.target.files.length > 0) {
  //       setSelectedImage(e.target.files[0]);
  //     }
  //   },
  //   [setSelectedImage]
  // );

  const onHandleSubmit = async (e) => {
    const formData = new FormData();
    formData.append('name', e.foodName);
    formData.append(
      'expiration',
      moment(e.expirationDate).format('YYYY-MM-DDTHH:mm:ss')
    );
    formData.append('amount', e.foodAmount);
    formData.append('category', e.category);
    formData.append('message', e.message);
    formData.append('fridgeId', id);
    formData.append('giverId', 11);
    if (selectedImage) formData.append('images', selectedImage);
    mutate(formData, token);
    setShow(false);
    refetch();
  };

  // category
  return (
    <StyledForm onSubmit={handleSubmit(onHandleSubmit)}>
      <Container>
        <Section>
          <SectionName>
            <div className="name">음식명</div>
            <div className="error">
              {errors.foodName && errors.foodName.message}
            </div>
          </SectionName>
          <input
            placeholder="Food Name"
            {...register('foodName', {
              required: '음식명을 입력해주세요.',
            })}
          />
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <SectionName>
            <div className="name">권장 섭취 기간</div>
            <div className="error">
              {errors.expirationDate && errors.expirationDate.message}
            </div>
          </SectionName>
          <Controller
            name="expirationDate"
            control={control}
            rules={{
              required: '권장 섭취 기간을 입력해주세요.',
            }}
            render={({ field: { onChange, value } }) => (
              <Calendar
                expirationDate={value}
                setExpirationDate={(value) => {
                  onChange(value);
                }}
              />
            )}
          />
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <SectionName>
            <div className="name">음식량</div>
            <div className="error">
              {errors.foodAmount && errors.foodAmount.message}
            </div>
          </SectionName>
          <input
            placeholder="Food Amount"
            {...register('foodAmount', {
              required: '음식량을 입력해주세요.',
            })}
          />
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <SectionName>
            <div className="name">음식 종류</div>
            <div className="error">
              {errors.category && errors.category.message}
            </div>
          </SectionName>
          <Controller
            name="category"
            control={control}
            rules={{
              required: '음식 종류를 선택해주세요.',
            }}
            render={({ field: { onChange, value } }) => (
              <CategoryWrapper>
                {CATEGORY.map((c) => {
                  return (
                    <label key={c} style={{ width: '33%' }}>
                      <Radio
                        type="radio"
                        onChange={(value) => {
                          onChange(value);
                        }}
                        name="category"
                        value={c}
                      />
                      <span>{c}</span>
                    </label>
                  );
                })}
              </CategoryWrapper>
            )}
          />
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <SectionName>
            <div className="name">음식 사진</div>
            <div className="error">
              {errors.selectedImage && errors.selectedImage.message}
            </div>
          </SectionName>
          <Info>사진을 입력해주세요</Info>
          <label style={{ cursor: 'pointer', display: 'inline-block' }}>
            {/* react hook form controller를 사용해서 해결해보기 */}
            {/* 현재 버그는 필수 항목으로 만들고 싶지만, display: none이 적용되지 않는 것 */}
            <input
              accept="image/*"
              type="file"
              disabled={selectedImage}
              style={{ display: 'none' }}
              {...register('selectedImage', {
                required: '사진을 입력해주세요.',
              })}
              // required
            />
            {getValues('selectedImage') ? (
              <InputImage>
                <img
                  src={URL.createObjectURL(getValues('selectedImage'))}
                  alt="Thumb"
                />
                <RemoveButton
                  type="button"
                  onClick={(e) => {
                    setValue('selectedImage', null);
                    e.preventDefault();
                  }}
                >
                  Remove
                </RemoveButton>
              </InputImage>
            ) : (
              <InputImage>
                <IoCamera />
              </InputImage>
            )}
          </label>
        </Section>
        <hr style={{ marginBottom: '36px', width: '690px' }} />
        <Section>
          <SectionName>
            <div className="name">쪽지 남기기</div>
            <div className="error">
              {errors.message && errors.message.message}
            </div>
          </SectionName>
          <Info>잘 먹으라고 인사하세요~!~!</Info>
          <input
            placeholder="Hearty Message"
            {...register('message', {
              required: '메세지를 입력해주세요.',
            })}
          />
        </Section>
      </Container>
      <BtnWrapper>
        <button type="button" className="cancel" onClick={() => setShow(false)}>
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
  position: relative;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-color: ${({ theme }) => theme.palette.secondary.main30};
  border-radius: 10px;
  margin-top: 24px;
  margin-bottom: 36px;
  & > img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }
  & > svg {
    width: 48px;
    height: 48px;
    color: white;
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
`;

const Radio = styled.input`
  margin-right: 8px;
  vertical-align: middle;
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  width: 1.25em;
  height: 1.25em;
  :checked {
    border: 0.4em solid tomato;
  }
`;

const SectionName = styled.div`
  display: flex;
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
