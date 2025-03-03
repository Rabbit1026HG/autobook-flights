import { FC } from 'react';
import './Calendar.scss';
import clsx from 'clsx';

interface CalendarProps {
  month: number;
  year: number;
  selectedDates: string[];
  getClickedDate: (date: string) => void;
  className?: string;
  hoveredDate: string | null;
  setHoveredDate: (date: string | null) => void;
  isInHoverRange: (date: string) => void;
  type: string;
}

const monthsNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const Calendar: FC<CalendarProps> = ({
  month,
  year,
  selectedDates,
  getClickedDate,
  className,
  setHoveredDate,
  isInHoverRange,
  hoveredDate,
  type,
}) => {
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const isInRange = (dateString: string) => {
    if (selectedDates.length === 2) return false;
    const startDate = new Date(selectedDates[0]).getTime();
    const endDate = new Date(selectedDates[1]).getTime();
    const currentDate = new Date(dateString).getTime();
    if (!startDate || !endDate) return false;
    return currentDate >= startDate && currentDate <= endDate;
  };

  const isRangeStart = (dateString: string) => {
    const currentDate = new Date(dateString).getTime();
    if (selectedDates.length === 2) {
      const startDate = new Date(selectedDates[0]).getTime();
      return startDate === currentDate;
    } else if (selectedDates.length === 1 && hoveredDate) {
      const selectedDate = new Date(selectedDates[0]).getTime();
      const _hoveredDate = new Date(hoveredDate).getTime();
      if (selectedDate < _hoveredDate) {
        return selectedDate === currentDate;
      } else {
        return _hoveredDate === currentDate;
      }
    }

    return false;
  };

  const isRangeEnd = (dateString: string) => {
    const currentDate = new Date(dateString).getTime();
    if (selectedDates.length === 2) {
      const endDate = new Date(selectedDates[1]).getTime();
      return endDate === currentDate;
    } else if (selectedDates.length === 1 && hoveredDate) {
      const selectedDate = new Date(selectedDates[0]).getTime();
      const _hoveredDate = new Date(hoveredDate).getTime();
      if (selectedDate < _hoveredDate) {
        return _hoveredDate === currentDate;
      } else {
        return selectedDate === currentDate;
      }
    } else {
      return false;
    }
  };

  const isInDateRange = (dateString: string) => {
    if (selectedDates.length !== 2) return false;
    if (new Date(dateString).valueOf() - new Date().valueOf() < 0) return false;
    const current = new Date(dateString).getTime();
    const start = new Date(selectedDates[0]).getTime();
    const end = new Date(selectedDates[1]).getTime();
    return current > start && current < end;
  };

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = getDaysInMonth(month, year);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(<td key={`empty-${i}`}></td>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${month.toString().padStart(2, '0')}/${day
      .toString()
      .padStart(2, '0')}/${year}`;

    const isStart = isRangeStart(dateString);
    const isEnd = isRangeEnd(dateString);
    const inRange = isInRange(dateString);

    const dateClass = clsx('calendar-day', {
      selected: selectedDates.includes(dateString),
      'in-range': isInDateRange(dateString),
      'hover-range': isInHoverRange(dateString),
      'range-start': isStart,
      'range-end': isEnd,
      'margin-left': inRange && !isStart,
      'margin-right': inRange && !isEnd,
      disabled: new Date(dateString).valueOf() - new Date().valueOf() < 0,
    });

    days.push(
      <td
        key={day}
        className={dateClass}
        onClick={() => getClickedDate(dateString)}
        onMouseEnter={() => {
          if (
            new Date(dateString).valueOf() - new Date().valueOf() > 0 &&
            type !== 'single'
          ) {
            setHoveredDate(dateString);
          }
        }}
        onMouseLeave={() => {
          setHoveredDate(null);
        }}
      >
        <button
          className={clsx({
            selected: isStart || isEnd,
            rounded: !isStart && !isEnd,
          })}
          type="button"
        >
          {day}
        </button>
      </td>,
    );
  }

  const rows: any[] = [];
  let cells: any[] = [];

  days.forEach((day, i) => {
    if (i % 7 !== 0) {
      cells.push(day);
    } else {
      if (cells.length > 0) rows.push(cells);
      cells = [day];
    }
    if (i === days.length - 1) {
      if (cells.length > 0) rows.push(cells);
    }
  });

  return (
    <div className={className}>
      <div className="header">
        <h4>{monthsNames[month - 1] + ' ' + year}</h4>
      </div>
      <table className={clsx('calendar')} style={{ borderSpacing: 0 }}>
        <thead>
          <tr>
            <th>S</th>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr className={'calendar-day'} key={i}>
              {row}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
