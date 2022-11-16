import React, {
  useContext,
  useState,
  useMemo,
  FC,
  createContext,
  useCallback,
} from "react";
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
    main?: string;
    secondary?: string;
    contrastText?: string;
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

  const [primary, setPrimary] = useState<any>(
    defaultTheme.palette.primary.main
  );
  const [contrastText, setContrastText] = useState<any>(
    defaultTheme.palette.primary.contrastText
  );

  const setPrimaryColor = (color: string) => {
    setPrimary(color);
  };

  const theme = useMemo(
    () =>
      createTheme(
        deepmerge(defaultTheme, {
          palette: {
            mode,
            primary: { main: primary, contrastText: contrastText },
            background: {
              default: mode === "light" ? "#fafbfb" : "#202328", // body
              paper: mode === "light" ? "#fff" : "#33373D ", // cards
            },
          },
        })
      ),
    [contrastText, mode, primary]
  );

  const setThemeColors = useCallback(
    ({
      main,
      secondary,
      contrastText,
    }: {
      main?: string;
      secondary?: string;
      contrastText?: string;
    }) => {
      main && setPrimary(main);
      contrastText && setContrastText(contrastText);
    },
    []
  );

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        setThemeColors,
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
