import React, { useContext, useState, useMemo, FC, createContext } from "react";
import {
  PaletteMode,
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import defaultTheme from "../common/mui/theme";

type ThemeContextProps = {
  mode: PaletteMode;
  toggleMode?: () => void;
  setThemeColors?: ({
    main,
    secondary,
  }: {
    main: string;
    secondary: string;
  }) => void;
};

type ThemeProviderProps = {
  children: any;
};

const ThemeContext = createContext<ThemeContextProps>({ mode: "light" });

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const theme = useMemo(
    () =>
      createTheme(
        deepmerge(defaultTheme, {
          palette: {
            mode,
            background: {
              default: mode === "light" ? "#fafbfb" : "#202328", // body
              paper: mode === "light" ? "#fff" : "#33373D ", // cards
            },
          },
        })
      ),
    [mode]
  );

  // const setThemeColors = useCallback(
  //   ({ main, secondary }: { main: string; secondary: string }) => {
  //     setPrimary(main);
  //     setContrastTextColor(secondary);
  //   },
  //   []
  // );

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        //setThemeColors,
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
