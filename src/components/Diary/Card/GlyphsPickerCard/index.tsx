import React, { FC, useCallback } from "react";
import { useDiaryContext } from "../../../../context/DiaryContext";
import { useSettingsContext } from "../../../../context/SettingsContext";
import { Box, Grid } from "@mui/material";
import SectionCard from "../SectionCard";
import GlyphsListSelector from "../../../Glyph/GlyphsListSelector";
import SkeletonCard from "../SkeletonCard";
import Glyph from "../../../Glyph";

type GlyphsPickerCardProps = {
  dayGlyphs?: any;
  settingsGlyphs?: any;
  getColorsFromPalette?: (paletteCode: string) => void;
  makeDayMutation?: (data: any) => void;
};

const GlyphsPickerCard: FC<GlyphsPickerCardProps> = ({
  dayGlyphs,
  settingsGlyphs,
  getColorsFromPalette,
  makeDayMutation,
}) => {
  const { mood, ...settingsGlyphsWithoutMood } = settingsGlyphs || {};

  const selectHandler = useCallback(
    (data: any, groupCode: string) => {
      makeDayMutation?.({ glyphs: { ...dayGlyphs, [groupCode]: data } });
    },
    [dayGlyphs, makeDayMutation]
  );

  if (!dayGlyphs || !settingsGlyphs) {
    return (
      <Grid item>
        {[1, 2, 3, 4, 5].map((i) => (
          <SkeletonCard key={i} height={200} mb={4} />
        ))}
      </Grid>
    );
  }

  return (
    <>
      {Object.keys(settingsGlyphsWithoutMood).map((groupCode) => {
        const colors = getColorsFromPalette?.(
          settingsGlyphs[groupCode]?.coloration
        );
        const label = settingsGlyphs[groupCode]?.label || groupCode;
        return (
          <Grid item key={label}>
            <SectionCard title={label}>
              <GlyphsListSelector
                key={label}
                groupData={{ ...settingsGlyphs[groupCode], code: groupCode }}
                selected={dayGlyphs[groupCode]}
                colors={colors}
                selectHandler={selectHandler}
              />
            </SectionCard>
          </Grid>
        );
      })}
    </>
  );
};

export default GlyphsPickerCard;
