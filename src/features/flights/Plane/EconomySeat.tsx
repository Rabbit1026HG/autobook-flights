import { usePlaneContext } from '@context/PlaneContext';

export const EconomySeat = ({
  start = 0,
  xOffset = 0,
  available = true,
  rowNumber = 0,
  seatNumber = 0,
}) => {
  const { checkSeat, handleSeatSelection } = usePlaneContext();
  const checked = checkSeat([rowNumber, seatNumber]);
  let bgColor = '#F6F6FE';
  if (available) {
    bgColor = 'url(#turquoise-gradient)';
    if (checked) {
      bgColor = 'url(#pink-gradient)';
    }
  }
  return (
    <g
      className={'economy-seat' + (available && !checked ? ' available' : '')}
      transform={`translate(${start + xOffset * 27} 0)`}
      onClick={() => handleSeatSelection([rowNumber, seatNumber])}
    >
      <rect x="1117" y="976" width="22" height="32" rx="4" fill={bgColor} />
      {checked && (
        <path
          id="Vector 10_2"
          d="M1122.73 991.757L1126.49 995.515L1134 988"
          stroke="#F6F6FE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </g>
  );
};
