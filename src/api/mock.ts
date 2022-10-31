import initialUserSettings from "~/common/appConfig/initialUserSettings";
import genRandomDays from "~/mock/genRandomDays";
import genRandomDay from "~/mock/genRandomDay";
import { TResponseData } from "root/types/";
import { TDay } from "root/types/day";

// Generates on every page refresh
const days: TDay[] = genRandomDays();

// Days Collection
export const getDaysMockCall = async (): Promise<TResponseData<TDay[]>> => {
  return {
    error: false,
    data: days,
  };
};

// Day Resource
export const getDayMockCall = async (
  date: string
): Promise<TResponseData<TDay>> => {
  let day = days.find((d) => d.date === date);
  if (!day) {
    day = genRandomDay(date);
    days.push(day);
  }
  return {
    error: false,
    data: { ...day },
  };
};

// Day Resource Mutation
export const setDayMockCall = async (
  data: any
): Promise<TResponseData<TDay>> => {
  const day = days.find((d) => d.date === data.date);
  return {
    error: false,
    data: { ...day, ...data },
  };
};

// User Settings (palette, glyphs, tags, etc.)
export const getUserSettingsMockCall = async (): Promise<
  TResponseData<any>
> => {
  return {
    error: false,
    data: initialUserSettings,
  };
};
