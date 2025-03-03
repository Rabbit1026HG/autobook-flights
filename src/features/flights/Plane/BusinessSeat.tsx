import { usePlaneContext } from '@context/PlaneContext';
import UpgradeSeat from '../UpgradeSeat/UpgradeSeat';
import { Modal } from '@shared/ui/Modal/Modal';
import { useState } from 'react';

export const BusinessSeat = ({
  xOffset = 0,
  available = true,
  rowNumber = 0,
  seatNumber = 0,
}) => {
  const {
    checkSeat,
    handleSeatSelection,
    upgradeConfirmed,
    setUpgradeConfirmed,
  } = usePlaneContext();
  const checked = checkSeat([rowNumber, seatNumber]);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const bgColor = checked
    ? 'url(#pink-gradient)'
    : available
      ? 'url(#turquoise-gradient)'
      : '#F6F6FE';
  return (
    <>
      <g
        className={
          'bussiness-seat' + (available && !checked ? ' available' : '')
        }
        transform={`translate(${xOffset * 38} 0)`}
        onClick={() => {
          if (!upgradeConfirmed) {
            setShowUpgradeModal(true);
          } else {
            handleSeatSelection([rowNumber, seatNumber]);
          }
        }}
      >
        <rect x={1121} y="630" width="30" height="40" rx="4" fill={bgColor} />
        {checked && (
          <path
            id="Vector 10"
            d="M1130.73 649.757L1134.49 653.515L1142 646"
            stroke="#F6F6FE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </g>
      <foreignObject>
        <Modal opened={showUpgradeModal} setOpened={setShowUpgradeModal}>
          <UpgradeSeat
            onConfirm={() => {
              setShowUpgradeModal(false);
              setUpgradeConfirmed(true);
              handleSeatSelection([rowNumber, seatNumber]);
            }}
            onCancel={() => {
              setShowUpgradeModal(false);
            }}
          />
        </Modal>
      </foreignObject>
    </>
  );
};
