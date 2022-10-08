import { createContext, useContext, FC, ReactNode, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserSettingsAPICall, setUserSettingsAPICall } from "../api";
import { TSettings } from "../../functions/src/user/types";
import { useThemeContext } from "./ThemeContext";
import { TTUserSettingsPaletteData } from "../types";
import theme from "@mui/material/styles";
import palette from "../common/palette";

type SettingsContextProps = {
  palette: any;

  mood?: any;
  sentiments?: any;

  glyphs?: any;
  tags?: any;
  getColorsFromPalette?: (paletteCode: string | undefined) => {
    main: string;
    secondary: string;
    contrastText?: string;
  } | null;
  setThemeColorsByPalette?: (code: string | undefined) => void;
  getMainColorFromPalette?: (code: string | undefined) => void;
  makeUserSettingsMutation?: (data: any) => void;
  updatePalette?: (data: Pick<TSettings, "palette">) => void;
};

type SettingsProviderProps = {
  children?: ReactNode;
};

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const { setThemeColors } = useThemeContext();

  /**
   * Fetch user settings
   */
  const { data: userSettings } = useQuery(["settings"], async () => {
    const response = await getUserSettingsAPICall();
    response.error &&
      console.log("getUserSettingsAPICall error: ", response.message);

    response.data.glyphs =
      response.data?.glyphs &&
      sortNestedObjectByField(response.data.glyphs, "order");

    return response.data;
  });

  const sortNestedObjectByField = (
    obj: any,
    field: string,
    toArray?: false
  ) => {
    const sorted = Object.keys(obj).sort((a: any, b: any) => {
      return typeof obj[a].order === "undefined" &&
        typeof obj[b].order === "undefined"
        ? 0
        : typeof obj[a].order === "undefined"
        ? 1
        : typeof obj[b].order === "undefined"
        ? -1
        : obj[a].order - obj[b].order;
    });

    if (toArray) {
      return sorted.map((key) => {
        return obj[key];
      });
    }

    let sortedObj: { [key: string]: {} } = {};
    sorted.forEach((key: string) => {
      sortedObj[key] = obj[key];
    });

    return sortedObj;
  };

  const userSettingsMutation = useMutation(
    async (newData: TSettings) => newData && setUserSettingsAPICall(newData),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onSettled: (data) => {
        data?.error && console.log(data?.message);
      },

      onError: (error, updatedDay) => {
        console.log(error);
      },
    }
  );

  const makeUserSettingsMutation = useCallback(
    async (data: Partial<TSettings>) => {
      console.log(data);
      await userSettingsMutation.mutate({ ...userSettings, data });
    },
    [userSettings, userSettingsMutation]
  );

  const updatePalette = useCallback(
    async (data: Pick<TSettings, "palette">) => {
      console.log(userSettings);
      await userSettingsMutation.mutate({ ...userSettings, palette: data });
    },
    [userSettings, userSettingsMutation]
  );

  const getColorsFromPalette = useCallback(
    (paletteCode: string | undefined): TTUserSettingsPaletteData => {
      if (paletteCode && userSettings?.palette?.[paletteCode]) {
        console.log(userSettings?.palette?.[paletteCode]);
        return {
          ...userSettings?.palette?.[paletteCode],
          contrastText:
            userSettings?.palette[paletteCode]?.contrastText || "white",
        };
      } else {
        return {
          main: palette.neutral.main,
          secondary: palette.neutral.contrastText,
          contrastText: palette.neutral.contrastText,
        };
      }
    },
    [userSettings?.palette]
  );

  const getMainColorFromPalette = (code: string | undefined) => {
    if (code && userSettings?.palette?.[code]) {
      return userSettings?.palette[code]?.main;
    } else {
      return null;
    }
  };

  const setThemeColorsByPalette = useCallback(
    (code: string | undefined) => {
      if (code && userSettings?.palette?.[code]) {
        const colors = getColorsFromPalette?.(code || "neutral");
        colors?.main &&
          setThemeColors?.({ main: colors.main, secondary: colors.secondary });
        return userSettings?.palette[code]?.main;
      }
      return null;
    },
    [getColorsFromPalette, setThemeColors, userSettings?.palette]
  );

  // const sortGlyphsByOrder = useCallback((data: any) => {
  //   return Object.keys(data)
  //     .sort((a, b) => {
  //       return data[a]?.order - data[b]?.order;
  //     })
  //     .map((key) => {
  //       return data[key];
  //     });
  // }, []);

  return (
    <SettingsContext.Provider
      value={{
        palette: userSettings?.palette,
        mood: userSettings?.mood,
        sentiments: userSettings?.sentiments,

        glyphs: userSettings?.glyphs,
        tags: userSettings?.tags,

        getColorsFromPalette,
        setThemeColorsByPalette,
        getMainColorFromPalette,
        updatePalette,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const SettingsContext = createContext<SettingsContextProps>({
  palette: null,
  mood: null,
  sentiments: null,
  glyphs: null,
  tags: null,
});

export const useSettingsContext = () => useContext(SettingsContext);
