import React, { ReactNode, FC } from "react";
import { TTUserSettingsPaletteData } from "root/types/userSettings";
import { Box, Card, SxProps, BoxProps } from "@mui/material";

type DiaryCardProps = {
  children: ReactNode;
  colors?: TTUserSettingsPaletteData;
  variant?: string;
  outlineWidth?: number;
  boxProps?: BoxProps;
  sx?: SxProps;
  minHeight?: string | number;
};

const DiaryCard: FC<DiaryCardProps> = ({
  children,
  colors,
  variant,
  outlineWidth,
  minHeight,
  boxProps,
  sx,
}) => {
  return (
    <Card
      sx={{
        border:
          variant === "outlined"
            ? `${outlineWidth || 2}px solid ${colors?.main || "#bebebe"}`
            : "none",
        backgroundColor: variant === "filled" ? colors?.main : "white",
        color: colors?.secondary || colors?.contrastText,
        minHeight: minHeight,
        boxShadow: variant === "shadow" && `0 0 8px 3px ${colors?.main}`,
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
