import React, { FC, useCallback, useState } from "react";
import { Planet } from "react-planet";
import DayMoodSelectorSkeleton from "~/components/Day/MoodSelectorCard/Skeleton";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";
import ColorButton from "~/components/shared/ColorButton";
import DiaryCard from "~/components/shared/Card";
import { Box, Slider, Typography, useMediaQuery } from "@mui/material";
import Glyph from "~/components/shared/Glyph";
import useWidth from "~/hooks/useWidth";
import ColorSlider from "~/components/shared/ColorSlider";

const DayMoodSelector: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { mood: moodSettings, getColorsFromPalette } = useSettingsContext();
  const { mood } = day || {};

  const [isOpen, setIsOpen] = useState(!!mood?.glyphCode);

  const currentBreakpoint = useWidth();
  const getBreakpointValue = (data: { [key: string]: number }) =>
    Object.keys(data).includes(currentBreakpoint) && data[currentBreakpoint];

  const xs = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const restMoods =
    moodSettings &&
    Object.keys(moodSettings).filter(
      (moodCode) => moodSettings[moodCode]?.glyphCode !== mood?.glyphCode
    );

  const currentMoodCode =
    moodSettings &&
    Object.keys(moodSettings).find(
      (moodCode) => moodSettings[moodCode]?.glyphCode === mood?.glyphCode
    );

  const handlerMoodSelect = useCallback(
    (moodCode: string) => {
      const { score, ...moodData } = moodSettings && {
        ...moodSettings[moodCode],
      };

      moodData &&
        makeDayMutation?.({
          mood: moodData,
          paletteCode: moodCode,
          metrics: {
            ...day?.metrics,
            score: { ...day?.metrics?.score, mood: score },
          },
        });

      setIsOpen(!isOpen);
    },
    [day?.metrics, isOpen, makeDayMutation, moodSettings]
  );

  const selectedMoodColors = getColorsFromPalette?.(mood?.paletteCode);

  if (!day || !moodSettings) {
    return <DayMoodSelectorSkeleton />;
  }

  return (
    <DiaryCard
      sx={{
        overflow: "visible",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: 130, sm: 150 },
      }}
      boxProps={{ width: "100%", p: { xs: 1, sm: 1 } }}
    >
      {!xs && (
        <Box position="absolute" right={10} top={10}>
          <ColorButton colors={selectedMoodColors} disabled outlined>
            <Typography
              variant="subtitle1"
              fontWeight={100}
              fontSize="0.7rem"
              color={selectedMoodColors?.main}
            >
              {currentMoodCode && moodSettings?.[currentMoodCode]?.score}
            </Typography>
          </ColorButton>
        </Box>
      )}

      <Box
        position="relative"
        display="flex"
        justifyContent={{ xs: "center", sm: "space-around" }}
        alignItems="center"
        width="100%"
      >
        <Box width="100%" minWidth={180} order={1} pt={2} px={1}>
          <Typography
            fontSize={mood?.label ? 22 : 20}
            fontWeight={100}
            color="#5e3d57"
          >
            {mood?.label || "Pick your mood"}
          </Typography>

          <ColorSlider
            aria-label="Temperature"
            defaultValue={3}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={5}
            colors={selectedMoodColors}
          />
        </Box>

        <Box
          display="flex"
          minHeight={{ xs: 80, sm: 120 }}
          minWidth={{ xs: 80, sm: 120 }}
        >
          <Planet
            mass={2}
            tension={100}
            friction={20}
            open={isOpen}
            // orbitRadius={(restGlyphs?.length && restGlyphs.length * 30) || 120}
            orbitRadius={
              getBreakpointValue({ xs: 120, sm: 100, md: 130 }) || 90
            }
            hideOrbit
            autoClose
            rotation={xs ? 180 : 0}
            bounceDirection="BOTTOM"
            centerContent={
              <GlyphButton p={2} onClick={() => setIsOpen(!isOpen)}>
                <Glyph
                  code={mood?.glyphCode || "circle-question"}
                  fullWidth
                  size={getBreakpointValue({ xs: 60, sm: 90 }) || 90}
                  iconType="solid"
                  color={mood?.glyphCode ? selectedMoodColors?.main : "#ddd"}
                />
              </GlyphButton>
            }
          >
            {moodSettings &&
              restMoods &&
              restMoods.map((moodCode: string) => {
                const glyphCode = moodSettings?.[moodCode]?.glyphCode;
                const colors = getColorsFromPalette?.(
                  moodSettings?.[moodCode]?.paletteCode
                );

                if (!glyphCode) return <></>;

                return (
                  <Box
                    key={glyphCode}
                    sx={{
                      borderRadius: "50%",
                      background: "white",
                      boxShadow:
                        "rgb(0 0 0 / 31%) 0px 0px 1px 0px, rgb(0 0 0 / 25%) 0px 4px 6px -2px",
                    }}
                  >
                    <GlyphButton
                      p={0.1}
                      onClick={() => handlerMoodSelect(moodCode)}
                    >
                      <Glyph
                        code={glyphCode}
                        fullWidth
                        size={
                          getBreakpointValue({ xs: 45, sm: 50, md: 55 }) || 55
                        }
                        iconType="solid"
                        color={colors?.main}
                      />
                    </GlyphButton>
                  </Box>
                );
              })}
            {xs && [...Array(restMoods?.length).map((i) => <Box></Box>)]}
          </Planet>
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DayMoodSelector;
