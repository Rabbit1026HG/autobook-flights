import { FC, useEffect, useRef, useState } from 'react';
import { Calendar } from './Calendar/Calendar';
import './DatePicker.scss';
import { TextField } from '..';
import CalendarIcon from '@shared/icons/32/calendar-with-dates.svg?react';
import ChevronLeft from '@shared/icons/32/chevron-Left.svg?react';
import ChevronRight from '@shared/icons/32/chevron-Right.svg?react';
import useFocusOut from 'src/hooks/useFocusOut';
import clsx from 'clsx';
import Button from '@shared/ui/Button';
import useWindowWidth from '@hooks/useWindowWidth';
interface DatePickerOneProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedDates?: string[];
  type?: 'single' | 'multiple' | string;
  getSelectedDates?: (dates: string[]) => void;
  name?: string;
  placeholder?: string;
  multiple?: boolean;
  radioNames?: [string, string];
}

const getMonthChange = (value: number, month: number, year: number) => {
  const date = new Date(year, month + value, 1);

  return {
    month: date.getMonth(),
    year: date.getFullYear(),
  };
};

function getSortedDates(dates: string[]) {
  const sortedDates = [...dates];
  return sortedDates.sort(
    (a, b) => new Date(a).valueOf() - new Date(b).valueOf(),
  );
}

export const DatePickerOne: FC<DatePickerOneProps> = ({
  selectedDates,
  getSelectedDates,
  type,
  name,
  ...other
}) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const currentDate = new Date();
  const [calendarDate, setCalendarDate] = useState<{
    month: number;
    year: number;
  }>({
    month: currentDate.getMonth(),
    year: currentDate.getFullYear(),
  });
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth <= 768 && opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [opened, windowWidth]);

  useFocusOut(pickerRef, () => {
    setOpened(false);
  });

  const handleDateChange = (value: number) => {
    setCalendarDate((old) => {
      return getMonthChange(value, old.month, old.year);
    });
  };

  const getNewSelectedDates = (
    clickedDate: string,
    selectedDates: string[],
    type?: string,
  ) => {
    const clickedDateF = new Date(clickedDate);

    if (clickedDateF.valueOf() - new Date().valueOf() < 0)
      return getSortedDates(selectedDates);

    if (selectedDates.includes(clickedDate)) {
      return selectedDates.filter(
        (selectedDate) => selectedDate !== clickedDate,
      );
    }

    if (type === 'single') return [clickedDate];

    if (selectedDates.length === 0) {
      return getSortedDates([clickedDate]);
    } else if (selectedDates.length === 1) {
      return getSortedDates([...selectedDates, clickedDate]);
    } else {
      return [clickedDate];
    }
  };

  const isInHoverRange = (date: string) => {
    if (!hoveredDate || !selectedDates?.length) return false;
    if (new Date(date).valueOf() - new Date().valueOf() < 0) return false;
    const hoverTime = new Date(hoveredDate).getTime();
    const dateTime = new Date(date).getTime();
    const selectedTime = new Date(selectedDates[0]).getTime();

    return (
      selectedDates.length === 1 &&
      ((dateTime > selectedTime && dateTime < hoverTime) ||
        (dateTime < selectedTime && dateTime > hoverTime))
    );
  };

  return (
    <div className={clsx('date-picker-container', other.className)}>
      <div>
        <TextField
          startIcon={<CalendarIcon />}
          placeholder="Cancel Date"
          onClick={() => setOpened((old) => !old)}
          name={name}
          value={selectedDates?.[0] || ''}
          onChange={(event) => {
            getSelectedDates &&
              getSelectedDates([event.target.value, selectedDates?.[1] || '']);
          }}
        />
      </div>
      {opened &&
        (windowWidth > 768 ? (
          <div
            className="date-picker"
            {...other}
            ref={pickerRef}
            style={{
              width: '350px',
              left: '-150px',
              transform: 'translateX(0)',
            }}
          >
            <div className="header">
              <div className="field-group">
                <TextField
                  startIcon={<CalendarIcon />}
                  placeholder="Date"
                  readOnly
                  name={name}
                  onChange={(event) => {
                    getSelectedDates &&
                      getSelectedDates([
                        event.target.value,
                        selectedDates?.[1] || '',
                      ]);
                  }}
                  value={selectedDates?.[0] || ''}
                />
                <Button onClick={() => setOpened(false)}>Done</Button>
              </div>
            </div>
            <div className="slider-calendar">
              <span className="icon" onClick={() => handleDateChange(-1)}>
                <ChevronLeft />
              </span>
              <div className="calendar-container">
                <Calendar
                  key={'calendar1'}
                  month={calendarDate.month + 1}
                  year={calendarDate.year}
                  selectedDates={selectedDates || []}
                  hoveredDate={hoveredDate}
                  setHoveredDate={setHoveredDate}
                  isInHoverRange={isInHoverRange}
                  getClickedDate={(date) => {
                    getSelectedDates &&
                      getSelectedDates(
                        getNewSelectedDates(date, selectedDates || [], type),
                      );
                  }}
                  type={type!}
                />
              </div>
              <span className="icon" onClick={() => handleDateChange(1)}>
                <ChevronRight />
              </span>
            </div>
          </div>
        ) : (
          <div className="date-picker" {...other}>
            <div className="header">
              <h2>Autobook Date</h2>
              <div className="field-group">
                <div style={{ width: '100%' }}>
                  <TextField
                    startIcon={<CalendarIcon />}
                    placeholder="Departure"
                    readOnly
                    name={name}
                    onChange={(event) => {
                      getSelectedDates &&
                        getSelectedDates([
                          event.target.value,
                          selectedDates?.[1] || '',
                        ]);
                    }}
                    autoComplete="off"
                    value={selectedDates?.[0] || ''}
                  />
                </div>
              </div>
              <div className="button-container">
                <Button onClick={() => setOpened(false)}>Done</Button>
              </div>
            </div>
            <div className="slider-calendar">
              {Array.from({ length: 12 }, (_, index) => (
                <Calendar
                  key={index}
                  month={((calendarDate.month + index) % 12) + 1}
                  year={
                    calendarDate.month + index + 1 > 12
                      ? calendarDate.year + 1
                      : calendarDate.year
                  }
                  selectedDates={selectedDates || []}
                  hoveredDate={hoveredDate}
                  setHoveredDate={setHoveredDate}
                  isInHoverRange={isInHoverRange}
                  getClickedDate={(date) => {
                    getSelectedDates &&
                      getSelectedDates(
                        getNewSelectedDates(date, selectedDates || [], type),
                      );
                  }}
                  type={type!}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};
