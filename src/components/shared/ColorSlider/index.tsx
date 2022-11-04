import React, { FC } from "react";
import { styled } from "@mui/material/styles";
import { Slider } from "@mui/material";
import { TTUserSettingsPaletteData } from "root/types/userSettings";

type ColorSliderProps = {
  // colors?: string;
  colors?: TTUserSettingsPaletteData;
};

// const ColorSlider: FC<ColorSliderProps> = ({ props }) => {
//   return <StyledSlider {...props} />;
// };

const ColorSlider = styled(Slider, {
  shouldForwardProp: (prop) => prop !== "colors" && prop !== "disabled",
})<ColorSliderProps>(({ theme, colors }) => ({
  color: colors?.main || theme.palette.primary.main,
  borderRadius: 3,
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
    borderRadius: 3,
  },

  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    borderRadius: 8,
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: colors?.main || theme.palette.primary.main,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));

export default ColorSlider;
