import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import GlyphsCircleSelector from "../../../Glyph/GlyphsCircleSelector";
import { TGlyph } from "../../../../types";
import SkeletonCard from "../SkeletonCard";
import SectionCard from "../SectionCard";
import { useDiaryContext } from "../../../../context/DiaryContext";
import { useSettingsContext } from "../../../../context/SettingsContext";

const DayMoodCard: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { glyphs: glyphsFromSettings, mood: moodSettings } =
    useSettingsContext();

  console.log(moodSettings);

  const { glyphs } = day || {};
  const { mood } = glyphs || {};

  const currentMoodGlyphCode = mood && !Array.isArray(mood) ? mood : null;
  const currentMoodGlyph = glyphsFromSettings?.["mood"].icons.find(
    (icon: any) => icon.code === currentMoodGlyphCode
  );

  const handleMoodSelect = async (newMood: TGlyph) => {
    // await makeDayMutation?.({
    //   paletteCode: newMood.coloration,
    //   glyphs: { ...glyphs, mood: newMood.code },
    // });
  };

  if (!moodSettings) {
    return <SkeletonCard height={175} />;
  }

  return (
    <SectionCard minHeight={170} title="Mood">
      <Box display="flex" justifyContent="space-between" position="relative">
        <Box>
          <Typography
            variant="h5"
            fontSize="1.2rem"
            fontWeight={700}
            mt={1}
            sx={{ opacity: 0.1 }}
          >
            {currentMoodGlyph?.label}
          </Typography>
        </Box>

        <Box width={102} position="absolute" right={10} top={-35}>
          <GlyphsCircleSelector
            data={glyphsFromSettings?.mood?.icons || null}
            selectedCode={currentMoodGlyphCode}
            handleMoodSelect={handleMoodSelect}
            size={80}
          />
        </Box>
      </Box>
    </SectionCard>
  );
};

export default DayMoodCard;
