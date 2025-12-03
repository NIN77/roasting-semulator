import { normalizeScore, calculateOfflineScore, checkSafety } from '../lib/utils';

declare const describe: any;
declare const test: any;
declare const expect: any;

describe('Scoring Logic', () => {
  test('Normalizes strings to numbers', () => {
    expect(normalizeScore('85', 0)).toBe(85);
    expect(normalizeScore('105', 0)).toBe(100); // Cap at 100
    expect(normalizeScore('-5', 0)).toBe(0);    // Floor at 0
    expect(normalizeScore('invalid', 50)).toBe(50); // Fallback
  });

  test('Offline score heuristic', () => {
    // "gm" keyword adds points
    const text = "gm fam";
    expect(calculateOfflineScore(text)).toBeGreaterThan(50);
  });
});

describe('Safety Logic', () => {
  test('Blocks SSN patterns', () => {
    expect(checkSafety("My number is 123-45-6789")).toBe(false);
  });

  test('Allows benign text', () => {
    expect(checkSafety("Hello world")).toBe(true);
  });
});