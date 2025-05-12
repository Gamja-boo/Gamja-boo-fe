import { getDaysInMonth, getFirstDayOfWeek } from "@/app_utils/calendarUtils";

export function generateCalendarGrid(year: number, month: number) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);

  const blanks = Array.from({ length: firstDayOfWeek }, () => null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const allCells = [...blanks, ...days];

  while (allCells.length % 7 !== 0) allCells.push(null);

  const rows = [];
  for (let i = 0; i < allCells.length; i += 7) {
    rows.push(allCells.slice(i, i + 7));
  }

  return rows;
}
