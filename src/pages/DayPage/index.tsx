import React, { FC, useRef } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import DayFeelingsSelector from "~/components/Day/FeelingsSelectorCard";
import DaySentimentGroup from "~/components/Day/SentimentGroup";
import MoodSelector from "~/components/Day/MoodSelectorCard";
import DaySummary from "~/components/Day/Summary";
import DateCard from "~/components/Day/DateCard";
import TodoList from "~/components/Day/TodoList";
import MainLayout from "~/layouts/MainLayout/";

const DiaryPage: FC = () => {
  const xs = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));
  const spacing = { xs: 2, sm: 3, lg: 4 };
  return (
    <MainLayout>
      <Grid container spacing={spacing}>
        <Grid item container spacing={spacing}>
          <Grid item container xs={12} lg={8} xl={6}>
            <Grid item container spacing={spacing}>
              <Box component={Grid} item xs={12}>
                <DateCard />
              </Box>
              <Box component={Grid} item xs={12} sm={6}>
                <MoodSelector />
              </Box>
              <Box component={Grid} item xs={12} sm={6}>
                <DayFeelingsSelector />
              </Box>
            </Grid>
          </Grid>

          <Box component={Grid} item xs={12} lg={4} xl={6}>
            <DaySummary />
          </Box>
        </Grid>

        <Grid
          item
          container
          spacing={spacing}
          direction={{ xs: "column", lg: "row" }}
        >
          <Grid item lg={4} xl={3} order={{ lg: 0, xs: 1 }}>
            <TodoList />
          </Grid>

          <Grid item container lg={8} xl={9} order={{ lg: 1, xs: 0 }}>
            <Grid item container spacing={spacing}>
              <DaySentimentGroup />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default DiaryPage;
