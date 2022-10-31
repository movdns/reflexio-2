import React, { ReactNode, FC } from "react";
import { TTUserSettingsPaletteData } from "root/types/userSettings";
import { Box, Card, BoxProps, SxProps } from "@mui/material";

type DiaryCardProps = {
  children: ReactNode;
  colors?: TTUserSettingsPaletteData;
  variant?: "filled" | "outlined";
  outlineWidth?: number;
  minHeight?: number;
  boxProps?: BoxProps;
  sx?: SxProps;
};

const DiaryCard: FC<DiaryCardProps> = ({
  children,
  colors,
  variant,
  outlineWidth,
  minHeight,
  sx,
  boxProps,
}) => {
  return (
    <Card
      sx={{
        border:
          variant === "outlined"
            ? `${outlineWidth || 2}px solid ${colors?.main || "#bebebe"}`
            : "none",
        backgroundColor: variant === "filled" ? colors?.main : "white",
        minHeight: minHeight,
        ...sx,
      }}
    >
      <Box p={3} {...boxProps}>
        {children}
      </Box>
    </Card>
  );
};

export default DiaryCard;
