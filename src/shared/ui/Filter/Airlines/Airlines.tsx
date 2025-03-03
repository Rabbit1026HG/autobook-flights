import { FC, useEffect, useRef, useState } from 'react';
import Pill from '@shared/ui/Pill/Pill';
import useFocusOut from '@hooks/useFocusOut';
// import  "./Stops.scss";
import styles from './Airlines.module.scss';
import ToggleButton from '@shared/ui/Button/ToggleButton/ToggleButton';
import { CheckBox } from '@shared/ui/Input';
import { FilterAirlines } from '@shared/types';
import useWindowWidth from '@hooks/useWindowWidth';

interface AirlinesFilterProps {
  current?:
    | 'price'
    | 'stops'
    | 'times'
    | 'airlines'
    | 'emissions'
    | 'connecting'
    | 'duration'
    | 'bags'
    | null;
  getFilter: (
    filter:
      | 'price'
      | 'stops'
      | 'times'
      | 'airlines'
      | 'emissions'
      | 'connecting'
      | 'duration'
      | 'bags'
      | null,
  ) => void;
  className?: string;
}

export const AirlinesFilter: FC<AirlinesFilterProps> = ({ getFilter }) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [allSellected, setAllSelected] = useState<boolean>(true);
  const [selectedAirlines, setSelectedAirlines] =
    useState<FilterAirlines>(airlines);
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusOut(menuRef, () => setMenuOpen(false));

  useEffect(() => {
    if (selectedAirlines === airlines) {
      setIsSelected(false);
      setAllSelected(true);
    } else if (selectedAirlines !== airlines1) {
      setIsSelected(true);
      setAllSelected(false);
      getFilter('airlines');
    }
  }, [selectedAirlines, getFilter, setIsSelected]);
  const onCrossClick = () => {
    setIsSelected(false);
    setAllSelected(true);
    setSelectedAirlines(airlines);
  };

  const windowWidth = useWindowWidth();

  const leftPosition =
    windowWidth - (menuRef.current?.getBoundingClientRect()?.left ?? 0) - 300;

  return (
    <div className={styles['airlines-filter']} ref={menuRef}>
      {isSelected ? (
        <Pill
          onClick={() => {
            setMenuOpen((old) => !old);
          }}
          crossClick={onCrossClick}
          opened={menuOpen}
          cross={isSelected}
          variant="selected"
        >
          Airlines
        </Pill>
      ) : (
        <Pill
          onClick={() => {
            setMenuOpen((old) => !old);
            console.log(menuRef.current);
          }}
          opened={menuOpen}
          cross={isSelected}
        >
          Airlines
        </Pill>
      )}
      {menuOpen && (
        <div
          className={styles['airlines-select']}
          style={{ left: leftPosition > 0 ? '0' : leftPosition }}
        >
          <div className={styles['all-select']}>
            Select all airlines
            <ToggleButton
              checked={allSellected}
              onChange={(e) => {
                e.target.checked
                  ? setSelectedAirlines(airlines)
                  : setSelectedAirlines(airlines1);
                setAllSelected(e.target.checked);
              }}
            />
          </div>
          <>
            <div className={styles['sub-title']}>Alliances</div>
            <div className={styles['alliances-list']}>
              <CheckBox />
              Oneworld
            </div>
            <div className={styles['alliances-list']}>
              <CheckBox />
              SkyTeam
            </div>
            <div className={styles['alliances-list']}>
              <CheckBox />
              Star Alliance
            </div>
          </>
          <>
            <div className={styles['sub-title']}>Airlines</div>
            {Object.entries(selectedAirlines).map(([airline, isSelected]) => (
              <div className={styles['airlines-list']} key={airline}>
                <div>
                  <CheckBox
                    checked={isSelected}
                    onChange={(e) =>
                      setSelectedAirlines({
                        ...selectedAirlines,
                        [airline]: e.target.checked,
                      })
                    }
                  />
                  {airline}
                </div>
                <div
                  className={styles['only-btn']}
                  onClick={() => {
                    const allFalseAirlines = Object.keys(
                      selectedAirlines,
                    ).reduce((acc: any, item) => {
                      acc[item] = item === airline;
                      return acc;
                    }, {} as FilterAirlines);
                    setSelectedAirlines(allFalseAirlines);
                    setAllSelected(false);
                  }}
                >
                  Only
                </div>
              </div>
            ))}
          </>
        </div>
      )}
    </div>
  );
};
const airlines = {
  'Air Canada': true,
  'Air Caraibes': true,
  'Air France': true,
  'Air New Aealand': true,
  'Air Tahiti Nui': true,
  'Air Transat': true,
  Alaska: true,
  American: true,
  Austrian: true,
  'British Airways': true,
  'Brussels Airlines': true,
  Delta: true,
  Finnair: true,
  'French bee': true,
  Hawaiian: true,
  Iberia: true,
  KLM: true,
  Lufthansa: true,
  'Qatar Airways': true,
  Saudia: true,
  'Singapore Airlines': true,
  'Tap Air Portugal': true,
  United: true,
  'Virgin Atlantic': true,
};
const airlines1 = {
  'Air Canada': false,
  'Air Caraibes': false,
  'Air France': false,
  'Air New Aealand': false,
  'Air Tahiti Nui': false,
  'Air Transat': false,
  Alaska: false,
  American: false,
  Austrian: false,
  'British Airways': false,
  'Brussels Airlines': false,
  Delta: false,
  Finnair: false,
  'French bee': false,
  Hawaiian: false,
  Iberia: false,
  KLM: false,
  Lufthansa: false,
  'Qatar Airways': false,
  Saudia: false,
  'Singapore Airlines': false,
  'Tap Air Portugal': false,
  United: false,
  'Virgin Atlantic': false,
};
