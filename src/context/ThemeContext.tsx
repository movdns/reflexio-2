import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";
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
    coloration:
      | "ghost"
      | "negative"
      | "danger"
      | "neutral"
      | "positive"
      | "special"
      | null
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

  const [primary, setPrimary] = useState(palette.neutral.main);
  const [contrastTextColor, setContrastTextColor] = useState(
    palette.neutral.contrastText
  );

  const setPrimaryColor = useCallback((color: string) => {
    setPrimary(color);
  }, []);

  const setPrimaryColoration = useCallback(
    (
      coloration: "negative" | "danger" | "neutral" | "positive" | "special"
    ) => {
      if (coloration === null) {
        return false;
      }
      const color = palette[coloration].main;
      const contrastColor = palette[coloration].contrastText;
      setPrimary(color);
      setContrastTextColor(contrastColor);
    },
    []
  );

  const theme = useMemo(
    () =>
      createTheme(
        deepmerge(defaultTheme, {
          palette: {
            mode,
            primary: { main: primary, contrastText: contrastTextColor },
            background: {
              default: mode === "light" ? "#f7f7f7" : "#202328", // body
              paper: mode === "light" ? "#fff" : "#33373D ", // cards
            },
            ...palette,
          },
        })
      ),
    [contrastTextColor, mode, primary]
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
