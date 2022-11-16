import { createContext, useContext, FC, ReactNode, useCallback } from "react";
import { getUserSettingsAPICall } from "~/api";
import { useQuery } from "@tanstack/react-query";
import {
  TTUserSettingsPaletteData,
  TUserSettings,
} from "root/types/userSettings";
import { getUserSettingsMockCall } from "~/api/mock";
import { useUser } from "reactfire";

type SettingsContextProps = TUserSettings & {
  getColorsFromPalette?: (
    paletteCode: string | undefined
  ) => TTUserSettingsPaletteData | null | undefined;
  getMainColorFromPalette?: (code: string | undefined) => void;
  makeUserSettingsMutation?: (data: any) => void;
};

export const SettingsProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const {
    // @ts-ignore
    data: { isAnonymous },
  } = useUser();

  /**
   * Fetch user settings
   */
  const { data: userSettings } = useQuery(["settings"], async () => {
    const { error, data, message } = isAnonymous
      ? await getUserSettingsMockCall()
      : await getUserSettingsAPICall();
    error && console.log("getUserSettingsAPICall error: ", message);

    return data || null;
  });

  // const userSettingsMutation = useMutation(
  //   async (newData: TUserSettings) =>
  //     newData && setUserSettingsAPICall(newData),
  //   {
  //     onSuccess: (data) => {
  //       console.log(data);
  //     },
  //     onSettled: (data) => {
  //       data?.error && console.log(data?.message);
  //     },
  //
  //     onError: (error, updatedDay) => {
  //       console.log(error);
  //     },
  //   }
  // );

  // const makeUserSettingsMutation = useCallback(
  //   async (data: Partial<TUserSettings>) => {
  //     console.log(data);
  //     await userSettingsMutation.mutate({ ...userSettings, data });
  //   },
  //   [userSettings, userSettingsMutation]
  // );

  // const updatePalette = useCallback(
  //   async (data: Pick<TUserSettings, "palette">) => {
  //     console.log(userSettings);
  //     await userSettingsMutation.mutate({ ...userSettings, palette: data });
  //   },
  //   [userSettings, userSettingsMutation]
  // );

  const getColorsFromPalette = useCallback(
    (paletteCode: string | undefined): TTUserSettingsPaletteData => {
      const userPalette =
        userSettings && paletteCode && userSettings?.palette?.[paletteCode];

      if (userPalette) {
        return {
          ...userPalette,
          secondary: userPalette?.secondary || `${userPalette?.main}E3`,
          contrastText: userPalette?.contrastText || "white",
        };
      } else {
        return {
          main: "#aaa",
          secondary: "#ccc",
          contrastText: "white",
        };
      }
    },
    [userSettings]
  );

  const getMainColorFromPalette = useCallback(
    (paletteCode: string | undefined): string => {
      const userPalette =
        userSettings && paletteCode && userSettings?.palette?.[paletteCode];

      return userPalette ? userPalette?.main : "#aaa";
    },
    [userSettings]
  );

  return (
    <SettingsContext.Provider
      value={{
        ...userSettings,
        getColorsFromPalette,
        getMainColorFromPalette,
        // updatePalette,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const SettingsContext = createContext<SettingsContextProps>({
  palette: {},
  mood: {},
  sentiments: {},
});

export const useSettingsContext = () => useContext(SettingsContext);
