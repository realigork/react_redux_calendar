export const REMINDER_COLORS = [
  { id: 'red', background: '#FF8682' },
  { id: 'orange', background: '#FFDC82' },
  { id: 'yellow', background: '#FFF682' },
  { id: 'green', background: '#7AEF82' },
  { id: 'blue', background: '#717DD7', color: '#fff' },
  { id: 'purple', background: '#9C6AD6', color: '#fff' },
  { id: 'default', background: '#eee' },
];

export const REMINDER_FORM_DEFAULT_DATA = {
  id: null,
  day: -1,
  start: '00:00',
  end: '01:00',
  text: 'Default reminder',
  editing: false,
  color: {}
};

export const getReminderById = (id, reminders) => {
  const array = reminders.slice(0);
  const reminder = array.filter((item) => {
    return item.id === id;
  });

  return reminder[0];
};

export const removeReminderByIndex = (index, reminders) => {
  const array = reminders.slice(0);
  return [
    ...array.slice(0, index),
    ...array.slice(index+1,)
  ]
};

export const updateReminderByIndex = (index, reminders, updated) => {
  const array = reminders.slice(0);
  return [
    ...array.slice(0, index),
    updated,
    ...array.slice(index+1,)
  ]
};

export const getReminderByDay = (reminders, day) => {
  const dayReminders = reminders.slice(0);
  let reminder = null;
  if (dayReminders.length) {
    reminder = dayReminders.filter((item) => {
      return item.day === day;
    });
  }

  return reminder;
};
