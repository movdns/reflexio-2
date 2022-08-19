import React, { FC } from "react";
import { Box } from "@mui/material";
import SkeletonCard from "../Skeleton/Card";
import Glyphs from "./Glyphs";
import { useDiaryContext } from "../../../context/DiaryContext";
import { useIconsContext } from "../../../context/IconContext";

const LeftSidebar: FC = () => {
  const { day } = useDiaryContext();
  const { glyphs } = useIconsContext();

  // Show loading Skeleton
  if (!day || !glyphs) {
    return (
      <>
        {[1, 2, 3, 4, 5].map((i: number) => (
          <Box mb={3} key={Math.random()}>
            <SkeletonCard height={130} />
          </Box>
        ))}
      </>
    );
  }

  return (
    <>
      <Glyphs groupsData={glyphs} selected={day?.icons || []} />
    </>
  );
};

export default LeftSidebar;
