import data from '../../data2.json';

// TEST
export default function handler(req, res) {
  res.status(200).json({ mark: data.data });
}
