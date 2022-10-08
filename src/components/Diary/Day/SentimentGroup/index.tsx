import React, { FC, useCallback } from "react";
import { Box } from "@mui/material";
import DaySentimentItem, { DaySentimentItemSkeleton } from "./SentimentItem";
import { useDiaryContext } from "../../../../context/DiaryContext";
import { useSettingsContext } from "../../../../context/SettingsContext";
import { TSentiment } from "../../../../types";

const DaySentimentGroup: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();
  const { sentiments: sentimentsSettings, getColorsFromPalette } =
    useSettingsContext();

  const { sentiments } = day || {};

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
        {[1, 2, 3].map((k) => (
          <Box pb={4} key={k}>
            <DaySentimentItemSkeleton />
          </Box>
        ))}
      </>
    );
  }
  return (
    <>
      {Object.keys(sentimentsSettings)
        .sort(
          (a, b) => sentimentsSettings[a]?.order - sentimentsSettings[b]?.order
        )
        .map((sentimentCode) => {
          const colors = getColorsFromPalette?.(sentimentCode);
          const sentimentData = sentiments?.[sentimentCode];
          const sentimentSettings = sentimentsSettings?.[sentimentCode];

          return (
            <Box pb={4} key={sentimentCode}>
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
