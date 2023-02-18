import styled from 'styled-components';
import moment from 'moment';

const DetailFoodList = ({ data }) => {
  if (!data) return '';
  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: '193px' }}>Name</th>
          <th style={{ width: '75px' }}>Amount</th>
          <th>Expiration</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((d) => (
          <tr key={d.giveId} style={{ height: '34px' }}>
            <td>{d.food.name}</td>
            <td>{d.food.amount}</td>
            <td>{`~ ${moment(d.food.expiration).format('YYYY.MM.DD')}`}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DetailFoodList;

const Table = styled.table`
  max-height: 356px;
  font-size: 14px;
  vertical-align: middle;
  width: 383px;
  th {
    height: 34px;
    background-color: ${({ theme }) => theme.palette.beige1};
    color: ${({ theme }) => theme.palette.secondary.main70};
  }
  td {
    padding-left: 5px;
  }
  /* column-gap: 90px; */
  .name {
    margin-left: 42px;
    min-width: 158px;
  }
  .amount {
    min-width: 80px;
  }
`;
