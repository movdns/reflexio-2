import { createTheme } from "@mui/material/styles";
import palette from "./palette";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      contrastText: "white",
      main: "#44bb68",
    },
    background: { default: "#F9FAFC" },
  },
  components: {
    MuiCard: {
      variants: [
        {
          props: { color: "positive" },
          style: {
            background: palette.positive.main,
            color: palette.positive.contrastText,
          },
        },
        {
          props: { color: "negative" },
          style: {
            background: palette.negative.main,
            color: palette.negative.contrastText,
          },
        },
        {
          props: { color: "special" },
          style: {
            background: palette.special.main,
            color: palette.special.contrastText,
          },
        },
        {
          props: { color: "ghost" },
          style: {
            background: "transparent",
            color: "#80808080",
            outline: "1px dashed",
            boxShadow: "none",
          },
        },
        {
          props: { color: "neutral" },
          style: {
            background: palette.neutral.main,
            color: palette.neutral.contrastText,
          },
        },
      ],
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 2,
          "&:last-child": {
            padding: 0,
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "github" },
          style: {
            height: 50,
            fontSize: 20,
            color: "white",
            backgroundColor: "#24292D",
            "&:hover": {
              backgroundColor: "#353e42",
            },
          },
        },
        {
          props: { variant: "google" },
          style: {
            height: 50,
            fontSize: 20,
            color: "white",
            backgroundColor: "#4281E5",
            "&:hover": {
              backgroundColor: "#498eff",
            },
          },
        },
      ],
    },
  },
});

declare module "@mui/material/Card" {
  interface CardPropsVariantOverrides {
    neutral: true;
    positive: true;
    negative: true;
    special: true;
    ghost: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    github: true;
    google: true;
  }
}

export default defaultTheme;
