import React, { FC, useCallback, useState } from "react";
import { Box, Typography, Fade, LinearProgress } from "@mui/material";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";
import getDayLeftPercent from "~/helpers/getDayLeftPercent";
import ColorButton from "~/components/shared/ColorButton";
import DiaryCard from "~/components/shared/Card";
import DateCardSkeleton from "./Skeleton";
import { TDay } from "root/types/day";
import dayjs from "dayjs";

const DateCard: FC = () => {
  const { palette, getColorsFromPalette } = useSettingsContext();
  const { day, days, makeDayMutation } = useDiaryContext();
  const colors = getColorsFromPalette?.(day?.paletteCode);

  const [showColorSelector, setShowColorSelector] = useState(false);

  const getCurrentDayNumberInDiary = () => {
    return (
      days &&
      days
        ?.sort(
          (a: TDay, b: TDay) =>
            dayjs(a.date, "D-MM-YY").unix() - dayjs(b.date, "D-MM-YY").unix()
        )
        .findIndex((d: TDay) => d.date === day?.date)
    );
  };

  const handleColorChange = useCallback(
    (paletteCode: string) => {
      makeDayMutation?.({ paletteCode });
      setShowColorSelector(!showColorSelector);
    },
    [makeDayMutation, showColorSelector]
  );

  const handleSetDayFavorite = (value?: boolean) => {
    makeDayMutation?.({ isFavorite: value || !day?.isFavorite });
  };

  if (!day) {
    return <DateCardSkeleton />;
  }
  return (
    <DiaryCard
      variant="outlined"
      outlineWidth={3}
      colors={colors}
      sx={{
        position: "relative",
        minHeight: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box position="absolute" left={5} top={5}>
        <GlyphButton
          rounded
          code="star"
          size={26}
          variant="transparent"
          iconType={day?.isFavorite ? "solid" : "thin"}
          color={day?.isFavorite ? colors?.main : "#aaa"}
          onClick={() => handleSetDayFavorite()}
        />
      </Box>
      <Box position="absolute" right={10} top={10} display="inline-flex">
        <Fade in={showColorSelector} timeout={{ enter: 500, exit: 500 }}>
          <Box display="inline-flex">
            {palette &&
              Object.keys(palette)?.map((paletteCode) => {
                return (
                  <ColorButton
                    key={`colorSelector_${paletteCode}`}
                    colors={palette[paletteCode]}
                    onClick={() => handleColorChange(paletteCode)}
                    sx={{ marginRight: 1 }}
                  />
                );
              })}
          </Box>
        </Fade>

        <ColorButton
          colors={colors}
          onClick={() => setShowColorSelector(!showColorSelector)}
          selected={showColorSelector}
        />
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

          <Box sx={{ width: "100%" }}>
            {dayjs(day?.date, "D-MM-YY").isToday() && (
              <LinearProgress
                variant="determinate"
                value={getDayLeftPercent()}
                sx={{
                  "&.MuiLinearProgress-root": {
                    bgcolor: "#efefef",
                  },
                  ".MuiLinearProgress-bar": {
                    bgcolor: colors?.main,
                  },
                }}
              />
            )}
          </Box>
          <Typography variant="h3" sx={{ marginTop: 1 }} fontSize={25}>
            September
          </Typography>
        </Box>
        <Box position="absolute" right={10} bottom={10}>
          <Typography variant="h1" fontSize={30} color="#eee" fontWeight={100}>
            day #{getCurrentDayNumberInDiary()}
          </Typography>
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DateCard;
