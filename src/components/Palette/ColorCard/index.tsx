import React, { FC } from "react";
import { Box, Card, CardActionArea, Typography } from "@mui/material";

type ColorCardProps = {
  text?: string;
  subText?: string;
  colors?: { main: string; secondary: string };
  paletteCode: string;
  handleSelect?: (colors: any, paletteCode: string) => void;
};

const ColorCard: FC<ColorCardProps> = ({
  text,
  subText,
  colors,
  handleSelect,
  paletteCode,
}) => {
  return (
    <Box>
      <Card sx={{ background: colors?.main, height: 200 }}>
        <CardActionArea onClick={() => handleSelect?.(colors, paletteCode)}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            color={colors?.secondary}
          >
            <Typography fontSize={40} textTransform="capitalize">
              {text}
            </Typography>
            <Typography fontSize={30}>{subText}</Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default ColorCard;
