import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import fillWithEmptyDates from "./helpers/fillWithEmptyDates";
import { useAuth } from "reactfire";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDayAPICall, getDaysAPICall, setDayAPICall } from "../api";
import generateDay from "./helpers/generateDay";
import { TDay } from "../types";

type DiaryContextProps = {
  day: TDay | null;
  days: TDay[] | null;
  isToday?: boolean;
  makeDayMutation?(data: Partial<TDay>): void;
  isDayEditable?(): boolean;
};

type DiaryProviderProps = {
  children?: ReactNode;
};

export const DiaryProvider: FC<DiaryProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // Retrieve date from URL params
  const { date: paramsDate } = useParams();
  const isParamsDateValid =
    dayjs(`${paramsDate}`, "D-MM-YY").isValid() &&
    dayjs(`${paramsDate}`, "D-MM-YY").isBefore(dayjs()) &&
    paramsDate;

  // If date validation failed, redirect to today
  const navigate = useNavigate();
  !isParamsDateValid &&
    navigate({
      pathname: dayjs().format("D-MM-YY"),
    });

  const queryDate = isParamsDateValid ? paramsDate : dayjs().format("D-MM-YY");

  /**
   * Fetch all days collection
   */
  const { data: daysData } = useQuery(["diary"], async () => {
    const response = await getDaysAPICall();
    // @todo error handler
    response.error &&
      console.log("getGlyphsGroupsAPICall error: ", response.message);

    // Fill existing days with "ghost" days (return {date: string})
    return fillWithEmptyDates(response.data);
  });
  //console.log(daysData);
  /**
   * Fetch single day resource by request query "date" param
   */
  const { data: dayData } = useQuery(["day", queryDate], async () => {
    const response = await getDayAPICall(queryDate);
    // @todo error handler
    if (response.error) {
      console.log("getDayAPICall error: ", response.message);
      // If day not exists, generate it (fill with init data) and make mutation request
      return dayMutation.mutate(
        generateDay({
          date: queryDate,
          uid: currentUser?.uid || "",
        })
      );
    }
    return response.data || null;
  });

  /**
   * Update / Create day resource
   */
  const dayMutation = useMutation(
    async (dayData: TDay) => dayData && setDayAPICall(dayData),
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
        await queryClient.setQueryData(["diary"], (oldDays: any) => {
          return oldDays.map((oldDay: TDay) => {
            if (oldDay?.id === updatedDay.id) {
              return {
                ...oldDay,
                ...updatedDay,
              };
            }
            return oldDay;
          });
        });

        return { daySnapshot, daysSnapshot };
      },

      onSettled: (data) => {
        data?.error && console.log(data?.message);
        queryClient.invalidateQueries(["day", queryDate]).then();
        queryClient.invalidateQueries(["diary"]).then();
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

  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    if (queryDate === dayjs().format("D-MM-YY")) {
      setIsToday(true);
    }
  }, [queryDate]);

  /**
   * Check if day can be edit
   * @return boolean
   */
  function isDayEditable() {
    const dayDateUnix = dayjs(dayData?.date, "DD-MM-YY").unix();
    const agoDateUnix = dayjs().subtract(7, "days").unix();
    return dayDateUnix > agoDateUnix;
  }

  return (
    <DiaryContext.Provider
      value={{
        days: daysData,
        day: dayData,
        makeDayMutation,
        isToday,
        isDayEditable,
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
