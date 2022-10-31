import React, { FC, useCallback, useState } from "react";
import { Planet } from "react-planet";
import DayMoodSelectorSkeleton from "~/components/Day/MoodSelectorCard/Skeleton";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";
import ColorButton from "~/components/shared/ColorButton";
import DiaryCard from "~/components/shared/Card";
import { Box, Typography } from "@mui/material";
import Glyph from "~/components/shared/Glyph";

const DayMoodSelector: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { mood: moodSettings, getColorsFromPalette } = useSettingsContext();
  const { mood } = day || {};

  const [isOpen, setIsOpen] = useState(!!mood?.glyphCode);

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
    <DiaryCard sx={{ overflow: "visible", position: "relative" }}>
      <Box position="absolute" right={10} top={10}>
        <ColorButton colors={selectedMoodColors}>
          <Typography variant="subtitle1" fontWeight={100} fontSize="0.7rem">
            {currentMoodCode && moodSettings?.[currentMoodCode]?.score}
          </Typography>
        </ColorButton>
      </Box>

      <Box
        position="relative"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height={152}
      >
        <Box>
          <Typography fontSize={mood?.label ? 22 : 20} fontWeight={100}>
            {mood?.label || "Pick your mood"}
          </Typography>
        </Box>

        <Box display="flex" minHeight={120} minWidth={120}>
          <Planet
            mass={2}
            tension={100}
            friction={20}
            open={isOpen}
            // orbitRadius={(restGlyphs?.length && restGlyphs.length * 30) || 120}
            orbitRadius={110}
            hideOrbit
            // autoClose
            //rotation={90}
            bounceDirection="BOTTOM"
            // orbitStyle={(defaultStyle) => ({
            //   ...defaultStyle,
            //   borderWidth: 2,
            //   borderStyle: "dashed",
            //   borderColor: "gray",
            // })}
            centerContent={
              <GlyphButton p={2} onClick={() => setIsOpen(!isOpen)}>
                <Glyph
                  code={mood?.glyphCode || "circle-question"}
                  fullWidth
                  size={90}
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
                        size={55}
                        iconType="solid"
                        color={colors?.main}
                      />
                    </GlyphButton>
                  </Box>
                );
              })}
          </Planet>
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DayMoodSelector;
