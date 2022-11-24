import React, { FC } from "react";
import NewLayout from "~/layouts/NewLayout";
import Grid from "@mui/material/Unstable_Grid2";
import DayItem from "~/components/TimelineView/DayList/DayItem";
import dayjs from "dayjs";
import DayGroup from "~/components/TimelineView/DayList";

type NewPageProps = {};

const NewPage: FC<NewPageProps> = () => {
  return (
    <NewLayout>
      <Grid container spacing={3} mt={3}>
        <Grid xs={12}>
          <DayGroup />
        </Grid>
      </Grid>
    </NewLayout>
  );
};

export default NewPage;
