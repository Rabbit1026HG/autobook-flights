import { createContext, useState } from 'react';
import React from 'react';

type SelectedSeats = {
  departing: string[];
  arriving: string[];
};
type PlaneContextType = {
  selectedSeats: SelectedSeats;
  currentSeatsArray: string[];
  upgradeConfirmed: boolean;
  setUpgradeConfirmed: (confirmed: boolean) => void;
  departing: boolean;
  setDeparting: (departing: boolean) => void;
  selectedClass: 'Economy' | 'Business';
  setPassengersCount: (count: number) => void;
  handleSeatSelection: (clicked: [number, number]) => void;
  checkSeat: (seat: [number, number]) => boolean;
};

const checkSeatClass = (selectedSeats: string[]) => {
  let newClass: 'Economy' | 'Business' = 'Economy';
  selectedSeats.every((seat) => {
    const seatArr = seat.split('-');
    console.log(seatArr);
    if (+seatArr[0] < 6) {
      newClass = 'Business';
      return false;
    }
    return true;
  });
  return newClass;
};

export const PlaneContext = createContext<PlaneContextType | null>(null);

const PlaneContextProvider: React.FC<{
  children: React.ReactNode;
  passengersCount?: number;
}> = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeats>({
    departing: [],
    arriving: [],
  });
  const [upgradeConfirmed, setUpgradeConfirmed] = useState(false);
  const [passengersCount, setPassengersCount] = useState(1);
  const [departing, setDeparting] = useState(true);
  const [selectedClass, setSelectedClass] = useState<'Economy' | 'Business'>(
    'Economy',
  );
  const checkSeat: PlaneContextType['checkSeat'] = (seat) => {
    const selected = selectedSeats[departing ? 'departing' : 'arriving'];
    return selected.includes(seat.join('-'));
  };

  const handleSeatSelection: PlaneContextType['handleSeatSelection'] = (
    clicked,
  ) => {
    setSelectedSeats((old) => {
      const clickedSeat = clicked.join('-');
      const currentArr = old[departing ? 'departing' : 'arriving'];
      let newArr = [...currentArr];
      if (currentArr.find((val) => val === clickedSeat)) {
        newArr = currentArr.filter((val) => val !== clickedSeat);
      } else {
        if (currentArr.length >= passengersCount) {
          newArr.pop();
        }
        newArr.push(clickedSeat);
      }
      setSelectedClass(checkSeatClass(newArr));
      return { ...old, [departing ? 'departing' : 'arriving']: newArr };
    });
  };

  return (
    <PlaneContext.Provider
      value={{
        selectedSeats,
        handleSeatSelection,
        departing,
        setDeparting,
        upgradeConfirmed,
        setUpgradeConfirmed,
        selectedClass,
        checkSeat,
        setPassengersCount,
        currentSeatsArray: selectedSeats[departing ? 'departing' : 'arriving'],
      }}
    >
      {children}
    </PlaneContext.Provider>
  );
};

export default PlaneContextProvider;
// eslint-disable-next-line react-refresh/only-export-components
export const usePlaneContext = () => {
  const context = React.useContext(PlaneContext);
  if (!context) {
    throw new Error(
      'usePlaneContext must be used within a PlaneContextProvider',
    );
  }
  return context;
};
