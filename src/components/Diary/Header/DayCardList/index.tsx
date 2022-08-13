import React, { useEffect } from "react";
import DayCard from "../DayCardItem";
import SelectedDay from "../DayCardItem/SelectedDay";
import { Box, Card, Grid } from "@mui/material";
import { useDiaryContext } from "../../../../context/DiaryContext";
import SkeletonCard from "../../Skeleton/Card";
import { useParams } from "react-router-dom";

const DayCardList = () => {
  const { day, days, loadingDays } = useDiaryContext();
  const { date } = useParams();

  //  useEffect(() => {}, [days]);

  //console.log(days);

  if (loadingDays) {
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

  return (
    <>
      {/*<Box component={Grid} item xs={24} sm={12} md={6} lg={6}>*/}
      {/*  <SelectedDay date={day?.date} />*/}
      {/*</Box>*/}

      {days &&
        days
          .slice(0, 8)
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
};

export default DayCardList;
