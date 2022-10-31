import React from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import DaySummaryPie from "~/components/Day/Summary/Pie";
import DiaryCard from "~/components/shared/Card";
import Glyph from "~/components/shared/Glyph";

const DaySummarySkeleton = () => {
  return (
    <DiaryCard sx={{ position: "relative", height: 432 }}>
      <Box component={Grid} item container spacing={2}>
        <Box component={Grid} item xs={12}>
          <Typography variant="h3">
            <Skeleton width={160} />
          </Typography>
        </Box>
        <Box component={Grid} item xs={6}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            color="#aaa"
          >
            <Glyph code="light-emergency-on" size={72} />
            <Typography fontSize={28} pt={2}>
              no data :(
            </Typography>
          </Box>
        </Box>
        <Box component={Grid} item xs={6}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="end"
            height={290}
          >
            <DaySummaryPie readonly />
          </Box>
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DaySummarySkeleton;
