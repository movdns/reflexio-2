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

import { useParams } from "react-router-dom";
import { Alert, Snackbar, Typography } from "@mui/material";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getDayAPICall, getDaysAPICall, setDayAPICall } from "../api";
import generateDay from "./helpers/generateDay";
import { TDay } from "../types";
import axios from "axios";

type DiaryContextProps = {
  loading: boolean;
  loadingDays: boolean;
  loadingDay: boolean;
  day: TDay | null;
  // setDay?(data: any): void;
  updateDayState?(data: any): void;
  days: TDay[] | null | undefined;
  setDays?(data: any): void;
  today?: TDay | null;
  isDayEditable?(): boolean;
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
    async (): Promise<TDay[] | null> => {
      const data = await getDaysAPICall();
      return hydrateWithEmptyDates(data.data);
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
      } else {
        setDayState(data.data);
      }
      return !data.error ? data.data : data.message;
    }
  );

  const [dayState, setDayState] = useState(dayData || null);

  // update / create day
  const dayMutation = useMutation<any, unknown, TDay | null>(
    async (dayData) => dayData && setDayAPICall(dayData),
    {
      onSuccess: (dayData) => {
        queryClient.invalidateQueries(["day"], dayData.id);
        queryClient.invalidateQueries(["diary"], dayData.id);
      },
    }
  );

  const updateDayState = useCallback(
    async (data: any) => {
      setDayState({ ...dayData, ...data });
    },
    [dayData]
  );

  const setDayMutation = useCallback(
    async (data: any) => {
      dayMutation.mutate({ ...dayData, ...data });
    },
    [dayData, dayMutation]
  );

  const [savedLabel, setSavedLabel] = useState(false);

  useEffect(() => {
    !dayState && setDayState(dayData);
    // saving only if user finished typing \ setting icons
    const delayDebounceFn = setTimeout(async () => {
      if (hash(dayData) !== hash(dayState)) {
        setSavedLabel(true);
        await setDayMutation(dayState);
        setTimeout(() => setSavedLabel(false), 1000);
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [dayData, dayState, setDayMutation]);

  const isDayEditable = () => {
    const dayDateUnix = dayjs(dayData?.date, "DD-MM-YY").unix();
    const agoDateUnix = dayjs().subtract(30, "days").unix();
    return true;
  };

  // if (dayLoading || daysLoading) {
  //   return <DiarySkeleton />;
  // }

  return (
    <DiaryContext.Provider
      value={{
        loading: daysLoading || dayLoading,
        loadingDays: daysLoading,
        loadingDay: dayLoading,
        days: daysData,
        day: dayState,
        updateDayState,
        today: null,
        isDayEditable,
      }}
    >
      {children}
      <Snackbar
        open={savedLabel}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success">
          <Typography variant="body2" color="darkgreen">
            updated
          </Typography>
        </Alert>
      </Snackbar>
    </DiaryContext.Provider>
  );
};

export const useDiaryContext = () => useContext(DiaryContext);
