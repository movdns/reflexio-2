import React, { FC } from "react";
import { Box, Button, darken, Typography } from "@mui/material";
import Glyph from "~/components/shared/Glyph";
import { TagT } from "~/components/TimelineView/DayList";

type TagTileProps = TagT & {
  size?: "small" | "medium" | "large";
  outlined?: boolean;
  inverted?: boolean;
  color?: string;
  lifted?: boolean;
  tagProps?: TagT;
  onClick?: () => void;
};

const TagTile: FC<TagTileProps> = ({
  size,
  color,
  lifted,
  outlined,
  inverted,
  tagProps,
  onClick,
}) => {
  const isSmall = size === "small";
  const isLarge = size === "large";
  return (
    <Button
      sx={{ p: 0, minWidth: 40, borderRadius: 3 }}
      disabled={!onClick}
      onClick={onClick}
    >
      <Box
        width={isSmall ? 40 : isLarge ? 80 : 60}
        height={isSmall ? 40 : isLarge ? 80 : 60}
        bgcolor={inverted ? "white" : color || "#eee"}
        color={inverted ? color : color ? "white" : "inherit"}
        borderRadius={isSmall ? 2 : 3}
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow={
          lifted
            ? `0 ${isLarge ? 4 : 2} 0px 0px ${darken(
                color || "#ddd",
                0.2
              )}, 0px 0px 10px 0px rgba(120, 120, 120, 0.4)`
            : outlined && inverted
            ? `0 0 0 ${isLarge ? 4 : 2}px ${color}, 0 0 0 ${
                isLarge ? 6 : 4
              }px white`
            : outlined
            ? "0 0 0 2px"
            : "none"
        }
      >
        {tagProps?.type === "emoji" ? (
          <Typography fontSize={isSmall ? 25 : 40} height={isSmall ? 30 : 50}>
            {tagProps?.icon}
          </Typography>
        ) : tagProps?.type === "glyph" ? (
          <Glyph
            code={tagProps?.icon}
            iconType="solid"
            size={isSmall ? 20 : isLarge ? 50 : 30}
          />
        ) : (
          <></>
        )}
      </Box>
    </Button>
  );
};

export default TagTile;
