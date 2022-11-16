import React, { FC, useCallback, useEffect, useState } from "react";
import { Box, Rating, Typography } from "@mui/material";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import genSliderMarks from "~/components/shared/ColorSlider/helpers/genSliderMarks";
import getTypeByScore from "~/helpers/getTypeByScore";
import useDebounce from "~/hooks/useDebounce";
import ColorSlider from "~/components/shared/ColorSlider";
import DiaryCard from "~/components/shared/Card";
import Glyph from "~/components/shared/Glyph";
import DayFeelingsSelectorSkeleton from "./Skeleton";
import useStateWithDep from "~/hooks/useStateWithDep";
import hash from "object-hash";

const DayFeelingsSelectorCard: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { getColorsFromPalette } = useSettingsContext();

  const { metrics } = { ...day };
  const { score: dayScore } = { ...metrics };
  // const { health, motivation } = { ...dayScore };

  const [feelingsState, setFeelingsState] = useStateWithDep(dayScore);
  const debouncedFeelingsState = useDebounce(feelingsState, 2000);

  const handleChangeFeelingsState = (value: any) => {
    setFeelingsState((prev) => ({ ...prev, ...value }));
  };

  const ratingMutation = useCallback(
    (data: any) => {
      makeDayMutation?.({
        metrics: {
          ...day?.metrics,
          score: { ...day?.metrics?.score, ...data },
        },
      });
    },
    [day?.metrics, makeDayMutation]
  );

  useEffect(() => {
    debouncedFeelingsState &&
      dayScore &&
      hash(dayScore) !== hash(debouncedFeelingsState) &&
      ratingMutation(debouncedFeelingsState);
  }, [debouncedFeelingsState, ratingMutation, dayScore]);

  // useEffect(() => {
  //   if (
  //     (debouncedMoodState && debouncedMoodState?.health !== health) ||
  //     debouncedMoodState?.motivation !== motivation
  //   ) {
  //     ratingMutation(debouncedMoodState);
  //   }
  // }, [debouncedMoodState, health, motivation, ratingMutation, feelingsState]);

  const { main: healthColor } =
    getColorsFromPalette?.(getTypeByScore(feelingsState?.health)) || {};

  const { main: motivationColor } =
    getColorsFromPalette?.(getTypeByScore(feelingsState?.motivation)) || {};

  if (!day || !dayScore?.health || !dayScore?.motivation) {
    return <DayFeelingsSelectorSkeleton />;
  }

  return (
    <DiaryCard
      sx={{
        position: "relative",
      }}
      boxProps={{ p: { xs: 3 } }}
    >
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height={{ xs: "auto" }}
      >
        <Box width="100%">
          <Box display="flex" flexDirection="row" alignItems="baseline">
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
              disabled
              sx={{
                "& .MuiRating-iconFilled": {
                  color: healthColor,
                },
                "& .MuiRating-iconHover": {
                  color: healthColor,
                },
              }}
              max={5}
              value={feelingsState?.health || 2.5}
              onChange={(event, value) =>
                value && handleChangeFeelingsState({ health: value })
              }
              precision={0.5}
              emptyIcon={
                <Box>
                  <Glyph
                    code="heart"
                    iconType="thin"
                    size={20}
                    fullWidth
                    color="transparent"
                  />
                </Box>
              }
              icon={
                <Box>
                  <Glyph code="heart" iconType="solid" size={20} fullWidth />
                </Box>
              }
            />
          </Box>

          <ColorSlider
            colors={getColorsFromPalette?.(
              getTypeByScore(feelingsState?.health)
            )}
            aria-label="Health"
            valueLabelDisplay="auto"
            marks={genSliderMarks(0.5, 5, 0.5)}
            value={feelingsState?.health || 2.5}
            onChange={(event, value) =>
              value && handleChangeFeelingsState({ health: Number(value) })
            }
            step={0.5}
            min={0.5}
            max={5}
          />
        </Box>

        <Box width="100%">
          <Box display="flex" flexDirection="row" alignItems="baseline">
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
              disabled
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
              value={feelingsState?.motivation || 2.5}
              onChange={(event, value) =>
                value &&
                handleChangeFeelingsState({ motivation: Number(value) })
              }
              precision={0.5}
              emptyIcon={
                <Box>
                  <Glyph
                    code="bolt"
                    iconType="thin"
                    size={20}
                    fullWidth
                    color="transparent"
                  />
                </Box>
              }
              icon={
                <Box>
                  <Glyph code="bolt" iconType="solid" size={20} fullWidth />
                </Box>
              }
            />
          </Box>

          <ColorSlider
            colors={getColorsFromPalette?.(
              getTypeByScore(feelingsState?.motivation)
            )}
            aria-label="Motivation"
            valueLabelDisplay="auto"
            step={0.5}
            min={0.5}
            max={5}
            marks={genSliderMarks(0.5, 5, 0.5)}
            value={feelingsState?.motivation || 2.5}
            onChange={(event, value) =>
              value && handleChangeFeelingsState({ motivation: Number(value) })
            }
          />
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DayFeelingsSelectorCard;
