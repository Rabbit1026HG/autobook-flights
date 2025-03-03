import { EconomySeat } from './EconomySeat';
import { RowNumber } from './RowNumber';

export const EconomyRow = ({ start = 0, yOffset = 0, rowNumber = 0 }) => {
  return (
    <g
      className="economy-row"
      id="seat row / economy"
      transform={`translate(0 ${start + yOffset * 44})`}
      width={200}
      height={40}
    >
      <rect
        width="200"
        height="40"
        transform="translate(1113 972)"
        fill="white"
      />
      <EconomySeat xOffset={0} start={0} rowNumber={rowNumber} seatNumber={1} />
      <EconomySeat xOffset={1} start={0} rowNumber={rowNumber} seatNumber={2} />
      <EconomySeat xOffset={2} start={0} rowNumber={rowNumber} seatNumber={3} />
      <RowNumber number={rowNumber} y={997} />
      <EconomySeat
        xOffset={0}
        start={116}
        rowNumber={rowNumber}
        seatNumber={4}
      />
      <EconomySeat
        xOffset={1}
        start={116}
        rowNumber={rowNumber}
        seatNumber={5}
      />
      <EconomySeat
        xOffset={2}
        start={116}
        rowNumber={rowNumber}
        seatNumber={6}
      />
    </g>
  );
};
