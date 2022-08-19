import React from "react";
import { Box, Card } from "@mui/material";

type SkeletonCardProps = {
  height?: number | string;
};

const SkeletonCard: React.FC<SkeletonCardProps> = ({ height }) => {
  return (
    <Card color="ghost">
      <Box height={height} />
    </Card>
  );
};

export default SkeletonCard;
