import { expect } from 'chai';

import { getDays, weekdays } from './date';

describe('Date', () => {
  describe('getDays', () => {
    it('returns 28 days without lead/trail if first day begins on Sunday ', () => { // eslint-disable-line
      const max = 28;
      const firstWeekdayIndex = 0;
      const currentDay = 18;
      const expected = [
        {day: 1, isCurrent: false},
        {day: 2, isCurrent: false},
        {day: 3, isCurrent: false},
        {day: 4, isCurrent: false},
        {day: 5, isCurrent: false},
        {day: 6, isCurrent: false},
        {day: 7, isCurrent: false},
        {day: 8, isCurrent: false},
        {day: 9, isCurrent: false},
        {day: 10, isCurrent: false},
        {day: 11, isCurrent: false},
        {day: 12, isCurrent: false},
        {day: 13, isCurrent: false},
        {day: 14, isCurrent: false},
        {day: 15, isCurrent: false},
        {day: 16, isCurrent: false},
        {day: 17, isCurrent: false},
        {day: 18, isCurrent: true},
        {day: 19, isCurrent: false},
        {day: 20, isCurrent: false},
        {day: 21, isCurrent: false},
        {day: 22, isCurrent: false},
        {day: 23, isCurrent: false},
        {day: 24, isCurrent: false},
        {day: 25, isCurrent: false},
        {day: 26, isCurrent: false},
        {day: 27, isCurrent: false},
        {day: 28, isCurrent: false},
      ];

      const actual = getDays(max, currentDay, firstWeekdayIndex);
      expect(actual).to.deep.equal(expected);
    });

    it('returns max days with leading and trailing cells', () => {
      const max = 31;
      const firstWeekdayIndex = 1;
      const currentDay = 6;
      const expected = [
        {day: ''},
        {day: 1, isCurrent: false},
        {day: 2, isCurrent: false},
        {day: 3, isCurrent: false},
        {day: 4, isCurrent: false},
        {day: 5, isCurrent: false},
        {day: 6, isCurrent: true},
        {day: 7, isCurrent: false},
        {day: 8, isCurrent: false},
        {day: 9, isCurrent: false},
        {day: 10, isCurrent: false},
        {day: 11, isCurrent: false},
        {day: 12, isCurrent: false},
        {day: 13, isCurrent: false},
        {day: 14, isCurrent: false},
        {day: 15, isCurrent: false},
        {day: 16, isCurrent: false},
        {day: 17, isCurrent: false},
        {day: 18, isCurrent: false},
        {day: 19, isCurrent: false},
        {day: 20, isCurrent: false},
        {day: 21, isCurrent: false},
        {day: 22, isCurrent: false},
        {day: 23, isCurrent: false},
        {day: 24, isCurrent: false},
        {day: 25, isCurrent: false},
        {day: 26, isCurrent: false},
        {day: 27, isCurrent: false},
        {day: 28, isCurrent: false},
        {day: 29, isCurrent: false},
        {day: 30, isCurrent: false},
        {day: 31, isCurrent: false},
        {day: ''},
        {day: ''},
        {day: ''}
      ];

      const actual = getDays(max, currentDay, firstWeekdayIndex);
      expect(actual).to.deep.equal(expected);

    });
  });
});
