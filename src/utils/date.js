export const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // eslint-disable-line
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // eslint-disable-line

export const splitDaysIntoWeeks = (array, chunk) => {
  const transformed = array.reduce((arr, value, index) => {
    if (index % chunk === 0) {
      arr.push([]);
    }

    arr[arr.length-1].push(value);
    return arr;
  }, []);

  return transformed;
};

export const getCurrentDateObj = () => {
  const date = new Date(Date.now());
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    monthName: months[date.getMonth()],
    day: date.getDate(),
    dayName: weekdays[date.getDay()]
  }
};

export const getFirstDayIndex = (year, month) => {
  return new Date(year, month, 1).getDay();
};

export const getMonthTotal = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getDays = (maxDays, currentDay, firstWeekdayIndex) => {
  const days = [];
  const monthStart = 1;

  // if it's February 28 days and first day starts on Sunday
  // Then we only get 4 rows - 28 cells
  // For all other cases there should be 5 rows - 35 cells
  const maxCells = (maxDays === 28 && firstWeekdayIndex === 0) ?
    28 - firstWeekdayIndex :
    35 - firstWeekdayIndex;

  // calculate:
  // leading cells by deducting firstDay from current month's first day
  // if loop index continues after current month's max days
  // then insert trailing cells for next month
  for (let i = monthStart - firstWeekdayIndex, l = maxCells; i <= l; i++) {
    if (i < monthStart || i > maxDays) {
      days.push({ day: '' });
    } else {
      days.push({
        day: i,
        isCurrent: i === currentDay
      });
    }
  }

  return days;
};

export const generateDayHours = () => {
  const start = 0;
  const end = 23;
  const array = [];
  for (let i = start, l = end; i <= l; i++) {
    let trailing = '';
    if (i < 10) {
      array.push(`0${i}:00`);
    } else {
      array.push(`${i}:00`);
    }
  }

  return array;
}