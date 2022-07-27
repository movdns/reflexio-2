import dayjs from "dayjs";

const hydrateWithEmptyDates = (days: any) => {
  // Dates range
  const endDate = dayjs().subtract(9, "d");
  const startDate = dayjs().subtract(1, "d");

  let currentDate = dayjs(endDate);
  let generatedDates: any = [];

  // Get array of all dates between dates range
  while (currentDate.isBefore(startDate)) {
    currentDate = currentDate.add(1, "d");
    generatedDates.push(currentDate.format("D-MM-YY"));
  }

  let existingDates: string[] = [];
  // Get array of existing dates
  days?.forEach((day: any) => existingDates.push(day.date));

  let difference = generatedDates.filter(
    (x: any) => !existingDates.includes(x)
  );

  const ghostDays: any = [];
  // Convert non-existing dates to days obj
  difference.forEach((d: any) => {
    ghostDays.push({ date: d });
  });

  // Merge and sort
  return [...days, ...ghostDays].sort(
    (a: any, b: any) =>
      dayjs(b.date, "D-MM-YY").unix() - dayjs(a.date, "D-MM-YY").unix()
  );
};

export default hydrateWithEmptyDates;
