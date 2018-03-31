export const validateReminderForm = (formData) => {
  const start = parseInt(formData.start, 10);
  const end = parseInt(formData.end, 10);
  const errors = [];

  if (start > end) {
    errors.push({
      error: true,
      field: 'end',
      message: 'End time can\'t be greater than start'
    });
  }

  if (formData.text.length > 30) {
    errors.push({
      error: true,
      field: 'text',
      message: '30 characters max'
    })
  }

  return errors;
};
