import React, { FC, useEffect } from "react";
import { Grid } from "@mui/material";
import SkeletonCard from "../Skeleton/Card";
import { useDiaryContext } from "../../../context/DiaryContext";
import Description from "./Description";

const Main: FC = () => {
  const { day } = useDiaryContext();

  useEffect(() => {}, [day]);

  if (!day) {
    return (
      <Grid container gap={4} direction="column">
        <SkeletonCard height={500} />
      </Grid>
    );
  }
  return (
    <Grid container gap={4} direction="column">
      <Description />
    </Grid>
  );
};

export default Main;
