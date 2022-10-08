import React, { FC } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Glyph from "../../../Glyph";
import SkeletonCard from "../SkeletonCard";
import GlyphButton from "../../../Glyph/GlyphButton";
import dayjs from "dayjs";
import { useDiaryContext } from "../../../../context/DiaryContext";
import { useSettingsContext } from "../../../../context/SettingsContext";
import { TDay } from "../../../../types";

const DayDateCard: FC = () => {
  const { day, days, makeDayMutation } = useDiaryContext();
  const { getColorsFromPalette } = useSettingsContext();

  const { date, isFavorite, paletteCode } = day || {};
  const colors = getColorsFromPalette?.(paletteCode);

  const setIsFavorite = async (value?: boolean) => {
    await makeDayMutation?.({
      isFavorite: value || !isFavorite,
    });
  };

  const getCurrentDayNumberInDiary = () => {
    return (
      date &&
      days &&
      days
        .sort(
          (a: TDay, b: TDay) =>
            dayjs(a.date, "D-MM-YY").unix() - dayjs(b.date, "D-MM-YY").unix()
        )
        .findIndex((day) => day.date === date)
    );
  };

  if (!date || !colors) {
    return <SkeletonCard height={170} />;
  }

  return (
    <Card>
      <Box
        p={4}
        minHeight={170}
        position="relative"
        color={colors?.secondary}
        bgcolor={colors?.main}
      >
        <Box>
          <Box display="inline-flex" alignItems="center">
            <Typography fontSize={36}>
              {dayjs(date, "D-MM-YY").format("D, dddd")}
            </Typography>

            <Box ml={1}>
              <GlyphButton onClick={() => setIsFavorite?.()} p={4}>
                <Glyph
                  code="star"
                  color={isFavorite ? "yellow" : colors?.secondary}
                  iconType={isFavorite ? "solid" : "thin"}
                  size={24}
                />
              </GlyphButton>
            </Box>
          </Box>
          <Typography fontSize={30}>
            {dayjs(date, "D-MM-YY").format("MMMM")}
          </Typography>
        </Box>

        <Box position="absolute" right={30} top={40} sx={{ opacity: 0.1 }}>
          <Typography fontSize={30}>
            Day #{getCurrentDayNumberInDiary()}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default DayDateCard;
