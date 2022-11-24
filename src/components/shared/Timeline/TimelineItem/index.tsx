import React, { FC, ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import Glyph from "~/components/shared/Glyph";

type TimeLineItemProps = {
  children: ReactNode;
  chainColor?: string;
  chainGlyph?: ReactNode;
  chainGlyphCode?: string;
  title?: string;
  titleColor?: string;
  actions?: ReactNode;
};

const TimeLineItem: FC<TimeLineItemProps> = ({
  children,
  chainGlyphCode,
  chainGlyph,
  chainColor,
  title,
  titleColor,
  actions,
}) => {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <Box my={2} display="flex" justifyContent="start" alignItems="start">
          <Box
            //bgcolor="#04CAD6"
            bgcolor="transparent"
            borderRadius={4}
            height={60}
            width={30}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color={chainColor || "#ddd"}
            boxShadow="0 0 0 2px"
          >
            {!chainGlyph && chainGlyphCode && (
              <Glyph code={chainGlyphCode} color={chainColor || "#ddd"} />
            )}
            {chainGlyph}
          </Box>
        </Box>
        <TimelineConnector
          sx={{ bgcolor: chainColor || "#ddd", borderRadius: 2, width: 2 }}
        />
      </TimelineSeparator>
      <TimelineContent>
        {title && (
          <Box
            my={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            color="#bbb"
          >
            <Typography
              fontSize={32}
              color={titleColor || chainColor || "#bbb"}
              fontWeight={100}
            >
              {title}
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {actions}
            </Box>
          </Box>
        )}
        {children}
      </TimelineContent>
    </TimelineItem>
  );
};

export default TimeLineItem;
