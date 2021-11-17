import Joi from 'joi';

/* eslint-disable no-console */
export function parseDate(date, delimiter) {
  const [day, month, year] = date.split(delimiter);
  if (!month || !year || Number(day) > 31) {
    console.log('invalid date provided');
    return;
  }

  const dob = new Date(date);
  const current = new Date(Date.now());

  if (current.getFullYear() - dob.getFullYear() < 18) {
    console.log('not old enough');
    return;
  }

  if (
    (current.getFullYear() - dob.getFullYear() === 18 &&
      current.getMonth() - dob.getMonth() < 0) ||
    dob.getDate() > current.getDate()
  ) {
    console.log('not old');
    return;
  }
  console.log(current.getDate());
  console.log(dob.getDate());
}
