import { FC } from 'react';
import { PlaneStructure } from './PlaneStructure';
import { ExitRow } from './ExitRow';
import { BusinessRow } from './BusinessRow';
import './Plane.scss';
import { GraphicalObjects } from './GraphicalObjects';
import { EconomyRow } from './EconomyRow';

export const Plane: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 2426 2965"
      fill="none"
      className="plane-svg-container"
    >
      <g className="plane-svg">
        <PlaneStructure />
        <g id="business">
          <rect x="1113" y="614" width="200" height="312" rx="8" fill="white" />
          {Array.from({ length: 5 }).map((_, i) => (
            <BusinessRow yOffset={i} rowNumber={i + 1} key={'row ' + i + 1} />
          ))}
        </g>
        <g id="economy">
          <rect
            x="1113"
            y="942"
            width="200"
            height="1332"
            rx="8"
            fill="white"
          />

          <ExitRow yPos={0} key={'exit-row1'} />

          {Array.from({ length: 8 }).map((_, i) => (
            <EconomyRow
              start={0}
              yOffset={i}
              rowNumber={5 + i + 1}
              key={'row ' + 5 + i + 1}
            />
          ))}

          <ExitRow yPos={374} key={'exit-row2'} />

          {Array.from({ length: 5 }).map((_, i) => (
            <EconomyRow
              start={374}
              yOffset={i}
              rowNumber={13 + i + 1}
              key={'row ' + 13 + i + 1}
            />
          ))}

          <ExitRow yPos={616} key={'exit-row3'} />

          {Array.from({ length: 10 }).map((_, i) => (
            <EconomyRow
              start={616}
              yOffset={i}
              rowNumber={18 + i + 1}
              key={'row ' + 18 + i + 1}
            />
          ))}

          <ExitRow yPos={1078} key={'exit-row4'} />

          {Array.from({ length: 5 }).map((_, i) => (
            <EconomyRow
              start={1078}
              yOffset={i}
              rowNumber={28 + i + 1}
              key={'row ' + 28 + i + 1}
            />
          ))}
        </g>
      </g>
      <GraphicalObjects />
    </svg>
  );
};
