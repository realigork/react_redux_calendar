export const validateReminderForm = (formData) => {
  const data = Object.assign({}, formData);

  const start = parseInt(data.start, 10);
  const end = parseInt(data.end, 10);
  const errors = [];

  if (start > end) {
    errors.push({
      error: true,
      field: 'end',
      message: 'End time can\'t be greater than start'
    });
  }

  if (data.text.length > 30) {
    errors.push({
      error: true,
      field: 'text',
      message: '30 characters max'
    })
  }

  return errors;
};
