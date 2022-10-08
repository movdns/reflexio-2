import React, { ReactNode, FC } from "react";
import { TTUserSettingsPaletteData } from "../../../types";
import { Box, Card, Typography } from "@mui/material";

type DiaryCardProps = {
  children: ReactNode;
  colors?: TTUserSettingsPaletteData;
  variant?: "filled" | "outlined";
  outlineWidth?: number;
  minHeight?: number;
  sx?: any;
  p?: number;
};

const DiaryCard: FC<DiaryCardProps> = ({
  children,
  colors,
  variant,
  outlineWidth,
  minHeight,
  sx,
  p,
}) => {
  return (
    <Card
      sx={{
        border:
          variant === "outlined"
            ? `${outlineWidth || 2}px solid ${colors?.main || "#bebebe"}90`
            : "none",
        backgroundColor: variant === "filled" ? colors?.main : "white",
        minHeight: minHeight,
        ...sx,
      }}
    >
      <Box p={p || p === 0 ? 0 : 3}>{children}</Box>
    </Card>
  );
};

export default DiaryCard;
