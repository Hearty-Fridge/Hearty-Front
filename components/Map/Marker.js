import { IoLocationSharp } from 'react-icons/io5';

export const Marker = ({ onClick, color }) => (
  // 일단 마커 누르면 홈으로 가도록 해 둔 상태
  <div
    onClick={onClick}
    className="marker"
    style={{ color: `${color}`, fontSize: '32px' }}
  >
    <IoLocationSharp />
  </div>
);
