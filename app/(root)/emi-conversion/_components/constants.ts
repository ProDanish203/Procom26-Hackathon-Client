export const GOLD = 'rgb(212, 175, 55)';
export const MIN_ELIGIBLE_AMOUNT = 1000;
export const tenureOptions = [3, 6, 9, 12, 18, 24] as const;
export const DEFAULT_INTEREST_RATE = 14;

export function calcEmi(principal: number, annualRate: number, tenureMonths: number): number {
  if (tenureMonths <= 0) return 0;
  const r = annualRate / 12 / 100;
  if (r === 0) return principal / tenureMonths;
  const factor = Math.pow(1 + r, tenureMonths);
  return (principal * r * factor) / (factor - 1);
}
