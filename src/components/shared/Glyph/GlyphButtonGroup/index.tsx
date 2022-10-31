import { useSettingsContext } from "~/context/SettingsContext";
import { genUniqueId } from "~/helpers/genUniqueId";
import { TSentimentData } from "root/types/day";
import React, { FC, useCallback } from "react";
import { Box, Grid } from "@mui/material";
import GlyphButton, {
  GlyphButtonProps,
  GlyphButtonSkeleton,
} from "../GlyphButton";

type GlyphButtonGroupProps = {
  groupCode: string;
  glyphs?: string[];
  selectedGlyphs?: string[];
  iconType?: GlyphButtonProps["iconType"];
  size?: number;
  maxVisible?: number;
  showGhost?: boolean;
  onSelect?: (data: TSentimentData) => void;
};

const GlyphButtonGroup: FC<GlyphButtonGroupProps> = ({
  glyphs,
  selectedGlyphs,
  groupCode,
  onSelect,
  maxVisible,
  iconType,
  size,
}) => {
  const { getColorsFromPalette } = useSettingsContext();

  const colors = groupCode ? getColorsFromPalette?.(groupCode) : null;

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

  // Get number of ghost glyphs
  const ghostsNum = glyphs
    ? (maxVisible && glyphs?.length < maxVisible) || glyphs?.length < 5
      ? Math.abs(
          (maxVisible && glyphs?.length - maxVisible) || glyphs?.length - 5
        )
      : null
    : 10;

  return (
    <Box component={Grid} container spacing={2}>
      {glyphs &&
        glyphs?.slice(0, maxVisible || 5).map((glyph: any) => {
          const selected = selectedGlyphs?.includes(glyph) || false;

          return (
            <Grid item key={`${groupCode} ${glyph}`}>
              <GlyphButton
                key={glyph}
                code={glyph}
                fullWidth
                selected={selected}
                selectedVariant="outlined"
                iconType={selected ? "solid" : iconType || "thin"}
                rounded
                size={size || 34}
                colors={colors}
                p={8}
                onClick={() => handleGlyphSelect(glyph)}
              />
            </Grid>
          );
        })}
      {ghostsNum &&
        [...Array(ghostsNum)].map((k) => (
          <Grid item key={genUniqueId()}>
            <GlyphButton
              key={`ghost_${k}`}
              code="block-question"
              fullWidth
              iconType="thin"
              rounded
              size={32}
              disabled
              colors={colors}
              p={8}
            />
          </Grid>
        ))}
    </Box>
  );
};

export const GlyphButtonGroupSkeleton: FC<{ size?: number }> = ({ size }) => (
  <Box component={Grid} container spacing={2}>
    {[...Array(size || 12)].map(() => {
      return (
        <Grid item key={genUniqueId()}>
          <GlyphButtonSkeleton />
        </Grid>
      );
    })}
  </Box>
);

export default GlyphButtonGroup;
