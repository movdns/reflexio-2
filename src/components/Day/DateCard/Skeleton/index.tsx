import React, { FC } from "react";
import { Box, Skeleton } from "@mui/material";
import DiaryCard from "~/components/shared/Card";

export const DateCardSkeleton: FC = () => (
  <DiaryCard
    variant="outlined"
    outlineWidth={4}
    sx={{
      position: "relative",
      height: 200,
      display: "flex",
      alignItems: "center",
    }}
  >
    <Box position="absolute" right={10} top={10} display="inline-flex">
      <Skeleton width={30} height={30} variant="circular" />
    </Box>
    <Box pl={3}>
      <Skeleton width={300} height={100} />
      <Skeleton width={200} height={70} />
    </Box>
  </DiaryCard>
);

export default DateCardSkeleton;
