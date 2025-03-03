import { useState } from 'react';
import styles from './PriceGrid.module.scss';
const checkHovered = (i: number, j: number, current: [number, number]) => {
  return (
    (i == current[0] && j <= current[1]) || (i <= current[0] && j == current[1])
  );
};
export const PriceGrid = () => {
  const [hoveredCell, setHoveredCell] = useState<[number, number]>([-1, -1]);
  return (
    <div className={styles['price-grid']}>
      <h4 className={styles['title']}>
        Price grid <span>(flexible dates)</span>
      </h4>
      <div
        className={styles['table-wrapper']}
        onMouseLeave={() => setHoveredCell([-1, -1])}
      >
        <table>
          <tbody>
            <tr>
              {dummyData[0].map((cell, index) => (
                <th
                  key={index}
                  className={
                    checkHovered(0, index, hoveredCell)
                      ? styles['hovered-cell']
                      : ''
                  }
                >
                  {cell}
                </th>
              ))}
            </tr>
            {dummyData.map((row, i) => {
              if (i === 0) return null;
              return (
                <tr key={i}>
                  {row.map((cell, j) => {
                    if (j === 0)
                      return (
                        <th
                          key={j}
                          className={
                            checkHovered(i, 0, hoveredCell)
                              ? styles['hovered-cell']
                              : ''
                          }
                        >
                          {cell}
                        </th>
                      );
                    return (
                      <td
                        key={j}
                        className={
                          checkHovered(i, j, hoveredCell)
                            ? styles['hovered-cell']
                            : ''
                        }
                        onMouseEnter={() => setHoveredCell([i, j])}
                      >
                        ${cell}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const dummyData = [
  [' ', '2/12', '2/13', '2/14', '2/15', '2/16'],
  ['3/7', 837, 592, 592, 1308, 837],
  ['3/8', 837, 592, 592, 837, 1308],
  ['3/9', 624, 592, 624, 592, 592],
  ['3/10', 1308, 624, 624, 837, 837],
  ['3/11', 592, 624, 1308, 837, 624],
];
