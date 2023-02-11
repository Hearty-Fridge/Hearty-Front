import useInput from '@hooks/useInput';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { postFoods } from 'api/Food/useFoods';

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

  /*
{
  "name": "string",
  "amount": "string",
  "category": "string",
  "message": "string",
  "fridgeId": 0,
  // giverId는 어캄??
  "giverId": 0
}
*/

  const onHandleSubmit = (e) => {
    // console.log('###################', e);
    // console.log(selectedImage);
    // console.log(category);
    // console.log(e);
    const data = { ...e, fridgeId: id, category: category[0], giverId: 0 };
    console.log(data);
    const res = postFoods(data);
    console.log(res);
  };

  // category
  return (
    <form>
      <label>음식 이름 : </label>
      <input
        value={foodName}
        onChange={foodNameHandler}
        placeholder="Food Name"
        {...register('name')}
      />
      <br />
      <label>음식 양 : </label>
      <input
        value={foodAmount}
        onChange={foodAmountHandler}
        placeholder="Food Amount"
        {...register('amount')}
      />
      {/* 캘린더? */}
      {/* 체크 박스 */}
      <CategoryList>
        {CATEGORY.map((c) => {
          return (
            <label>
              <input
                type="checkbox"
                onChange={checkBoxOnChange}
                name={c}
                value={c}
              />
              {c}
            </label>
          );
        })}
      </CategoryList>
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
      {/* 쪽지 남기기 */}
      <input
        value={heartyMessage}
        onChange={heartyMessageHandler}
        placeholder="Hearty Message"
        {...register('message')}
      />
      <button onClick={handleSubmit(onHandleSubmit)}>Submit</button>
    </form>
  );
}

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
`;
