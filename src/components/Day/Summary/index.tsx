import React, { FC, useMemo } from "react";
import { Box, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { useDiaryContext } from "~/context/DiaryContext";
import { useSettingsContext } from "~/context/SettingsContext";
import TagGroup from "~/components/shared/Tag/TagGroup";
import getTypeByScore from "~/helpers/getTypeByScore";
import { genUniqueId } from "~/helpers/genUniqueId";
import DiaryCard from "~/components/shared/Card";
import Glyph from "~/components/shared/Glyph";
import DaySummarySkeleton from "./Skeleton";
import DaySummaryPie from "./Pie";
import { TDay } from "root/types/day";

const DaySummary: FC = () => {
  const { day } = useDiaryContext();
  const { getColorsFromPalette } = useSettingsContext();

  const smUp = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const pieData = useMemo(() => {
    if (day && getColorsFromPalette) {
      const { sentiments } = day || {};
      const { metrics } = { ...day };
      const { score } = { ...metrics };

      // Make set with unique values for the main Pie parts
      const groupSet = new Set();

      // Get score types (ex. 'positive', 'negative')
      const scoreTypesArr =
        score &&
        Object.keys(score).map((scoreCode) => {
          // @ts-ignore
          const scoreType = getTypeByScore(score[scoreCode]);
          groupSet.add(scoreType);
          // @ts-ignore
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

      const pieChildrenData: any[] = []; //@TODO typing

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
            name: `${groupType}_${scoreItem.code}`,
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
          label: `${groupType} side`,
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

  if (!day || !pieData) return <DaySummarySkeleton />;

  const renderSummaryData = (day: TDay) => {
    const sentiments = day?.sentiments;

    const isDataExists =
      sentiments &&
      Object.values(sentiments).find(
        (code) => code && Object.values(code).find((item) => item?.length)
      );

    return (
      <Box height="100%" width={!isDataExists ? "100%" : "auto"}>
        {isDataExists ? (
          Object.keys(sentiments).map((sentimentCode) => {
            const colors = getColorsFromPalette?.(sentimentCode);
            const glyphs = sentiments[sentimentCode]?.glyphs;
            const tags = sentiments[sentimentCode]?.tags;

            if (glyphs?.length || tags?.length) {
              return (
                <Box
                  mb={2}
                  sx={{
                    borderLeft: `3px solid ${colors?.main}`,
                    paddingLeft: 2,
                  }}
                  key={genUniqueId()}
                >
                  {glyphs && (
                    <Box display="inline-flex" flexWrap="wrap">
                      <Stack
                        spacing={0}
                        direction="row"
                        sx={{ flexWrap: "wrap", gap: 1 }}
                      >
                        {glyphs.map((glyphCode: string) => {
                          return (
                            <Box
                              key={genUniqueId()}
                              p={0.5}
                              display="flex"
                              alignItems="center"
                              sx={{
                                height: 36,
                                width: 36,
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
                      </Stack>
                    </Box>
                  )}
                  {tags && (
                    <Box display="flex" flexWrap="wrap" mt={glyphs ? 1 : 0}>
                      <TagGroup selectedTags={tags} colors={colors} readonly />
                    </Box>
                  )}
                </Box>
              );
            } else {
              return <></>;
            }
          })
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height={300}
            width="100%"
            color="#aaa"
          >
            <Glyph code="lightbulb-exclamation-on" size={72} />
            <Typography fontSize={28} pt={2}>
              no data :(
            </Typography>
            <Typography fontSize={14}>fill the day, please</Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <DiaryCard sx={{ position: "relative", height: "100%" }}>
      <Box component={Grid} item container spacing={2}>
        <Box component={Grid} item xs={12}>
          <Typography variant="h3" textTransform="capitalize">
            Summary
          </Typography>
        </Box>
        {smUp && (
          <Box component={Grid} item xs={12} sm={6}>
            <Box
              sx={{
                overflowY: "scroll",
                overflowX: "hidden",
                maxHeight: 330,
                display: { lg: "none", xl: "flex" },
              }}
            >
              {renderSummaryData(day)}
            </Box>
          </Box>
        )}
        <Box component={Grid} item xs={12} sm={6} lg={12} xl={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="end"
            height={290}
          >
            <DaySummaryPie data={pieData} />
          </Box>
        </Box>
        {/*<Box component={Grid} item xs={12}>*/}
        {/*  <Typography variant="h3" textTransform="capitalize">*/}
        {/*  </Typography>*/}
        {/*</Box>*/}
      </Box>
    </DiaryCard>
  );
};

export default DaySummary;
