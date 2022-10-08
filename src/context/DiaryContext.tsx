import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
// import fillWithEmptyDates from "./helpers/fillWithEmptyDates";
import { useAuth } from "reactfire";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDayAPICall, getDaysAPICall, setDayAPICall } from "../api";
import generateDay from "./helpers/generateDay";
import { TDay } from "../types";
// import { useThemeContext } from "./ThemeContext";
// import getDayColorationByScore from "./helpers/getDayColorationByScore";
// import { getContrastColorByType, getMainColorByType } from "../common/palette";
// import { useSettingsContext } from "./SettingsContext";

type DiaryContextProps = {
  day: TDay | null;
  days: TDay[] | null;
  isSelectedDay?: boolean;
  queryDate?: string;
  makeDayMutation?(data: Partial<TDay>): void;
  setDescription?: (data: any) => void;
  isDayEditable?(): boolean;
  dayPalette?: {
    main: string;
    secondary: string;
  } | null;
};

type DiaryProviderProps = {
  children?: ReactNode;
};

export const DiaryProvider: FC<DiaryProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  // const { getColorsFromPalette } = useSettingsContext();

  // Retrieve date from URL params
  const { date: paramsDate } = useParams();

  const isParamsDateValid =
    dayjs(`${paramsDate}`, "D-MM-YY").isValid() &&
    dayjs(`${paramsDate}`, "D-MM-YY").isBefore(dayjs()) &&
    paramsDate;

  // If date validation failed, redirect to today
  // const navigate = useNavigate();
  // !isParamsDateValid &&
  //   navigate({
  //     pathname: dayjs().format("D-MM-YY"),
  //   });

  const queryDate = isParamsDateValid ? paramsDate : dayjs().format("D-MM-YY");

  // const { setThemeColorsByPalette, getColorsFromPalette } =
  //   useSettingsContext();

  /**
   * Fetch all days collection
   */
  const { data: daysData } = useQuery(["diary"], async () => {
    const response = await getDaysAPICall();
    // @todo error handler
    response.error &&
      console.log("getGlyphsGroupsAPICall error: ", response.message);

    // Fill existing days with "ghost" days (return {date: string})
    // const filled = fillWithEmptyDates(response.data);
    // console.log(filled);

    return response.data.sort(
      (a: TDay, b: TDay) =>
        dayjs(b.date, "D-MM-YY").unix() - dayjs(a.date, "D-MM-YY").unix()
    );
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
    } else {
      // Apply theme primary coloration by day score
      // response?.data?.score &&
      //   setPrimaryColoration?.(getDayColorationByScore(response.data.score));
    }
    //  const transformed = await transformDayData(response.data);

    // if (response.data?.coloration) {
    //   response.data["palette"] = getColorsFromPalette?.(
    //     response.data.coloration
    //   );
    // }

    return response.data || null;
  });

  // const transformDayData = async (data: TDay): Promise<TDay> => {
  //   if (data?.coloration && getColorsFromPalette) {
  //     data["palette"] = getColorsFromPalette?.(data?.coloration);
  //   }
  //   return data;
  // };

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

  const setDescription = useCallback(
    async (description?: any) => {
      await makeDayMutation({
        description,
      });
    },
    [makeDayMutation]
  );

  // const [dayPalette, setDayPalette] = useState<{
  //   main: string;
  //   secondary: string;
  // } | null>(null);
  //
  // useEffect(() => {
  //   if (dayData?.palette) {
  //     const colors = getColorsFromPalette?.(dayData.coloration);
  //     colors && setDayPalette(colors);
  //     // setThemeColorsByPalette?.(dayData.coloration);
  //   }
  // }, [dayData, getColorsFromPalette, setThemeColorsByPalette]);

  const [isSelectedDay, setIsSelectedDay] = useState(false);

  useEffect(() => {
    if (queryDate === dayjs().format("D-MM-YY")) {
      setIsSelectedDay(true);
    }
  }, [queryDate]);

  /**
   * Check if day can be edited
   * @return boolean
   */
  function isDayEditable() {
    // const dayDateUnix = dayjs(dayData?.date, "DD-MM-YY").unix();
    // const agoDateUnix = dayjs().subtract(7, "days").unix();
    // return dayDateUnix > agoDateUnix;
    return true;
  }

  return (
    <DiaryContext.Provider
      value={{
        days: daysData,
        day: dayData,

        makeDayMutation,
        isSelectedDay,
        queryDate,
        isDayEditable,
        setDescription,
        //dayPalette,
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
