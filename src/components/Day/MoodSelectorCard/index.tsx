import React, { FC, useCallback, useEffect, useState } from "react";
import DayMoodSelectorSkeleton from "~/components/Day/MoodSelectorCard/Skeleton";
import { Box, Typography } from "@mui/material";
import { TTUserSettingsMoodData } from "root/types/userSettings";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import sortNestedObjectByField from "~/helpers/sortNestedObject";
import useStateWithDep from "~/hooks/useStateWithDep";
import useDebounce from "~/hooks/useDebounce";
import useWidth from "~/hooks/useWidth";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";
import ColorSlider from "~/components/shared/ColorSlider";
import DiaryCard from "~/components/shared/Card";
import Glyph from "~/components/shared/Glyph";
import { Planet } from "react-planet";
import { genUniqueId } from "~/helpers/genUniqueId";
import genSliderMarks from "~/components/shared/ColorSlider/helpers/genSliderMarks";
import hash from "object-hash";

const DayMoodSelector: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { mood: moodSettings, getColorsFromPalette } = useSettingsContext();
  const { mood: dayMood } = day || {};

  //const [moodState, setMoodState] = useStateWithDep(dayMood);
  const [moodState, setMoodState] = useStateWithDep(dayMood);
  const debouncedMoodState = useDebounce(moodState, 2000);

  const [isPlanetSelectorOpen, setIsPlanetSelectorOpen] = useState(
    !!dayMood?.glyphCode
  );

  // Responsive
  const currentBreakpoint = useWidth();
  const getBreakpointValue = (data: { [key: string]: number }) => {
    const isExistsInArr = Object.keys(data).includes(currentBreakpoint);

    if (isExistsInArr) {
      return (
        Object.keys(data).includes(currentBreakpoint) && data[currentBreakpoint]
      );
    }
  };

  const sortedMoodObj: { [k: string]: TTUserSettingsMoodData } | undefined =
    moodSettings && sortNestedObjectByField(moodSettings, "score");

  const sortedMoodArray =
    moodSettings && sortNestedObjectByField(moodSettings, "score", true);

  const currentMoodCode: string | undefined =
    moodSettings &&
    Object.keys(moodSettings).find(
      (moodCode) => moodSettings[moodCode]?.glyphCode === moodState?.glyphCode
    );

  const currentMoodScore: number | undefined =
    currentMoodCode && sortedMoodObj
      ? sortedMoodObj[currentMoodCode]?.score
      : 3;

  const currentMoodColors = getColorsFromPalette?.(moodState?.paletteCode);

  const restMoodCodeArr =
    sortedMoodObj &&
    Object.keys(sortedMoodObj).filter(
      (moodCode) => sortedMoodObj[moodCode]?.glyphCode !== dayMood?.glyphCode
    );

  const handleSliderChange = (score: any) => {
    const { score: newMoodScore, ...newMood } = sortedMoodArray.find(
      (mood: any) => mood?.score === score
    );
    newMood && setMoodState(newMood);
  };

  const moodMutation = useCallback(
    (moodCode: string) => {
      const { score, ...moodData } = {
        ...moodSettings[moodCode],
      };

      const query = {
        mood: moodData,
        paletteCode: moodCode,
        metrics: {
          ...day?.metrics,
          score: { ...day?.metrics?.score, mood: score },
        },
      };
      console.log(query);
      makeDayMutation?.(query);
    },
    [day?.metrics, makeDayMutation, moodSettings]
  );

  //
  useEffect(() => {
    debouncedMoodState &&
      dayMood &&
      hash(dayMood) !== hash(debouncedMoodState) &&
      moodMutation(debouncedMoodState?.paletteCode);
  }, [debouncedMoodState, moodMutation, dayMood]);

  if (!day || !moodSettings || !moodState?.glyphCode) {
    return <DayMoodSelectorSkeleton />;
  }

  return (
    <DiaryCard
      sx={{
        height: { xs: 130, sm: "100%" },
        overflow: "visible",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      boxProps={{ width: "100%", p: { xs: 2, sm: 3 } }}
    >
      <Box
        position="relative"
        display="flex"
        justifyContent={{ xs: "center", sm: "space-around" }}
        alignItems="center"
        width="100%"
      >
        <Box width="100%" minWidth={180} order={1} pt={2} px={1}>
          <Typography
            fontSize={moodState?.label ? 22 : 20}
            color="#777e89"
            fontWeight={100}
          >
            {moodState?.label || "Pick your mood"}
          </Typography>

          <ColorSlider
            value={currentMoodScore || 3}
            aria-label="Mood selector"
            colors={currentMoodColors}
            valueLabelDisplay="auto"
            defaultValue={3}
            step={1}
            min={1}
            max={Object.keys(moodSettings).length}
            marks={genSliderMarks(1, Object.keys(moodSettings).length)}
            onChange={(e, v) => handleSliderChange(v)}
          />
        </Box>

        <Box
          display="flex"
          minHeight={{ xs: 80, sm: 80, md: 90 }}
          minWidth={{ xs: 80, sm: 80, md: 90 }}
        >
          <Planet
            mass={1}
            tension={100}
            friction={20}
            open={isPlanetSelectorOpen}
            // orbitRadius={(restGlyphs?.length && restGlyphs.length * 30) || 120}
            orbitRadius={120}
            hideOrbit
            autoClose
            rotation={180}
            bounceDirection="BOTTOM"
            centerContent={
              <GlyphButton
                p={2}
                onClick={() => setIsPlanetSelectorOpen(!isPlanetSelectorOpen)}
              >
                <Glyph
                  code={moodState?.glyphCode || "circle-question"}
                  fullWidth
                  size={getBreakpointValue({ xs: 60, sm: 65 }) || 70}
                  iconType="light"
                  color={
                    moodState?.glyphCode ? currentMoodColors?.main : "#ddd"
                  }
                />
              </GlyphButton>
            }
          >
            {moodSettings &&
              restMoodCodeArr &&
              restMoodCodeArr.map((moodCode: string) => {
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
                      onClick={() => {
                        setMoodState(moodSettings?.[moodCode]);
                        setIsPlanetSelectorOpen(false);
                      }}
                    >
                      <Glyph
                        code={glyphCode}
                        fullWidth
                        size={
                          getBreakpointValue({ xs: 45, sm: 50, md: 55 }) || 55
                        }
                        iconType="light"
                        color={colors?.main}
                      />
                    </GlyphButton>
                  </Box>
                );
              })}
            {[
              ...Array(restMoodCodeArr?.length).map(() => (
                <Box key={genUniqueId()} />
              )),
            ]}
          </Planet>
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DayMoodSelector;
