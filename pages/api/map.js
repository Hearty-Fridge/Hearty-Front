import data from '../../data2.json';

export default function handler(req, res) {
  console.log(data.data);
  res.status(200).json({ mark: data.data });
}
