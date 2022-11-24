import React, { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { DayT } from "~/components/TimelineView/DayList";
import DayHeader from "./DayHeader";
import DayTimeline from "./DayTimeline";
import DaySidebar from "./DaySidebar";

type DayItemProps = DayT & {};

const DayItem: FC<DayItemProps> = ({ date, moments, tag, color }) => {
  if (!date) {
    return <>Loading</>;
  }

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <DayHeader date={date} />
      </Grid>
      <Grid xs={12} md={7} pt={0} order={{ xs: 1, md: 0 }}>
        <DayTimeline color={color || "#9a9a9a"} date={date} moments={moments} />
      </Grid>
      <Grid xs={12} md={5} pt={0} order={{ xs: 0, md: 1 }}>
        <DaySidebar color={color || "#9a9a9a"} tag={tag} moments={moments} />
      </Grid>
    </Grid>
  );
};

export default DayItem;
