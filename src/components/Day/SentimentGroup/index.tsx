import React, { FC, useCallback, useRef } from "react";
import { Box, Button, Grid } from "@mui/material";
import DaySentimentItemSkeleton from "./SentimentItem/Skeleton";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import { genUniqueId } from "~/helpers/genUniqueId";
import DaySentimentItem from "./SentimentItem";
import { TSentiment } from "root/types/day";

const DaySentimentGroup: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { sentiments: sentimentsSettings, getColorsFromPalette } =
    useSettingsContext();

  const { sentiments, metrics } = day || {};
  const { score } = { ...metrics };

  const isSpecial = score?.mood && score.mood === 5;

  const handleSentimentMutation = useCallback(
    (data: TSentiment) => {
      makeDayMutation?.({
        sentiments: {
          ...sentiments,
          ...data,
        },
      });
    },
    [makeDayMutation, sentiments]
  );

  if (!sentiments || !sentimentsSettings) {
    return (
      <>
        {[1, 2, 3].map(() => (
          <Box component={Grid} item key={genUniqueId()} xs={12}>
            <DaySentimentItemSkeleton />
          </Box>
        ))}
      </>
    );
  }
  console.log(score?.mood);
  return (
    <>
      {Object.keys(sentimentsSettings)
        .sort((a, b) => {
          if (score?.mood) {
            return score.mood < 3
              ? a !== "negative"
                ? 1
                : -1
              : score.mood < 4
              ? a !== "positive"
                ? 1
                : -1
              : a !== "special" && b !== "negative"
              ? 1
              : -1;
          } else {
            //@ts-ignore @TODO typing
            return sentimentsSettings[a]?.order - sentimentsSettings[b]?.order;
          }
        })
        .map((sentimentCode) => {
          const colors = getColorsFromPalette?.(sentimentCode);
          const sentimentData = sentiments?.[sentimentCode];
          const sentimentSettings = sentimentsSettings?.[sentimentCode];

          if (sentimentCode === "special" && !isSpecial) {
            return <Box key={genUniqueId()}></Box>;
          }
          return (
            <Box component={Grid} item key={genUniqueId()} xs={12}>
              <DaySentimentItem
                colors={colors}
                sentimentCode={sentimentCode}
                sentimentData={sentimentData}
                sentimentSettings={sentimentSettings}
                handleMutation={handleSentimentMutation}
              />
            </Box>
          );
        })}
    </>
  );
};

export default DaySentimentGroup;
