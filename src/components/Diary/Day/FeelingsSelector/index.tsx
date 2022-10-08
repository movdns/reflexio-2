import React, { FC } from "react";
import { Box, Rating, Skeleton, Typography } from "@mui/material";
import Glyph from "../../../Glyph";
import { styled } from "@mui/material/styles";

import { useDiaryContext } from "../../../../context/DiaryContext";
import SkeletonCard from "../../Card/SkeletonCard";
import DiaryCard from "../../Card";
import { getTypeByScore } from "../Summary";
import { useSettingsContext } from "../../../../context/SettingsContext";
import ColorButton from "../../../shared/ColorButton";

const DayFeelingsSelector: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { getColorsFromPalette } = useSettingsContext();

  const { score } = day || {};

  const handleRatingChange = (
    value: number,
    type: "general" | "mood" | "motivation" | "health"
  ) => {
    value &&
      makeDayMutation?.({
        score: {
          ...score,
          [type]: value,
        },
      });
  };
  const calculateAvgScore = () => {
    const exclude = ["general", "mood"];

    if (score) {
      const scoreKeys = Object.keys(score).filter(
        (scoreCode) => !exclude.includes(scoreCode)
      );
      const scoreValues = scoreKeys.map((scoreKey) => score[scoreKey]);

      const total = scoreValues.reduce((p, n) => p + n, 0);
      return Math.round((total / scoreKeys.length) * 1e1) / 1e1;
    }
  };

  const colors = getColorsFromPalette?.(getTypeByScore(calculateAvgScore()));

  if (!day) {
    return <DayFeelingsSelectorSkeleton />;
  }

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
            <HealthRating
              max={5}
              value={score?.health ? score.health / 2 : 2.5}
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
            <MotivationRating
              precision={0.5}
              value={score?.motivation ? score.motivation / 2 : 2.5}
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

const DayFeelingsSelectorSkeleton = () => (
  <DiaryCard variant="outlined">
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
        <Skeleton width={100} height={30} />
        <Box pt={1}>
          <HealthRating
            disabled
            max={5}
            value={0}
            emptyIcon={
              <Box>
                <Glyph code="ghost" iconType="thin" size={36} fullWidth />
              </Box>
            }
          />
        </Box>
      </Box>

      <Box>
        <Skeleton width={100} height={30} />
        <Box pt={1}>
          <MotivationRating
            disabled
            max={5}
            value={0}
            emptyIcon={
              <Box>
                <Glyph code="ghost" iconType="thin" size={36} fullWidth />
              </Box>
            }
          />
        </Box>
      </Box>
    </Box>
  </DiaryCard>
);

const HealthRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const MotivationRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#03c9d7",
  },
  "& .MuiRating-iconHover": {
    color: "#03a9d7",
  },
});

export default DayFeelingsSelector;
