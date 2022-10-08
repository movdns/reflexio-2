import React, { FC, useCallback } from "react";
import { Box, Chip, Skeleton } from "@mui/material";
import {
  TSentimentData,
  TTUserSettingsPaletteData,
  TUserSettingsSentimentTagData,
} from "../../../types";

type TagGroupProps = {
  tags?: TUserSettingsSentimentTagData[];
  selectedTags?: string[];
  colors?: TTUserSettingsPaletteData;
  onSelect?: (data: TSentimentData) => void;
  readonly?: boolean;
};

const TagGroup: FC<TagGroupProps> = ({
  tags,
  selectedTags,
  onSelect,
  colors,
  readonly,
}) => {
  const handleTagSelect = useCallback(
    (tag: TUserSettingsSentimentTagData) => {
      const newSelectedArr: string[] =
        selectedTags && Array.isArray(selectedTags)
          ? selectedTags.includes(tag.label)
            ? selectedTags.filter((i: any) => i !== tag.label)
            : [...selectedTags, tag.label]
          : [tag.label];
      !readonly && onSelect?.({ tags: newSelectedArr });
    },
    [onSelect, readonly, selectedTags]
  );

  if (!tags && !selectedTags) {
    return <></>;
  }
  return (
    <Box display="inline-flex" flexWrap="wrap">
      {tags
        ? tags.map((tag: any) => {
            const isSelected = selectedTags?.includes(tag.label);
            return (
              <Box
                key={tag.label}
                size="small"
                variant={isSelected ? "filled" : "outlined"}
                component={Chip}
                mr={1}
                mb={1}
                label={tag?.label}
                onClick={() => !readonly && handleTagSelect(tag)}
                sx={{
                  bgcolor: isSelected ? colors?.main : "inherit",
                  color: isSelected ? colors?.contrastText : "inherit",
                }}
              />
            );
          })
        : selectedTags?.map((tag: string) => {
            return (
              <Box
                key={tag}
                size="small"
                variant="filled"
                component={Chip}
                mr={1}
                mb={1}
                label={tag}
                sx={{
                  bgcolor: colors?.main || "inherit",
                  color: colors?.contrastText || "inherit",
                }}
              />
            );
          })}
    </Box>
  );
};

export const TagGroupSkeleton = () => (
  <Box display="inline-flex" flexWrap="wrap">
    {[...Array(10)].map(() => (
      <Box
        key={Math.random() + Math.random()}
        size="small"
        variant="outlined"
        component={Chip}
        mr={1}
        mb={1}
        label={<Skeleton variant="text" width={42} />}
      />
    ))}
  </Box>
);

export default TagGroup;
