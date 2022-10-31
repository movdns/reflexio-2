import React from "react";
import { Box, Card } from "@mui/material";

type SkeletonCardProps = {
  height?: number | string;
  mb?: number;
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({ height, mb }) => {
  return (
    <Box mb={mb || 0}>
      <Card color="ghost">
        <Box height={height} />
      </Card>
    </Box>
  );
};

export default SkeletonCard;
