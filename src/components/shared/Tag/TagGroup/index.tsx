import { Box, Button, Skeleton, Stack, SxProps } from "@mui/material";
import { TTUserSettingsPaletteData } from "root/types/userSettings";
import { genUniqueId } from "~/helpers/genUniqueId";
import { TSentimentData } from "root/types/day";
import React, { FC, useCallback } from "react";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";

type TagGroupProps = {
  sx?: SxProps;
  tags?: string[];
  selectedTags?: string[];
  colors?: TTUserSettingsPaletteData;
  readonly?: boolean;
  onSelect?: (data: TSentimentData) => void;
};

const TagGroup: FC<TagGroupProps> = ({
  tags,
  selectedTags,
  onSelect,
  colors,
  readonly,
  sx,
}) => {
  const handleTagSelect = useCallback(
    (tag: string) => {
      const newSelectedArr: string[] =
        selectedTags && Array.isArray(selectedTags)
          ? selectedTags.includes(tag)
            ? selectedTags.filter((i: string) => i !== tag)
            : [...selectedTags, tag]
          : [tag];
      !readonly && onSelect?.({ tags: newSelectedArr });
    },
    [onSelect, readonly, selectedTags]
  );

  if (!tags && !selectedTags) {
    return <></>;
  }
  return (
    <Stack
      display="inline-flex"
      spacing={0}
      flexWrap={readonly ? "wrap" : "nowrap"}
      direction="row"
      gap={readonly ? 1 : 2}
    >
      {!readonly && (
        <Box ml={6}>
          <GlyphButton
            code="plus"
            iconType="thin"
            rounded
            size={32}
            fullWidth
            color="#ccc"
          />
        </Box>
      )}

      {tags
        ? tags.map((tag: string) => {
            const isSelected = selectedTags?.includes(tag);
            const { main } = colors || {};
            const primaryColor = main || "#ccc";
            const secondaryColor = `${primaryColor}10`;

            return (
              <Button
                key={genUniqueId()}
                size="large"
                variant="outlined"
                onClick={() => !readonly && handleTagSelect(tag)}
                sx={{
                  bgcolor: secondaryColor || "inherit",
                  color: primaryColor || "inherit",
                  border: "none",
                  boxShadow: isSelected ? "0 0 0 1px" : "none",
                  // fontWeight: isSelected ? "bold" : "regular",
                  "&:hover": {
                    border: "none",
                    background: `${primaryColor}50`,
                    boxShadow: isSelected ? "0 0 0 1px" : "none",
                  },
                  ...sx,
                }}
              >
                {tag}
              </Button>
            );
          })
        : selectedTags?.map((tag: string) => {
            return (
              <Box
                key={genUniqueId()}
                size="small"
                component={Button}
                textTransform="capitalize"
                disabled
                sx={{
                  bgcolor: colors?.main || "inherit",
                  color: colors?.contrastText || "inherit",
                  "&:disabled": {
                    color: "white",
                  },
                }}
              >
                {tag}
              </Box>
            );
          })}

      <Box mr={2} />
    </Stack>
  );
};

export const TagGroupSkeleton: FC<{ size?: number }> = ({ size }) => (
  <Box display="inline-flex" flexWrap="wrap">
    {[...Array(size || 8)].map(() => (
      <Skeleton
        key={genUniqueId()}
        variant="rectangular"
        width={101}
        height={40}
        sx={{ marginRight: 1, borderRadius: 2 }}
      />
    ))}
  </Box>
);

export default TagGroup;
