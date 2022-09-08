// import { grey } from "@mui/material/colors";

import { TColoration } from "../types";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    positive: Palette["primary"];
    negative: Palette["primary"];
    special: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    positive?: PaletteOptions["primary"];
    negative?: PaletteOptions["primary"];
    special?: PaletteOptions["primary"];
  }
}

const palette = {
  secondary: {
    main: "#1e4a6f",
  },
  ghost: {
    main: "#808080",
    background: "transparent",
    color: "grey",
    outline: "1px dashed",
    boxShadow: "none",
  },
  neutral: {
    // main: '#aec8cf',
    main: "#e4e4e4",
    // contrastText: '#322f3e',
    // contrastText: 'white',
    //  contrastText: '#353444',
    contrastText: "#747E88",
  },
  positive: {
    //main: "#28ddb6",
    main: "#00C292FF",
    // contrastText: '#353444',
    contrastText: "white",
  },
  negative: {
    main: "rgb(228, 106, 118)",
    // contrastText: '#353444',
    contrastText: "white",
  },
  danger: {
    // main: '#aec8cf',
    main: "rgb(251, 150, 120)",
    // contrastText: '#322f3e',
    // contrastText: 'white',
    //  contrastText: '#353444',
    contrastText: "white",
  },
  special: {
    // main: '#07a9d2',

    // main: "#0b89d7",
    main: "rgb(3, 201, 215)",
    contrastText: "white",
    // contrastText: '#353444',
    // contrastText: "#1E1C07",
  },
  // text1: {
  //   light: 'blue',
  //   main: 'red',
  //   dark: 'green',
  //   contrastText: 'violet',
  // },
  contrastThreshold: 3,
};

export const getMainColorByType = (type: TColoration): string =>
  palette[type].main;

export const getContrastColorByType = (
  type: "negative" | "danger" | "neutral" | "positive" | "special"
): string => palette[type].contrastText;

export default palette;
