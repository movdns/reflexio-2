import { TTUserSettingsPaletteData } from "root/types/userSettings";
import { Box, Button, SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { FC, ReactNode } from "react";

type ColorButtonProps = {
  children?: ReactNode;
  colors?: TTUserSettingsPaletteData;
  outlined?: boolean;
  selected?: boolean;
  disabled?: boolean;
  sx?: SxProps;
  onClick?: () => void;
};

const StyledColorButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "colors" && prop !== "outlined",
})<Pick<ColorButtonProps, "colors" | "selected" | "outlined">>(
  ({ colors, selected, outlined }) => ({
    background: outlined ? "transparent" : colors?.main,
    minWidth: 30,
    minHeight: 30,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "space-between",
    borderRadius: 10,
    boxShadow: "0 0 4px 6px white",
    border: `1px solid ${colors?.main || "gray"}`,

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
  outlined,
  onClick,
}) => {
  return (
    <StyledColorButton
      colors={colors}
      selected={selected}
      outlined={outlined}
      disabled={disabled}
      onClick={onClick}
      sx={sx}
    >
      <Box color={colors?.contrastText || "inherit"}>{children}</Box>
    </StyledColorButton>
  );
};

export default ColorButton;
