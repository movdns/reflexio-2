import React from "react";
import { Box, Card, Skeleton } from "@mui/material";

type SkeletonCardProps = {
  height?: number | string;
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({ height }) => {
  return (
    <Card>
      <Box height={height}>
        <Skeleton variant="rectangular" animation="wave" height="100%" />
      </Box>
    </Card>
  );
};

export default SkeletonCard;
