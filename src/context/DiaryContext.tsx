import { FC, ReactNode, createContext, useCallback, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDayAPICall, getDaysAPICall, setDayAPICall } from "~/api";
import { useParams } from "react-router-dom";
import { TDay } from "root/types/day";
import dayjs from "dayjs";

import { toast } from "react-toastify";
import Glyph from "~/components/shared/Glyph";
import { useUser } from "reactfire";
import { getDayMockCall, getDaysMockCall, setDayMockCall } from "~/api/mock";

type DiaryContextProps = {
  day: TDay | null;
  days: TDay[] | null;
  queryDate?: string;
  isDayEditable?(): boolean;
  makeDayMutation?(data: Partial<TDay>): void;
};

export const DiaryProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  // Retrieve date from URL params
  const { date: paramsDate } = useParams();

  const { data: userData } = useUser() || {};
  const { isAnonymous } = { ...userData };

  const isParamsDateValid =
    dayjs(`${paramsDate}`, "D-MM-YY").isValid() &&
    dayjs(`${paramsDate}`, "D-MM-YY").isBefore(dayjs()) &&
    paramsDate;

  const isAnonymousParamsDateValid =
    paramsDate && dayjs(`${paramsDate}`, "D-MM-YY").isValid();

  const queryDate =
    isAnonymous && isAnonymousParamsDateValid
      ? paramsDate
      : isParamsDateValid
        ? paramsDate
        : dayjs().format("D-MM-YY");

  /**
   * Fetch all days collection
   */

  const { data: daysData } = useQuery(["diary"], async () => {
    const { error, message, data } = isAnonymous
      ? await getDaysMockCall()
      : await getDaysAPICall();

    error &&
      toast.error(message, {
        toastId: "apiDaysError",
        position: toast.POSITION.BOTTOM_CENTER,
        icon: <Glyph code="clock" size={38} />,
        theme: "colored",
        autoClose: false,
      });
    data && toast.dismiss("apiDaysError");

    return (
      data.sort(
        (a: TDay, b: TDay) =>
          dayjs(b.date, "D-MM-YY").unix() - dayjs(a.date, "D-MM-YY").unix()
      ) || null
    );
  });

  /**
   * Fetch single day resource by request query "date" param
   */
  const { data: dayData } = useQuery(
    ["day", queryDate],
    async () => {
      const { error, message, data } = isAnonymous
        ? await getDayMockCall(queryDate)
        : await getDayAPICall(queryDate);

      error &&
        toast.error(message, {
          toastId: "apiDayError",
          position: toast.POSITION.BOTTOM_CENTER,
          icon: <Glyph code="clock" size={38} />,
          theme: "colored",
          autoClose: false,
        });
      data && toast.dismiss("apiDayError");

      if (daysData?.find((day: TDay) => day?.id !== data?.id)) {
        // await queryClient.setQueryData(["diary"], [...daysData, data]);
        await queryClient.invalidateQueries(["diary"]);
      }

      return data || null;
    },
    { retry: 2000 }
  );

  /**
   * Update / Create day resource
   */
  const dayMutation = useMutation(
    async (dayData: TDay) =>
      dayData && isAnonymous ? setDayMockCall(dayData) : setDayAPICall(dayData),
    {
      onMutate: async (updatedDay: TDay) => {
        // Cancel all possible ongoing queries
        await queryClient.cancelQueries(["day", queryDate]);
        await queryClient.cancelQueries(["diary"]);

        // Get snapshot of previous data
        const daysSnapshot = await queryClient.getQueryData(["diary"]);
        const daySnapshot = await queryClient.getQueryData(["day", queryDate]);

        // Optimistic update, instantly reflect changes on UI
        await queryClient.setQueryData(["day", queryDate], updatedDay);
        await queryClient.setQueryData(["diary"], (daysSnapshot: any) => {
          return daysSnapshot.map((daySnapshot: TDay) => {
            if (daySnapshot.date === updatedDay.date) {
              return {
                ...daySnapshot,
                ...updatedDay,
              };
            }
            return daySnapshot;
          });
        });

        return { daySnapshot, daysSnapshot };
      },

      onSettled: (data) => {
        data?.error && console.log(data?.message);
        // queryClient.invalidateQueries(["day", queryDate]).then();
        // queryClient.invalidateQueries(["diary"]).then();
      },

      onError: (error, updatedDay, daysSnapshot) => {
        console.log(error);
        // Rollback the changes using the snapshot
        queryClient.setQueryData(["diary"], daysSnapshot);
      },
    }
  );

  /**
   * Mutation interface, accepts partial day data, and fill it with existing day data
   * @param data: TDay
   */
  const makeDayMutation = useCallback(
    async (data: Partial<TDay>) => {
      await dayMutation.mutate({ ...dayData, ...data });
    },
    [dayData, dayMutation]
  );

  /**
   * Check if day can be edited
   * @return boolean
   */
  function isDayEditable() {
    const currentDayDate = dayData?.date;
    return (
      currentDayDate &&
      dayjs(currentDayDate, "D-MM-YY").isValid() &&
      !dayjs(currentDayDate, "D-MM-YY").isAfter(dayjs()) &&
      !dayjs(currentDayDate, "D-MM-YY").isBefore(dayjs().subtract(14, "days"))
    );
  }

  return (
    <DiaryContext.Provider
      value={{
        days: daysData,
        day: dayData,
        queryDate,
        isDayEditable,
        makeDayMutation,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

const DiaryContext = createContext<DiaryContextProps>({
  day: null,
  days: null,
});

export const useDiaryContext = () => useContext(DiaryContext);
