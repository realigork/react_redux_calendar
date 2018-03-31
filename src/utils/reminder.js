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
  start: '09:00',
  end: '10:00',
  text: 'Default reminder',
  editing: false,
  color: {}
};

export const getReminderById = (id, reminders) => {
  const array = reminders.slice(0);
  return array.filter((item) => {
    return item.id === id;
  });
};

export const getReminderIndexById = (id, reminders) => {
  const array = reminders.slice(0);
  return array.findIndex(item => item.id === id);
};

export const removeReminderByIndex = (index, reminders) => {
  const array = reminders.slice(0);
  return [
    ...array.slice(0, index),
    ...array.slice(index+1,)
  ]
};