import React, { FC, useCallback, useState } from "react";
import DiaryCard from "../../../Card";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useDiaryContext } from "../../../../../context/DiaryContext";
import { useSettingsContext } from "../../../../../context/SettingsContext";
import Fade from "@mui/material/Fade";

type DateCardProps = {};

const DateCard: FC<DateCardProps> = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { palette, getColorsFromPalette } = useSettingsContext();
  const colors = getColorsFromPalette?.(day?.paletteCode);

  const [showColorSelector, setShowColorSelector] = useState(false);

  const handleColorChange = useCallback(
    (paletteCode: string) => {
      makeDayMutation?.({ paletteCode });
      setShowColorSelector(!showColorSelector);
    },
    [makeDayMutation, showColorSelector]
  );

  if (!day || !palette) {
    return <DateCardSkeleton />;
  }
  return (
    <DiaryCard
      variant="outlined"
      outlineWidth={4}
      colors={colors}
      sx={{
        position: "relative",
        minHeight: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box position="absolute" right={10} top={10} display="inline-flex">
        <Fade in={showColorSelector} timeout={{ enter: 500, exit: 500 }}>
          <Box>
            {Object.keys(palette).map((paletteCode) => {
              return (
                <Box
                  key={`colorSelector_${paletteCode}`}
                  component={Button}
                  mr={1}
                  minWidth={30}
                  height={30}
                  bgcolor={palette[paletteCode]?.main}
                  borderRadius="50%"
                  sx={{
                    "&:hover": {
                      background: `${palette[paletteCode]?.main}aa`,
                    },
                  }}
                  onClick={() => handleColorChange(paletteCode)}
                />
              );
            })}
          </Box>
        </Fade>

        <Box
          component={Button}
          minWidth={30}
          height={30}
          bgcolor={colors?.main}
          borderRadius="50%"
          sx={{
            color: colors?.contrastText || colors?.secondary,
            "&:hover": {
              background: `${colors?.main}aa`,
            },
            "&:after": {
              display: showColorSelector ? "block" : "none",
              content: '""',
              width: 6,
              height: 6,
              backgroundColor: "white",
              borderRadius: "50%",
            },
          }}
          onClick={() => setShowColorSelector(!showColorSelector)}
        >
          {/*A*/}
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pl={3}
        width="100%"
      >
        <Box>
          <Typography variant="h1" fontSize={50}>
            {dayjs(day?.date, "D-MM-YY").format("D, dddd")}
          </Typography>
          <Typography variant="h3" sx={{ marginTop: 1 }} fontSize={25}>
            September
          </Typography>
        </Box>
        <Box position="absolute" right={10} bottom={10}>
          <Typography variant="h1" fontSize={30} color="#eee" fontWeight={100}>
            Day #14
          </Typography>
        </Box>
      </Box>
    </DiaryCard>
  );
};

export const DateCardSkeleton = () => {
  return (
    <DiaryCard
      variant="outlined"
      outlineWidth={4}
      sx={{
        position: "relative",
        height: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box position="absolute" right={10} top={10} display="inline-flex">
        <Skeleton width={30} height={30} variant="circular" />
      </Box>
      <Box pl={3}>
        <Skeleton width={300} height={100} />
        <Skeleton width={200} height={70} />
      </Box>
    </DiaryCard>
  );
};

export default DateCard;
