export const palette = {
  negative: {
    main: "#EF8799",
    secondary: "#EF879980",
    contrastText: "#ffffff",
  },
  danger: {
    main: "#E99180",
    secondary: "#E9918080",
    contrastText: "#ffffff",
  },
  neutral: {
    main: "#6d92b4",
    secondary: "#6d92b480",
    contrastText: "#ffffff",
  },
  positive: {
    main: "#00C292",
    secondary: "#00C29280",
    contrastText: "#ffffff",
  },
  special: {
    main: "#0DCAD6",
    secondary: "#0DCAD680",
    contrastText: "#ffffff",
  },
  custom1: {
    main: "#358994",
    secondary: "#35899480",
    contrastText: "#ffffff",
  },
};

declare module "@mui/material/styles" {
  interface Palette {
    negative: Palette["primary"];
    danger: Palette["primary"];
    neutral: Palette["primary"];
    positive: Palette["primary"];
    special: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    negative?: PaletteOptions["primary"];
    danger?: PaletteOptions["primary"];
    neutral?: PaletteOptions["primary"];
    positive?: PaletteOptions["primary"];
    special?: PaletteOptions["primary"];
  }
}

// export const getMainColorByType = (type: TColoration): string =>
//   palette[type].main;
//
// export const getContrastColorByType = (type: TColoration): string =>
//   palette[type].contrastText;

export default palette;
