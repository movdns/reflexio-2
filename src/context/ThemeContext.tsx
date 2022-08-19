import React, { createContext, FC, useContext, useState } from "react";
import {
  PaletteMode,
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import defaultTheme from "../common/theme";
import palette from "../common/palette";

type ThemeContextProps = {
  toggleMode?: () => void;
  setPrimaryColor?(color: string): void;
  setPrimaryColoration?(
    coloration: "negative" | "danger" | "neutral" | "positive" | "special"
  ): void;
  mode: PaletteMode;
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

  // const initialColor = '#3db2d9';
  const [primary, setPrimary] = React.useState(palette.positive.main);

  const setPrimaryColor = (color: string) => {
    setPrimary(color);
  };

  const setPrimaryColoration = (
    coloration: "negative" | "danger" | "neutral" | "positive" | "special"
  ) => {
    const color = palette[coloration].main;
    setPrimary(color);
  };

  const theme = React.useMemo(
    () =>
      createTheme(
        deepmerge(defaultTheme, {
          palette: {
            mode,
            primary: { main: primary },
            background: {
              default: mode === "light" ? "#f7f7f7" : "#202328", // body
              paper: mode === "light" ? "#fff" : "#33373D ", // cards
            },
            ...palette,
          },
        })
      ),
    [mode, primary]
  );

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        setPrimaryColor,
        setPrimaryColoration,
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
