import React, { useEffect } from "react";
import { Grid } from "@mui/material";
// import SkeletonCard from "../Skeleton/Card";
//import IconToolbar from "./IconToolbar";
import { useDiaryContext } from "../../../context/DiaryContext";
import Description from "./Description";

const Main = () => {
  const { day, loadingDay } = useDiaryContext();

  useEffect(() => {}, [day]);

  if (loadingDay) {
    return (
      <Grid container gap={4} direction="column">
        Loading
      </Grid>
    );
  }
  return (
    <Grid container gap={4} direction="column">
      <Description />
      {/*<Editor description={day?.description} loading={loadingDay} />*/}
    </Grid>
  );
};

export default Main;
