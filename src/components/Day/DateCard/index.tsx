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

  const isToday = dayjs(day?.date, "D-MM-YY").isToday();

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
        minHeight: { xs: 0, sm: "200px" },
        display: "flex",
        alignItems: "center",
        height: { xs: 130, sm: 150 },
      }}
    >
      <Box width="100%">
        <Box position="absolute" left={5} top={5} display={{ xs: "none" }}>
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
                      sx={{
                        marginRight: 1,
                      }}
                    />
                  );
                })}
            </Box>
          </Fade>

          <ColorButton
            colors={colors}
            onClick={() => setShowColorSelector(!showColorSelector)}
            selected={showColorSelector}
            sx={{
              boxShadow: "0 0 0 3px #5e3d5720",
            }}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        pl={{ xs: 0, md: 3 }}
        width="100%"
        color="#5e3d57"
      >
        <Box>
          <Typography variant="h1" fontSize={{ xs: 36, md: 40 }}>
            {dayjs(day?.date, "D-MM-YY").format("D, dddd")}
          </Typography>

          <Box sx={{ width: "100%" }}>
            {isToday && (
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
          <Typography
            variant="h3"
            sx={{ marginTop: { xs: 1, sm: 1 } }}
            fontSize={{ xs: 20, sm: 35 }}
          >
            {dayjs(day?.date, "D-MM-YY").format("MMMM")}
          </Typography>
        </Box>
        <Box position="absolute" right={10} bottom={10}>
          <Typography
            variant="h1"
            fontSize={{ xs: 20, sm: 30 }}
            color="#eee"
            fontWeight={100}
          >
            day #{getCurrentDayNumberInDiary()}
          </Typography>
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DateCard;
