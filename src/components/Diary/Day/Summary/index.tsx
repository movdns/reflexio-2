import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ResponsiveSunburst, SunburstCustomLayerProps } from "@nivo/sunburst";

import { useDiaryContext } from "../../../../context/DiaryContext";
import { useSettingsContext } from "../../../../context/SettingsContext";
import DaySummaryPie from "./Pie";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Glyph from "../../../Glyph";
import TagGroup from "../../../Tag/TagGroup";
import DiaryCard from "../../Card";

type DaySummaryProps = {};

export const getTypeByScore = (
  score: number | undefined
): "positive" | "negative" | "neutral" | "danger" | "special" | undefined => {
  if (score) {
    switch (true) {
      case score < 3:
        return "negative";
      case score < 5:
        return "danger";
      case score === 5:
        return "neutral";
      case score < 8:
        return "positive";
      case score <= 10:
        return "special";
      default:
        return "neutral";
    }
  }
};

const DaySummary: FC<DaySummaryProps> = () => {
  const { day } = useDiaryContext();
  const { getColorsFromPalette } = useSettingsContext();

  const pieData = useMemo(() => {
    if (day && getColorsFromPalette) {
      const { sentiments } = day || {};
      const { score } = day || {};

      // Make set with unique values for the main Pie parts
      const groupSet = new Set();

      // Get score types (ex. 'positive', 'negative')
      const scoreTypesArr =
        score &&
        Object.keys(score).map((scoreCode) => {
          const scoreType = getTypeByScore(score?.[scoreCode]);
          groupSet.add(scoreType);
          return { code: scoreCode, type: scoreType, val: score?.[scoreCode] };
        });

      // Get sentiment types
      const sentimentTypesArr =
        sentiments &&
        Object.keys(sentiments).map((sentimentCode) => {
          groupSet.add(sentimentCode);
          const { glyphs, tags } = sentiments[sentimentCode] || {};
          return {
            type: sentimentCode,
            glyphs: { data: glyphs, val: glyphs?.length },
            tags: { data: tags, val: tags?.length },
          };
        });

      const pieChildrenData: any[] = [];

      groupSet.forEach((groupType) => {
        const scoreFilteredArr = scoreTypesArr?.filter(
          (scoreCode) => scoreCode.type === groupType
        );
        const sentimentFilteredArr = sentimentTypesArr?.filter(
          (sentimentCode) => sentimentCode.type === groupType
        );
        const colors =
          typeof groupType === "string"
            ? getColorsFromPalette?.(groupType)
            : undefined;

        const scoreData =
          scoreFilteredArr?.map((scoreItem) => ({
            name: `${groupType}_mood`,
            label: scoreItem.code,
            val: scoreItem.val,
          })) || [];

        const sentimentData =
          sentimentFilteredArr?.map((sentimentItem) => [
            {
              name: `${groupType}_tags`,
              label: "Tags",
              val: sentimentItem.tags.val,
            },
            {
              name: `${groupType}_glyphs`,
              label: "Glyphs",
              val: sentimentItem.glyphs.val,
            },
          ]) || [];

        pieChildrenData.push({
          name: groupType,
          label: groupType,
          color: colors && colors?.main,
          children: [...scoreData, ...sentimentData.flat()],
        });
      });

      return {
        name: "SummaryRing",
        children: [...pieChildrenData],
      };
    }
  }, [day, getColorsFromPalette]);

  //console.log(pieData);

  const renderSummaryData = (day: any) => {
    const sentiments = day?.sentiments;
    return (
      <Box>
        {Object.keys(sentiments).map((sentimentCode) => {
          const colors = getColorsFromPalette?.(sentimentCode);
          const glyphs = sentiments[sentimentCode]?.glyphs;
          const tags = sentiments[sentimentCode]?.tags;

          if (glyphs.length || tags.length)
            return (
              <Box
                mb={2}
                sx={{ borderLeft: `3px solid ${colors?.main}`, paddingLeft: 2 }}
                key={`${sentimentCode}_summary`}
              >
                {glyphs && (
                  <Box display="inline-flex" flexWrap="wrap">
                    {glyphs.map((glyphCode: string) => {
                      return (
                        <Box
                          m={0.5}
                          p={0.5}
                          sx={{
                            color: "white",
                            backgroundColor: `${colors?.main}`,
                            borderRadius: 2,
                          }}
                        >
                          <Glyph
                            code={glyphCode}
                            size={22}
                            fullWidth
                            iconType="solid"
                          />
                        </Box>
                      );
                    })}
                  </Box>
                )}

                {tags && (
                  <Box display="flex" flexWrap="wrap" mt={glyphs ? 1 : 0}>
                    <TagGroup selectedTags={tags} colors={colors} />
                  </Box>
                )}
              </Box>
            );
          return <></>;
        })}
      </Box>
    );
  };

  const colors = getColorsFromPalette?.(day?.paletteCode);

  if (!day || !pieData) return <DaySummarySkeleton />;

  return (
    <DiaryCard variant="outlined" colors={colors}>
      <Box component={Grid} item container spacing={2}>
        <Box component={Grid} item xs={12}>
          <Typography variant="h3" textTransform="capitalize">
            Summary
          </Typography>
        </Box>
        <Box
          component={Grid}
          item
          xs={6}
          sx={{ maxHeight: 300, overflowY: "scroll" }}
        >
          {renderSummaryData(day)}
        </Box>
        <Box component={Grid} item xs={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="end"
            height={290}
          >
            <DaySummaryPie data={pieData} />
          </Box>
        </Box>
        <Box component={Grid} item xs={12}>
          <Typography variant="h3" textTransform="capitalize">
            kek
          </Typography>
        </Box>
      </Box>
    </DiaryCard>
  );
};

const DaySummarySkeleton = () => {
  return (
    <Box>
      <DaySummaryPie readonly />
    </Box>
  );
};

export default DaySummary;
