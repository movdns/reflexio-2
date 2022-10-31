import { TTUserSettingsPaletteData } from "root/types/userSettings";
import { Box, Button, SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC, ReactNode } from "react";

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
})<Pick<ColorButtonProps, "colors" | "selected">>(({ colors, selected }) => ({
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
}));

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
      selected={selected}
      disabled={disabled}
      onClick={onClick}
      sx={sx}
    >
      <Box color={colors?.contrastText || "inherit"}>{children}</Box>
    </StyledColorButton>
  );
};

export default ColorButton;
