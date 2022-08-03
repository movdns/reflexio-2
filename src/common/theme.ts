import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import { deepOrange, green } from "@mui/material/colors";

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      //lg1280: 1280,
      //  xl: 1536,
    },
  },
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
        {
          props: { color: "transparent" },
          style: {
            background: "none",
            boxShadow: "none",
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 10,

          //padding: 5,
          // boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
        },
      },
    },
    MuiPaper: {
      variants: [
        {
          props: { elevation: 1 },
          style: {
            boxShadow: "rgb(90 114 123 / 11%) 0px 7px 30px 0px",
          },
        },
        {
          props: { elevation: 6 },
          style: {
            boxShadow: "rgb(90 114 123 / 50%) 0px 10px 20px 0px",
          },
        },
      ],
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          width: "100%",
          padding: 3,
          "&:last-child": {
            padding: 0,
          },
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          display: "flex",
          height: "100%",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { color: "negative" },
          style: {
            background: palette.negative.main,
            color: palette.negative.contrastText,
            "&:hover": {
              background: deepOrange[300],
            },
          },
        },
        {
          props: { color: "danger" },
          style: {
            background: palette.danger.main,
            color: palette.danger.contrastText,
            "&:hover": {
              background: deepOrange[200],
            },
          },
        },
        {
          props: { color: "neutral" },
          style: {
            background: palette.neutral.main,
            color: palette.neutral.contrastText,
            "&:hover": {
              background: "#eee",
            },
          },
        },
        {
          props: { color: "positive" },
          style: {
            background: palette.positive.main,
            color: palette.positive.contrastText,
            "&:hover": {
              background: "#1ff9ca",
            },
          },
        },
        {
          props: { color: "special" },
          style: {
            background: palette.special.main,
            color: palette.special.contrastText,
            "&:hover": {
              background: "#01DEEA",
            },
          },
        },
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

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    // lg1280: true; // adds the `mobile` breakpoint
    // tablet: true;
    // laptop: true;
    // desktop: true;
  }
}

declare module "@mui/material/Card" {
  interface CardPropsVariantOverrides {
    neutral: true;
    positive: true;
    negative: true;
    special: true;
    ghost: true;
    transparent: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    github: true;
    google: true;
  }
  interface ButtonPropsColorOverrides {
    neutral: true;
    danger: true;
    positive: true;
    negative: true;
    special: true;
  }
}

export default defaultTheme;
