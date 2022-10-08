import React, { FC, ReactNode } from "react";
import { Box, Button, SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { TTUserSettingsPaletteData } from "../../../types";

type ColorButtonProps = {
  children?: ReactNode;
  colors?: TTUserSettingsPaletteData;
  selected?: boolean;
  disabled?: boolean;
  sx?: SxProps;
  onClick?: () => void;
};

const StyledColorButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "colors" && prop !== "myProp",
})<Pick<ColorButtonProps, "colors" | "selected">>(
  ({ theme, colors, selected }) => ({
    background: colors?.main,
    bgcolor: "red",
    minWidth: 30,
    minHeight: 30,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "space-between",
    borderRadius: 10,

    "&:hover": {
      background: `${colors?.main}aa`,
    },
    "&:after": {
      display: selected ? "block" : "none",
      content: '""',
      width: 6,
      height: 6,
      backgroundColor: "white",
      borderRadius: 2,
    },
    ".MuiTouchRipple-child": {
      backgroundColor: "white",
    },
  })
);

const ColorButton: FC<ColorButtonProps> = ({
  children,
  sx,
  colors,
  selected,
  disabled,
  onClick,
}) => {
  return (
    <StyledColorButton
      colors={colors}
      sx={sx}
      selected={selected}
      disabled={disabled}
      onClick={onClick}
    >
      <Box color={colors?.contrastText || "inherit"}>{children}</Box>
    </StyledColorButton>
  );
};

export default ColorButton;
