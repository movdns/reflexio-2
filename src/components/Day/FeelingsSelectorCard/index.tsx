import React, { FC } from "react";
import { Box, Rating, Typography } from "@mui/material";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import ColorButton from "~/components/shared/ColorButton";
import getTypeByScore from "~/helpers/getTypeByScore";
import DayFeelingsSelectorSkeleton from "./Skeleton";
import DiaryCard from "~/components/shared/Card";
import Glyph from "~/components/shared/Glyph";

const DayFeelingsSelectorCard: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { getColorsFromPalette } = useSettingsContext();

  const { metrics } = { ...day };
  const { score } = { ...metrics };
  const { health, motivation } = { ...score };

  const handleRatingChange = (
    points: number,
    type: "motivation" | "health"
  ) => {
    points &&
      makeDayMutation?.({
        metrics: {
          ...day?.metrics,
          score: { ...day?.metrics?.score, [type]: points },
        },
      });
  };
  const calculateAvgScore = () => {
    const exclude = ["total", "mood"];

    if (score) {
      const scoreKeys = Object.keys(score).filter(
        (scoreCode) => !exclude.includes(scoreCode)
      );
      // @ts-ignore @TODO fix typing
      const scoreValues = scoreKeys.map((scoreKey) => score[scoreKey]);

      const total = scoreValues.reduce((p, n) => p + n, 0);
      return Math.round((total / scoreKeys.length) * 1e1) / 1e1;
    }
  };

  const colors = getColorsFromPalette?.(getTypeByScore(calculateAvgScore()));

  if (!day) {
    return <DayFeelingsSelectorSkeleton />;
  }

  const { main: healthColor } =
    getColorsFromPalette?.(getTypeByScore(health)) || {};

  const { main: motivationColor } =
    getColorsFromPalette?.(getTypeByScore(motivation)) || {};

  return (
    <DiaryCard colors={colors} sx={{ position: "relative" }}>
      <Box position="absolute" right={10} top={10}>
        <ColorButton colors={colors}>
          <Typography variant="subtitle1" fontWeight={100} fontSize="0.7rem">
            {calculateAvgScore()}
          </Typography>
        </ColorButton>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height={152}
      >
        <Box>
          <Typography variant="subtitle1" color="#777e89" fontWeight={300}>
            Health
          </Typography>
          <Box pt={1}>
            <Rating
              sx={{
                "& .MuiRating-iconFilled": {
                  color: healthColor,
                },
                "& .MuiRating-iconHover": {
                  color: healthColor,
                },
              }}
              max={5}
              value={health ? health / 2 : 2.5}
              onChange={(event, value) =>
                value && handleRatingChange(value * 2, "health")
              }
              precision={0.5}
              emptyIcon={
                <Box>
                  <Glyph code="heart" iconType="thin" size={38} fullWidth />
                </Box>
              }
              icon={
                <Box>
                  <Glyph code="heart" iconType="solid" size={38} fullWidth />
                </Box>
              }
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" color="#777e89" fontWeight={300}>
            Motivation
          </Typography>
          <Box pt={1}>
            <Rating
              sx={{
                "& .MuiRating-iconFilled": {
                  color: motivationColor,
                },
                "& .MuiRating-iconHover": {
                  color: motivationColor,
                },
              }}
              precision={0.5}
              value={motivation ? motivation / 2 : 2.5}
              onChange={(event, value) =>
                value && handleRatingChange(value * 2, "motivation")
              }
              max={5}
              emptyIcon={
                <Box>
                  <Glyph code="bolt" iconType="thin" size={38} fullWidth />
                </Box>
              }
              icon={
                <Box>
                  <Glyph code="bolt" iconType="solid" size={38} fullWidth />
                </Box>
              }
            />
          </Box>
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DayFeelingsSelectorCard;
