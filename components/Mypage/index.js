const MyData = ({ datas }) => {
  return (
    <>
      <div>데이터</div>
      {datas && datas.map((data) => <div>{data.name}</div>)}
    </>
  );
};

export default MyData;
