import { expect } from 'chai';

import {
  getReminderIndexById,
  removeReminderByIndex,
  updateReminderByIndex
} from './reminder';

const data = [{id: 1, text: 'a'}, {id: 2, text: 'b'}, {id: 3, text: 'c'}];

describe('Reminder', () => {
  describe('getReminderIndexById', () => {
    it('returns index of object inside the array', () => {
      const id = 3;
      const expected = 2;
      const actual = getReminderIndexById(id, data);

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('removeReminderByIndex', () => {
    it('returns new array with item removed at specified index', () => {
      const id = 2;
      const index = getReminderIndexById(id, data);
      const expected = [{id: 1, text: 'a'}, {id: 3, text: 'c'}];
      const actual = removeReminderByIndex(index, data);

      expect(actual).to.deep.equal(expected);
    });
  });

  describe('updateReminderByIndex', () => {
    it('returns new array with updated item at specified index', () => {
      const id = 3;
      const index = getReminderIndexById(id, data);
      const item = {id: 3, text: 'updated text'};
      const expected = [{id: 1, text: 'a'}, {id: 2, text: 'b'}, item];
      const actual = updateReminderByIndex(index, data, item);

      expect(actual).to.deep.equal(expected);
    });
  });
});