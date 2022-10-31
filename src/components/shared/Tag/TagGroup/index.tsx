import { Box, Button, Skeleton, Stack, SxProps } from "@mui/material";
import { TTUserSettingsPaletteData } from "root/types/userSettings";
import { genUniqueId } from "~/helpers/genUniqueId";
import { TSentimentData } from "root/types/day";
import React, { FC, useCallback } from "react";

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
    <Stack spacing={0} direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
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
                  outline: isSelected ? "1px solid" : "none",
                  fontWeight: isSelected ? "bold" : "regular",
                  "&:hover": {
                    border: "none",
                    background: `${primaryColor}50`,
                    outline: isSelected ? "1px solid" : "none",
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
                key={tag}
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
