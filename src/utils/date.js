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

export const getDays = (max, firstDayIndex) => {
  console.log(firstDayIndex);
  const days = [];
  for (let i = 1, l = max + firstDayIndex; i <= l; i++) {
    if (i < firstDayIndex) {
      days.push({ day: 0 });
    } else {
      days.push({ day: i - firstDayIndex });
    }
  }

  return days;
};
