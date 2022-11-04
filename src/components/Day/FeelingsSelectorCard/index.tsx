import React, { FC } from "react";
import { Box, Rating, Typography, Slider, useMediaQuery } from "@mui/material";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import ColorButton from "~/components/shared/ColorButton";
import getTypeByScore from "~/helpers/getTypeByScore";
import DayFeelingsSelectorSkeleton from "./Skeleton";
import DiaryCard from "~/components/shared/Card";
import Glyph from "~/components/shared/Glyph";
import ColorSlider from "~/components/shared/ColorSlider";

const DayFeelingsSelectorCard: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { getColorsFromPalette } = useSettingsContext();

  const xs = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

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

  const { main: healthColor } =
    getColorsFromPalette?.(getTypeByScore(health)) || {};

  const { main: motivationColor } =
    getColorsFromPalette?.(getTypeByScore(motivation)) || {};

  if (!day) {
    return <DayFeelingsSelectorSkeleton />;
  }

  return (
    <DiaryCard
      colors={colors}
      sx={{
        position: "relative",
      }}
      boxProps={{ p: { xs: 3 } }}
    >
      {!xs && (
        <Box position="absolute" right={10} top={10}>
          <ColorButton colors={colors} outlined>
            <Typography
              variant="subtitle1"
              fontWeight={100}
              fontSize="0.7rem"
              color={colors?.main}
            >
              {calculateAvgScore()}
            </Typography>
          </ColorButton>
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height={{ xs: "auto", md: 150 }}
      >
        <Box width="100%">
          <Box
            display="flex"
            flexDirection={xs ? "row" : "column"}
            alignItems="baseline"
          >
            <Typography
              variant="subtitle1"
              color="#777e89"
              fontWeight={100}
              pr={1}
              fontSize={{ xs: "1.3rem", sm: "1rem" }}
            >
              Health:
            </Typography>

            <Rating
              disabled={xs}
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
                  <Glyph
                    code="heart"
                    iconType="thin"
                    size={xs ? 20 : 38}
                    fullWidth
                    color={xs ? "transparent" : "inherit"}
                  />
                </Box>
              }
              icon={
                <Box>
                  <Glyph
                    code="heart"
                    iconType="solid"
                    size={xs ? 20 : 38}
                    fullWidth
                  />
                </Box>
              }
            />
          </Box>

          {xs && (
            <ColorSlider
              colors={getColorsFromPalette?.(getTypeByScore(health))}
              aria-label="Temperature"
              value={health ? health / 2 : 2.5}
              onChange={(event, value) =>
                value && handleRatingChange(Number(value) * 2, "health")
              }
              marks={[
                {
                  value: 1,
                },
                {
                  value: 1.5,
                },
                {
                  value: 2,
                },
                {
                  value: 2.5,
                },
                {
                  value: 3,
                },
                {
                  value: 3.5,
                },
                {
                  value: 4,
                },
                {
                  value: 4.5,
                },
              ]}
              step={0.5}
              min={0.5}
              max={5}
            />
          )}
        </Box>

        <Box width="100%">
          <Box
            display="flex"
            flexDirection={xs ? "row" : "column"}
            alignItems="baseline"
          >
            <Typography
              variant="subtitle1"
              color="#777e89"
              fontWeight={100}
              pr={1}
              fontSize={{ xs: "1.3rem", sm: "1rem" }}
            >
              Energy:
            </Typography>

            <Rating
              disabled={xs}
              sx={{
                "& .Mui-disabled": {
                  opacity: 1,
                },

                "& .MuiRating-iconFilled": {
                  color: motivationColor,
                },
                "& .MuiRating-iconHover": {
                  color: motivationColor,
                },
              }}
              max={5}
              value={motivation ? motivation / 2 : 2.5}
              onChange={(event, value) =>
                value && handleRatingChange(value * 2, "motivation")
              }
              precision={0.5}
              emptyIcon={
                <Box>
                  <Glyph
                    code="bolt"
                    iconType="thin"
                    size={xs ? 20 : 38}
                    fullWidth
                    color={xs ? "transparent" : "inherit"}
                  />
                </Box>
              }
              icon={
                <Box>
                  <Glyph
                    code="bolt"
                    iconType="solid"
                    size={xs ? 20 : 38}
                    fullWidth
                  />
                </Box>
              }
            />
          </Box>

          {xs && (
            <ColorSlider
              colors={getColorsFromPalette?.(getTypeByScore(motivation))}
              aria-label="Temperature"
              defaultValue={3}
              valueLabelDisplay="auto"
              step={0.5}
              min={0.5}
              max={5}
              marks
              value={motivation ? motivation / 2 : 2.5}
              onChange={(event, value) =>
                value && handleRatingChange(Number(value) * 2, "motivation")
              }
            />
          )}
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DayFeelingsSelectorCard;
