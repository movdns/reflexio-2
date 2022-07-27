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
import { collection, orderBy, query, limit, where } from "firebase/firestore";
import { useAuth, useFirestore } from "reactfire";

import DiarySkeleton from "../components/Diary/Skeleton";
import { useParams } from "react-router-dom";
import firebaseFunctions from "../common/firebase/firebaseFunctions";
import { getFunctions, httpsCallableFromURL } from "firebase/functions";
import axios from "axios";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { getDaysAPICall } from "../api";

type TDay = {
  date: string;
  uid?: string;
  id?: number;
  score?: number;
  description?: {
    blocks: [
      {
        type: string;
        id: number;
        level: number;
        text: string;
      }
    ];
    time: number;
  };
  icons?: string[];
};

type DiaryContextProps = {
  loading: boolean;
  day: TDay | null;
  setDay?(data: TDay): void;
  days: TDay[] | null;
  setDays?(data: any): void;
  today?: TDay | null;
};

const DiaryContext = createContext<DiaryContextProps>({
  loading: true,
  day: {
    date: dayjs().format("D-MM-YY"),
  },
  days: null,
});

export const DiaryProvider = ({ children }: any) => {
  // const queryClient = useQueryClient();

  const { currentUser } = useAuth();
  const firestore = useFirestore();
  const diaryRef = collection(firestore, "days");

  // Server data request
  // const { isLoading: serverLoading, data: serverDays } = useFirestoreQueryData(
  //   ["days"],
  //   query(
  //     diaryRef,
  //     where("uid", "==", currentUser?.uid),
  //     orderBy("date", "desc")
  //   ),
  //   { subscribe: false },
  //   {
  //     onSuccess(data: any) {
  //       console.log("queryDays: ", data);
  //     },
  //     onError(error: any) {
  //       console.log(error);
  //     },
  //   }
  // );

  // Mutations
  // const [serverMutationDenyFlag, setServerMutationDenyFlag] = useState(false);
  // const serverDaysMutation = useFirestoreCollectionMutation(diaryRef, {
  //   merge: true,
  // });

  const [contextLoading, setContextLoading] = useState(true);
  const [currentDayState, setCurrentDayState] = useState<TDay | null>(null);

  const generateDay = useCallback(
    (date: string): TDay | null => {
      if (!dayjs(date, "D-MM-YY").isValid()) {
        return null;
      }
      return {
        uid: currentUser?.uid,
        id: dayjs(date, "D-MM-YY").unix(),
        date: date,
        score: 5,
        description: {
          blocks: [
            {
              type: "header",
              id: dayjs(date, "D-MM-YY").unix(),
              level: 1,
              text: dayjs(date, "D-MM-YY").format("D MMMM, dddd"),
            },
          ],
          time: dayjs(date, "D-MM-YY").unix(),
        },
        icons: ["coffee", "nicotine", "nootropics"],
      };
    },
    [currentUser?.uid]
  );

  // Retrieve date from query
  const { date: queryDate } = useParams();
  const searchDate =
    queryDate && dayjs(`${queryDate}`, "D-MM-YY").isValid()
      ? queryDate
      : dayjs().format("D-MM-YY");

  const { isLoading: serverLoading, data: serverDays } = useQuery(
    ["diary"],
    async () => {
      const data = await getDaysAPICall();
      return !data.error ? data.data : data.message;
    }
  );

  useEffect(() => {
    if (!serverLoading && serverDays) {
      console.log(serverDays);
      // const selectedDay =
      //   serverDays?.find(
      //     (day: any) => day.description && day.date === searchDate
      //   ) || null;
      //
      // if (selectedDay && !currentDayState) {
      //   setCurrentDayState(selectedDay);
      // } else if (!selectedDay && !serverMutationDenyFlag) {
      //   const generatedDay = generateDay(searchDate);
      //   serverDaysMutation.mutate(generatedDay);
      //   serverDaysMutation.isSuccess && setCurrentDayState(generatedDay);
      //   setServerMutationDenyFlag(true);
      // }
      setContextLoading(false);
    }
  }, [
    serverLoading,
    serverDays,
    // serverDaysMutation,
    // serverMutationDenyFlag,
    generateDay,
    searchDate,
    currentDayState,
    contextLoading,
  ]);

  if (contextLoading) {
    return <DiarySkeleton />;
  }

  return (
    <DiaryContext.Provider
      value={{
        loading: contextLoading,
        days: serverDays && hydrateWithEmptyDates(serverDays),
        day: currentDayState,
        today: null,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiaryContext = () => useContext(DiaryContext);
