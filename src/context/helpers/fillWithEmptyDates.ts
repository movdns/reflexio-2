import dayjs from "dayjs";
import { TDay } from "../../types";

/**
 * Add non-existing day to
 * @param {TDay[] | null} days
 * @return {TDay[]}
 */
const fillWithEmptyDates = (days: TDay[] | null): any => {
  // @todo return type
  // Dates range
  const endDate = dayjs().subtract(9, "d");
  const startDate = dayjs();

  let currentDate = dayjs(endDate);
  let generatedDates: any = [];

  // Get array of all dates between 'startDate' and 'endDate' range
  while (currentDate.isBefore(startDate)) {
    currentDate = currentDate.add(1, "d");
    !currentDate.isAfter(startDate) &&
      generatedDates.push(currentDate.format("D-MM-YY"));
  }

  // Get array of existing dates
  let existingDates: string[] = [];
  days
    ? days.forEach((day: TDay) => existingDates.push(day.date))
    : (days = []);

  // Get diff between existing and non-existing days
  let difference = generatedDates.filter(
    (generatedDate: string) => !existingDates.includes(generatedDate)
  );

  // Convert non-existing dates to days obj
  const generatedDays: Pick<TDay, "date">[] = [];
  difference.forEach((generatedDate: string) => {
    generatedDays.push({ date: generatedDate });
  });

  // Merge and sort by date DESC
  return [...days, ...generatedDays].sort(
    (a: TDay, b: TDay) =>
      dayjs(b.date, "D-MM-YY").unix() - dayjs(a.date, "D-MM-YY").unix()
  );
};

export default fillWithEmptyDates;
