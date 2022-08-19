import React, { FC } from "react";
import DayCard from "../DayCardItem";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useDiaryContext } from "../../../../context/DiaryContext";
import SkeletonCard from "../../Skeleton/Card";
import { useParams } from "react-router-dom";
import MobileNav from "../MobileNav";
import { TDay } from "../../../../types";
import { useTheme } from "@mui/material";

const DayCardList: FC = () => {
  const { days } = useDiaryContext();
  const { date } = useParams();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  // Simple navigation
  const getSelectedIndex = (days: TDay[]) => {
    return days?.findIndex((day: TDay) => date === day.date);
  };
  const sliceOffset = (days: TDay[]) => {
    const current = getSelectedIndex(days);

    if (current > 3) {
      return current - 3;
    } else if (current > 2) {
      return current - 3;
    } else {
      return 0;
    }
  };

  if (days) {
    return (
      <>
        {!md && (
          <Box>
            <MobileNav days={days} />
          </Box>
        )}

        {days &&
          days
            .slice(sliceOffset(days), days.length)
            .map((day: any, index) => (
              <DayCard
                key={Math.random()}
                index={index}
                selected={date === day.date || false}
                date={day.date}
                icons={day.icons}
                score={day.score}
              />
            ))}
      </>
    );
  } else {
    return (
      <>
        <Box component={Grid} item xs={24} sm={12} md={8} lg={6}>
          <SkeletonCard height={90} />
        </Box>
        <Box
          component={Grid}
          item
          md={8}
          lg={3}
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
          }}
        >
          <SkeletonCard height={90} />
        </Box>
        <Box
          component={Grid}
          item
          sm={12}
          md={8}
          lg={3}
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
          }}
        >
          <SkeletonCard height={90} />
        </Box>
        <Box
          component={Grid}
          item
          md={8}
          lg={3}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          <SkeletonCard height={90} />
        </Box>
        <Box
          component={Grid}
          item
          lg={3}
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
          }}
        >
          <SkeletonCard height={90} />
        </Box>
        <Box
          component={Grid}
          item
          lg={3}
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
          }}
        >
          <SkeletonCard height={90} />
        </Box>
        <Box
          component={Grid}
          item
          lg={3}
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
          }}
        >
          <SkeletonCard height={90} />
        </Box>
      </>
    );
  }
};

export default DayCardList;
