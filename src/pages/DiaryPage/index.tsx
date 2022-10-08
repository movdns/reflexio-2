import React, { FC } from "react";
import { Box, Card, CardHeader, Grid, Typography } from "@mui/material";
import DiaryLayout from "../../layouts/MainLayout/";
import { useDiaryContext } from "../../context/DiaryContext";
import { useSettingsContext } from "../../context/SettingsContext";
import DaySentimentGroup from "../../components/Diary/Day/SentimentGroup";
import DayMoodCard from "../../components/Diary/Card/DayMoodCard";
import MoodSelector from "../../components/Diary/Day/MoodSelector";
import DayHeader from "../../components/Diary/Day/Header";

const DiaryPage: FC = () => {
  return (
    <DiaryLayout>
      <Grid container>
        <Grid item container xs={12} spacing={4}>
          {/*<DayCardList />*/}
          <Box component={Grid} item container xs={12} spacing={4}>
            <DayHeader />
          </Box>

          <Box component={Grid} item xs={3}>
            {/*<MoodSelector />*/}
          </Box>
        </Grid>

        <Grid item container spacing={4}>
          <Grid item container xs={3} direction="column">
            <Box component={Grid} item>
              {/*<MoodSelector />*/}
            </Box>

            {/*<DayMoodCard />*/}
          </Grid>

          <Grid item xs={9}>
            <DaySentimentGroup />
          </Grid>
        </Grid>

        {/*<Grid item container spacing={4}>*/}
        {/*  <Grid item xs={5}>*/}
        {/*    <DayDateCard />*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={3}>*/}
        {/*    <DayMoodCard />*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={4}>*/}
        {/*    <DayFeelingsCard />*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}

        {/*<Grid item xs={8}>*/}
        {/*  <DayEditorCard*/}
        {/*  // description={day?.description}*/}
        {/*  // makeDayMutation={makeDayMutation}*/}
        {/*  />*/}
        {/*</Grid>*/}

        {/*<Grid item xs={4}>*/}
        {/*  <Grid container direction="column" spacing={4}>*/}
        {/*    <GlyphsPickerCard*/}
        {/*      dayGlyphs={day?.glyphs}*/}
        {/*      settingsGlyphs={settingsGlyphs}*/}
        {/*      getColorsFromPalette={getColorsFromPalette}*/}
        {/*      makeDayMutation={makeDayMutation}*/}
        {/*    />*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </Grid>
    </DiaryLayout>
  );
};

export default DiaryPage;
