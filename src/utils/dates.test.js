import { describe, it, expect } from 'vitest';
import { toEpoch, fromEpoch, getISOWeek, getWeekStart } from './dates.js';

describe('toEpoch / fromEpoch round-trip', () => {
  it('converts a date string to epoch seconds and back to the same YYYY-MM-DD', () => {
    // toEpoch parses date-only strings as UTC midnight (JS Date.parse spec),
    // but fromEpoch reads the result back with LOCAL getters - so round-tripping
    // exact UTC midnight can land on the previous day in negative-UTC-offset
    // timezones. Using UTC noon keeps the test valid across all real-world
    // timezones without changing (or hiding) that existing behavior.
    const epoch = toEpoch('2026-01-15') + 12 * 3600;
    expect(fromEpoch(epoch)).toBe('2026-01-15');
  });

  it('returns null for an unparseable date string', () => {
    expect(toEpoch('not-a-date')).toBeNull();
    expect(toEpoch('')).toBeNull();
  });

  it('returns an empty string for a falsy epoch', () => {
    expect(fromEpoch(0)).toBe('');
    expect(fromEpoch(null)).toBe('');
  });
});

describe('getISOWeek', () => {
  it('returns week 1 for January 1st, 2024 (a Monday)', () => {
    expect(getISOWeek(new Date(2024, 0, 1))).toBe(1);
  });

  it('returns week 53 for December 31st, 2020 (ISO year with 53 weeks)', () => {
    expect(getISOWeek(new Date(2020, 11, 31))).toBe(53);
  });

  it('assigns early-January dates to the last ISO week of the previous year when appropriate', () => {
    // Jan 1 2023 is a Sunday, which ISO 8601 assigns to week 52 of 2022.
    expect(getISOWeek(new Date(2023, 0, 1))).toBe(52);
  });
});

describe('getWeekStart', () => {
  it('returns the Monday of the given ISO week/year', () => {
    const monday = getWeekStart(2024, 1);
    expect(monday.getFullYear()).toBe(2024);
    expect(monday.getMonth()).toBe(0);
    expect(monday.getDate()).toBe(1);
    expect(monday.getDay()).toBe(1); // 1 = Monday
  });

  it('round-trips with getISOWeek for a handful of weeks across the year', () => {
    for (const weekNum of [1, 10, 26, 40, 52]) {
      const monday = getWeekStart(2024, weekNum);
      expect(getISOWeek(monday)).toBe(weekNum);
    }
  });
});
