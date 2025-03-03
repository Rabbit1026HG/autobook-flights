import { FC, useEffect, useRef, useState } from 'react';
import { Calendar } from './Calendar/Calendar';
import './DatePicker.scss';
import { RadioButton, TextField } from '..';
import CalendarIcon from '@shared/icons/32/calendar-with-dates.svg?react';
import ChevronLeft from '@shared/icons/32/chevron-Left.svg?react';
import ChevronRight from '@shared/icons/32/chevron-Right.svg?react';
import BackIcon from '@shared/icons/32/arrowLeft.svg?react';
import { Button } from '../../Button';
import useFocusOut from 'src/hooks/useFocusOut';
import clsx from 'clsx';
import useWindowWidth from '@hooks/useWindowWidth';

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedDates?: string[];
  type?: 'single' | 'multiple' | string;
  getSelectedDates?: (dates: string[]) => void;
  getType?: (type: string) => void;
  name?: string;
  placeholder?: string;
  multiple?: boolean;
  radioNames?: [string, string];
  // isReturn?: boolean;
  // setIsReturn: (type: boolean) => void;
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

export const DatePicker: FC<DatePickerProps> = ({
  selectedDates,
  getSelectedDates,
  type,
  getType,
  name,
  // isReturn,
  // setIsReturn,
  radioNames,
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

  useFocusOut(pickerRef, () => {
    setOpened(false);
  });

  useEffect(() => {
    if (windowWidth <= 768 && opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [opened, windowWidth]);

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

  const handletypeChange = (val: string) => {
    if (getType) {
      getType(val);
      if (val === 'single') {
        getSelectedDates &&
          getSelectedDates([selectedDates ? selectedDates[0] : '']);
      }
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
      <div
        className={
          type === 'multiple' ? 'date-picker-value' : 'date-picker-onevalue'
        }
      >
        <div style={type === 'multiple' ? { width: '50%' } : {}}>
          <TextField
            startIcon={<CalendarIcon />}
            placeholder="Departure"
            onClick={() => setOpened((old) => !old)}
            name={name}
            value={selectedDates?.[0] || ''}
            onChange={(event) => {
              getSelectedDates &&
                getSelectedDates([
                  event.target.value,
                  selectedDates?.[1] || '',
                ]);
            }}
            readOnly
          />
        </div>
        {type === 'multiple' && (
          <div style={{ width: '50%' }}>
            <TextField
              placeholder="Return"
              onClick={() => setOpened((old) => !old)}
              name={name}
              value={selectedDates?.[1] || ''}
              onChange={(event) => {
                getSelectedDates &&
                  getSelectedDates([
                    selectedDates?.[0] || '',
                    event.target.value,
                  ]);
              }}
              readOnly
            />
          </div>
        )}
      </div>
      {opened &&
        (windowWidth > 768 ? (
          <div className="date-picker" {...other} ref={pickerRef}>
            <div className="header">
              <div className="radio-group">
                <RadioButton
                  label={radioNames?.[0] || 'Single'}
                  name="flightType"
                  id="multiple"
                  checked={type === 'multiple'}
                  onChange={() => handletypeChange('multiple')}
                />
                <RadioButton
                  label={radioNames?.[1] || 'Multiple'}
                  name="flightType"
                  id="single"
                  checked={type === 'single'}
                  onChange={() => handletypeChange('single')}
                />
              </div>
              <div className="field-group">
                <div className={type === 'multiple' ? 'date-picker-value' : ''}>
                  <div style={type === 'multiple' ? { width: '50%' } : {}}>
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
                  {type === 'multiple' && (
                    <div style={{ width: '50%' }}>
                      <TextField
                        placeholder="Return"
                        readOnly
                        name={name}
                        onChange={(event) => {
                          getSelectedDates &&
                            getSelectedDates([
                              selectedDates?.[0] || '',
                              event.target.value,
                            ]);
                        }}
                        autoComplete="off"
                        value={selectedDates?.[1] || ''}
                      />
                    </div>
                  )}
                </div>

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
                <Calendar
                  className="right-calendar"
                  key={'calendar2'}
                  month={
                    getMonthChange(1, calendarDate.month, calendarDate.year)
                      .month + 1
                  }
                  year={
                    getMonthChange(1, calendarDate.month, calendarDate.year)
                      .year
                  }
                  selectedDates={selectedDates || []}
                  hoveredDate={hoveredDate}
                  setHoveredDate={setHoveredDate}
                  isInHoverRange={isInHoverRange}
                  getClickedDate={(date) => {
                    getSelectedDates &&
                      getSelectedDates(
                        getNewSelectedDates(date, selectedDates ?? [], type),
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
          <div className="date-picker" {...other} ref={pickerRef}>
            <div className="header">
              <div className="radio-group-container">
                <BackIcon onClick={() => setOpened(false)} />
                <div className="radio-group">
                  <RadioButton
                    label={radioNames?.[0] || 'Single'}
                    name="flightType"
                    id="multiple"
                    checked={type === 'multiple'}
                    onChange={() => handletypeChange('multiple')}
                  />
                  <RadioButton
                    label={radioNames?.[1] || 'Multiple'}
                    name="flightType"
                    id="single"
                    checked={type === 'single'}
                    onChange={() => handletypeChange('single')}
                  />
                </div>
              </div>
              <div className="field-group">
                <div
                  style={
                    type === 'multiple' ? { width: '50%' } : { width: '100%' }
                  }
                >
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
                {type === 'multiple' && (
                  <div style={{ width: '50%' }}>
                    <TextField
                      placeholder="Return"
                      readOnly
                      name={name}
                      onChange={(event) => {
                        getSelectedDates &&
                          getSelectedDates([
                            selectedDates?.[0] || '',
                            event.target.value,
                          ]);
                      }}
                      autoComplete="off"
                      value={selectedDates?.[1] || ''}
                    />
                  </div>
                )}
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
