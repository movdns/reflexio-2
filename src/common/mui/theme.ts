import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import { deepOrange } from "@mui/material/colors";
import typography from "./typography";
import shadows from "./shadows";

const defaultTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
      xxxl: 1500,
      //lg1280: 1280,
      //  xl: 1536,
    },
  },
  palette: {
    mode: "light",

    primary: {
      main: "#03c9d7",
      light: "#e5fafb",
      dark: "#05b2bd",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fb9678",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00c292",
      dark: "#00964b",
      contrastText: "#ffffff",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
    },
    error: {
      main: "#e46a76",
      dark: "#e45a68",
    },
    warning: {
      main: "#fec90f",
      dark: "#dcb014",
      contrastText: "#ffffff",
    },

    background: {
      default: "#fafbfb",
    },
    // contrastThreshold: 3,
  },

  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          borderWidth: 2,
          borderRadius: 10,
          fontSize: "1.1rem",
          ".MuiAlert-icon": {
            fontSize: "1.6rem",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          background: "transparent",
        },
      },
    },
    MuiCard: {
      variants: [
        {
          props: { color: "positive" },
          style: {
            borderTop: `3px solid ${palette.positive.main}`,
          },
        },
        {
          props: { color: "negative" },
          style: {
            borderTop: `3px solid ${palette.negative.main}`,
          },
        },
        {
          props: { color: "danger" },
          style: {
            borderTop: `3px solid ${palette.danger.main}`,
          },
        },
        {
          props: { color: "special" },
          style: {
            borderTop: `3px solid ${palette.special.main}`,
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
            borderTop: `3px solid ${palette.neutral.main}`,
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
          borderRadius: 20,
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
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: 32,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          width: "100%",
          paddingLeft: 32,
          paddingRight: 32,
          paddingBottom: 32,
          "&:last-child": {
            paddingBottom: 32,
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          marginBottom: 10,
          borderRadius: "9px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 40,
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            [`& fieldset`]: {
              borderRadius: 10,
            },
          },
        },
      ],
    },
    MuiChip: {
      styleOverrides: {
        icon: {
          marginLeft: 8,
          marginTop: 3,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 8,

          "&:hover": {
            boxShadow: "none",
          },
        },
      },
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
            "&:disabled": {
              opacity: 0.4,
              color: "white",
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
            "&:disabled": {
              opacity: 0.4,
              color: "white",
            },
          },
        },
        {
          props: { variant: "demo" },
          style: {
            height: 50,
            fontSize: 20,
            color: "#442146",
            backgroundColor: "#f4ac41",
            "&:hover": {
              backgroundColor: "#f4ac4180",
            },
          },
        },
      ],
    },
    MuiCheckbox: {
      variants: [
        {
          props: { size: "medium" },
          style: {
            marginRight: 8,
            ".MuiSvgIcon-root": {
              width: "1.2em",
              height: "1.2em",
            },
          },
        },
      ],
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          marginBottom: 12,
          ".MuiListItemButton-root": {
            marginBottom: 0,
          },
          ".MuiListItemSecondaryAction-root": {
            right: 10,
          },
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            opacity: 1,
          },
        },
      },
    },
  },
  typography,
  shadows,
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    xxxl: true;
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
    danger: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    github: true;
    google: true;
    demo: true;
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
