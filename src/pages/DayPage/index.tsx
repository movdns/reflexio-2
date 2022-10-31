import React, { FC } from "react";
import { Box, Grid } from "@mui/material";
import DayFeelingsSelector from "~/components/Day/FeelingsSelectorCard";
import DaySentimentGroup from "~/components/Day/SentimentGroup";
import MoodSelector from "~/components/Day/MoodSelectorCard";
import DaySummary from "~/components/Day/Summary";
import DateCard from "~/components/Day/DateCard";
import TodoList from "~/components/Day/TodoList";
import MainLayout from "~/layouts/MainLayout/";

const DiaryPage: FC = () => {
  return (
    <MainLayout>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item container xs={12} spacing={4}>
          <Box component={Grid} item container xs={12} lg={6} spacing={4}>
            <Box component={Grid} item xs={12} lg={12}>
              <DateCard />
            </Box>
            <Box component={Grid} item xs={12} sm={6}>
              <MoodSelector />
            </Box>
            <Box component={Grid} item xs={12} sm={6}>
              <DayFeelingsSelector />
            </Box>
          </Box>
          <Box component={Grid} item xs={12} lg={6}>
            <DaySummary />
          </Box>
        </Grid>

        <Grid
          item
          container
          spacing={4}
          direction={{ xs: "column", lg: "row" }}
        >
          <Grid item container xs={4} order={0}>
            <Grid item xs={12}>
              <TodoList />
            </Grid>
          </Grid>

          <Grid item container xs={12} lg={8} spacing={4}>
            <DaySentimentGroup />
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default DiaryPage;
