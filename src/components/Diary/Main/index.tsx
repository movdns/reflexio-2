import React, { useEffect } from "react";
import { Grid } from "@mui/material";
// import SkeletonCard from "../Skeleton/Card";
import IconToolbar from "./IconToolbar";
import { useDiaryContext } from "../../../context/DiaryContext";
import Editor from "./Editor";

const Main = () => {
  const { day } = useDiaryContext();

  return (
    <Grid container gap={4} direction="column">
      <IconToolbar icons={day?.icons} />
      <Editor description={day?.description} />
    </Grid>
  );
};

export default Main;
