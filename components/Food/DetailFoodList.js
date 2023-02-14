import styled from 'styled-components';
import moment from 'moment';

const dummy = [
  {
    id: 0,
    name: '유기농 계란',
    amount: '1개',
    expiration: '~2023.03.24',
  },
  {
    id: 1,
    name: '핫도그',
    amount: '2개',
    expiration: '~2023.03.24',
  },
  {
    id: 2,
    name: '치킨',
    amount: '1개',
    expiration: '~2023.03.24',
  },
];

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
          <tr key={d.foodId} style={{ height: '34px' }}>
            <td>{d.name}</td>
            <td>{d.amount}</td>
            <td>~{moment(d.expiration).format('YYYY.MM.DD')}</td>
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
