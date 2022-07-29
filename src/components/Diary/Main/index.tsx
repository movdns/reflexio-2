import React, { useEffect } from "react";
import { Grid } from "@mui/material";
// import SkeletonCard from "../Skeleton/Card";
import IconToolbar from "./IconToolbar";
import { useDiaryContext } from "../../../context/DiaryContext";
import Editor from "./Editor";

const Main = () => {
  const { day, loadingDay } = useDiaryContext();

  return (
    <Grid container gap={4} direction="column">
      <IconToolbar icons={day?.icons} score={day?.score} loading={loadingDay} />
      <Editor description={day?.description} loading={loadingDay} />
    </Grid>
  );
};

export default Main;
