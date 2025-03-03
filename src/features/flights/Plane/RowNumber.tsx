export const RowNumber = ({ x = 1209, y = 0, number = 0 }) => {
  return (
    <g id="row-number">
      <text
        href="1"
        x={number > 9 ? x - 5 : x}
        fontSize="15"
        y={y}
        fill="#7C8DB0"
      >
        {number}
      </text>
    </g>
  );
};
