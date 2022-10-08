import React, { FC, useCallback } from "react";
import { useSettingsContext } from "../../../context/SettingsContext";
import { Box, Grid } from "@mui/material";
import GlyphButton, { GlyphButtonSkeleton } from "../GlyphButton";
import { TSentimentData } from "../../../types";

type GlyphButtonGroupProps = {
  groupCode: string;
  glyphs: string[];
  selectedGlyphs?: string[];
  maxVisible?: number;
  onSelect?: (data: TSentimentData) => void;
};

const GlyphButtonGroup: FC<GlyphButtonGroupProps> = ({
  glyphs,
  selectedGlyphs,
  groupCode,
  onSelect,
  maxVisible,
}) => {
  const { getColorsFromPalette } = useSettingsContext();

  const { main } = (groupCode && getColorsFromPalette?.(groupCode)) || {};

  const handleGlyphSelect = useCallback(
    (glyph: string) => {
      const newSelectedArr =
        selectedGlyphs && Array.isArray(selectedGlyphs)
          ? selectedGlyphs.includes(glyph)
            ? selectedGlyphs.filter((i: any) => i !== glyph)
            : [...selectedGlyphs, glyph]
          : [glyph];

      onSelect?.({ glyphs: newSelectedArr });
    },
    [onSelect, selectedGlyphs]
  );

  return (
    <Box component={Grid} container spacing={2}>
      {glyphs &&
        glyphs?.slice(0, maxVisible || 6).map((glyph: any) => {
          const selected = selectedGlyphs?.includes(glyph) || false;
          return (
            <Grid item key={`${groupCode} ${glyph}`}>
              <GlyphButton
                key={glyph}
                code={glyph}
                fullWidth
                selected={selected}
                iconType={selected ? "solid" : "duotone"}
                rounded
                color={main}
                p={7}
                variant="outlined"
                onClick={() => handleGlyphSelect(glyph)}
              />
            </Grid>
          );
        })}
    </Box>
  );
};

export const GlyphButtonGroupSkeleton = () => (
  <Box component={Grid} container spacing={2}>
    {[1, 2, 3, 4, 5, 6].map((key) => {
      return (
        <Grid item key={key}>
          <GlyphButtonSkeleton />
        </Grid>
      );
    })}
  </Box>
);

export default GlyphButtonGroup;
