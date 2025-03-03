import { BusinessSeat } from './BusinessSeat';
import { RowNumber } from './RowNumber';

export const BusinessRow: React.FC<{
  yOffset: number;
  rowNumber: number;
}> = ({ yOffset = 0, rowNumber = 0 }) => {
  return (
    <g id="seat row / business" transform={`translate(0 ${yOffset * 60})`}>
      <rect
        width="200"
        height="48"
        transform="translate(1113 626)"
        fill="white"
      />
      <BusinessSeat xOffset={0} rowNumber={rowNumber} seatNumber={1} />
      <BusinessSeat xOffset={1} rowNumber={rowNumber} seatNumber={2} />
      <RowNumber y={655} number={rowNumber} />
      <BusinessSeat xOffset={3} rowNumber={rowNumber} seatNumber={3} />
      <BusinessSeat xOffset={4} rowNumber={rowNumber} seatNumber={4} />
    </g>
  );
};
