import React, { useEffect } from "react";
import SkeletonCard from "../Skeleton/Card";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useDiaryContext } from "../../../context/DiaryContext";
import Mood from "./Mood";
import Glyphs from "../Glyphs";

const LeftSidebar = () => {
  const { day, loadingDay } = useDiaryContext();

  useEffect(() => {}, [day]);

  return (
    <>
      <Card>
        <Glyphs data={serverData} />
      </Card>
    </>
  );
  // return <SkeletonCard height={360} />;
};

const serverData = [
  {
    label: "Mood",
    order: 0,
    radio: true,
    icons: [
      {
        code: "face-eyes-xmarks",
        color: "red",
        size: 42,
      },
      {
        code: "face-diagonal-mouth",
        color: "orange",
        size: 42,
      },
      {
        code: "face-meh",
        color: "black",
        size: 42,
      },
      {
        code: "face-smile",
        color: "green",
        size: 42,
      },
      {
        code: "face-awesome",
        color: "blue",
        size: 42,
      },
    ],
  },
  {
    label: "Activities",
    order: 1,
    icons: [
      {
        code: "person-walking",
      },
      {
        code: "person-running",
      },
      {
        code: "person-hiking",
      },
      {
        code: "person-swimming",
      },
      {
        code: "person-biking-mountain",
      },
    ],
  },
  {
    label: "Negative",
    order: 3,
    icons: [
      {
        code: "smoking",
      },
      {
        code: "wine-glass",
      },
      {
        code: "face-head-bandage",
      },
      {
        code: "bong",
      },
      {
        code: "gamepad-modern",
      },
    ],
  },
  {
    label: "Mind boosters",
    order: 4,
    icons: [
      {
        code: "pills",
      },
      {
        code: "mushroom",
      },
      {
        code: "cannabis",
      },
    ],
  },
];

export default LeftSidebar;
