import { grey } from "@mui/material/colors";

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
    background: "transparent",
    color: "#80808080",
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
    main: "#28ddb6",
    // contrastText: '#353444',
    contrastText: "white",
  },
  negative: {
    main: "#f36d6a",
    // contrastText: '#353444',
    contrastText: "white",
  },
  special: {
    // main: '#07a9d2',

    // main: "#0b89d7",
    main: "#05CBD6",
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

export default palette;
