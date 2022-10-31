import DiaryCard from "~/components/shared/Card";
import { Box, Skeleton } from "@mui/material";
import React, { FC } from "react";

const DayMoodSelectorSkeleton: FC = () => (
  <DiaryCard>
    <Box
      position="relative"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={152}
    >
      <Skeleton height={60} width={100} />
      <Skeleton
        height={90}
        width={90}
        variant="circular"
        sx={{ marginRight: 2 }}
      />
    </Box>
  </DiaryCard>
);

export default DayMoodSelectorSkeleton;
