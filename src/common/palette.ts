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
    main: grey[500],
  },
  ghost: {
    background: "transparent",
    color: "#80808080",
    outline: "1px dashed",
    boxShadow: "none",
  },
  neutral: {
    // main: '#aec8cf',
    main: "#819da0",
    // contrastText: '#322f3e',
    // contrastText: 'white',
    //  contrastText: '#353444',
    contrastText: "white",
  },
  positive: {
    main: "#16a384",
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
    main: "#0b89d7",
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
