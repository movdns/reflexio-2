import React, { FC } from "react";
import { Box, Grid } from "@mui/material";
import MoodSelector from "../MoodSelector";
import DayFeelingsSelector from "../FeelingsSelector";
import DaySummary from "../Summary";
import DateCard from "./DateCard";

type DayHeaderProps = {};

const DayHeader: FC<DayHeaderProps> = () => {
  return (
    <>
      <Box component={Grid} item container xs={6} spacing={4}>
        <Box component={Grid} item xs={12}>
          <DateCard />
        </Box>
        <Box component={Grid} item xs={6}>
          <MoodSelector />
        </Box>
        <Box component={Grid} item xs={6}>
          <DayFeelingsSelector />
        </Box>
      </Box>
      <Box component={Grid} item xs={6}>
        <DaySummary />
      </Box>
    </>
  );
};

export default DayHeader;
