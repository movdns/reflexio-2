import randomIntFromInterval from "./helpers/randomIntFromInterval";
import genRandomDay from "~/mock/genRandomDay";
import dayjs from "dayjs";
import { TDay } from "root/types/day";

const genRandomDays = (): TDay[] => {
  const endDate = dayjs().subtract(1, "m");
  const startDate = dayjs();

  const maxDaysSize = 28;

  let currentDate = dayjs(endDate);
  let datesBetween: any = [];

  // Get array of all dates between 'startDate' and 'endDate' range
  while (currentDate.isBefore(startDate)) {
    currentDate = currentDate.add(1, "d");
    !currentDate.isAfter(startDate) &&
      datesBetween.push(currentDate.format("D-MM-YY"));
  }

  const dts: number[] = [];

  // 20 iterations with random int 1-28 (max days in Feb.)
  [...Array(maxDaysSize)].forEach(() => {
    dts.push(randomIntFromInterval(1, maxDaysSize));
  });
  // also push current day num
  dts.push(Number(dayjs().format("D")));

  // remove duplicates
  const randomDatesSet = new Set(dts);

  const days: any[] = [];
  randomDatesSet.forEach((d) => {
    const date = `${d}${dayjs().format("-MM-YY")}`;
    days.push(genRandomDay(date));
  });
  return days;
};

export default genRandomDays;
