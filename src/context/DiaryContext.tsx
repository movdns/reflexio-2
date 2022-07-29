import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
// @ts-ignore
import hash from "object-hash";
import hydrateWithEmptyDates from "./helpers/hydrateWithEmptyDates";
import { useAuth } from "reactfire";

import DiarySkeleton from "../components/Diary/Skeleton";
import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getDayAPICall, getDaysAPICall, setDayAPICall } from "../api";
import generateDay from "./helpers/generateDay";
import { TDay } from "../types";

type DiaryContextProps = {
  loading: boolean;
  loadingDays: boolean;
  loadingDay: boolean;
  day: TDay | null;
  setDay?(data: TDay): void;
  days: TDay[] | null;
  setDays?(data: any): void;
  today?: TDay | null;
};

const DiaryContext = createContext<DiaryContextProps>({
  loading: true,
  loadingDays: true,
  loadingDay: true,
  day: {
    date: dayjs().format("D-MM-YY"),
  },
  days: null,
});

export const DiaryProvider = ({ children }: any) => {
  const queryClient = useQueryClient();

  const { currentUser } = useAuth();

  // Retrieve date from query
  const { date: queryDate } = useParams();
  const searchDate =
    queryDate && dayjs(`${queryDate}`, "D-MM-YY").isValid()
      ? queryDate
      : dayjs().format("D-MM-YY");

  // all days api call
  const { isLoading: daysLoading, data: daysData } = useQuery(
    ["diary"],
    async () => {
      const data = await getDaysAPICall();
      return !data.error ? data.data : data.message;
    }
  );

  // get selected day (by date from params)
  const { isLoading: dayLoading, data: dayData } = useQuery(
    ["day", searchDate],
    async () => {
      const data = await getDayAPICall(searchDate);
      if (data.error) {
        const newDay = generateDay({
          date: searchDate,
          uid: currentUser?.uid || "",
        });
        dayMutation.mutate(newDay);
        return newDay;
      }
      console.log(data.data);
      return !data.error ? data.data : data.message;
    }
  );

  // update / create day
  const dayMutation = useMutation<any, unknown, TDay | null>(
    async (dayData) => dayData && setDayAPICall(dayData),
    {
      onSettled: (dayData) =>
        queryClient.invalidateQueries(["diary"], dayData.id),
    }
  );

  // useEffect(() => {
  //   console.log(searchDate);
  // }, [searchDate, dayData]);

  // if (dayLoading || daysLoading) {
  //   return <DiarySkeleton />;
  // }

  return (
    <DiaryContext.Provider
      value={{
        loading: daysLoading || dayLoading,
        loadingDays: daysLoading,
        loadingDay: dayLoading,
        days: daysData && hydrateWithEmptyDates(daysData),
        day: dayData || null,
        today: null,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiaryContext = () => useContext(DiaryContext);
