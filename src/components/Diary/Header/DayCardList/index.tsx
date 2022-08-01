import React, { useEffect } from "react";
import DayCard from "../DayCardItem";
import Today from "../DayCardItem/Today";
import { Box, Card, Grid } from "@mui/material";
import { useDiaryContext } from "../../../../context/DiaryContext";
import SkeletonCard from "../../Skeleton/Card";
import { useParams } from "react-router-dom";

const DayCardList = () => {
  const { days, loadingDays } = useDiaryContext();
  const { date } = useParams();

  //  useEffect(() => {}, [days]);

  if (loadingDays) {
    return (
      <>
        <Box component={Grid} item xs={12} sm={6} md={4} lg={3}>
          <SkeletonCard height={90} />
        </Box>
        <Box
          component={Grid}
          item
          display={{ xs: "none", sm: "block" }}
          sm={3}
          md={3}
          lg={2}
        >
          <SkeletonCard height={90} />
        </Box>
        <Box
          component={Grid}
          item
          display={{ xs: "none", sm: "block" }}
          sm={3}
          md={3}
          lg={2}
        >
          <SkeletonCard height={90} />
        </Box>
        <Box component={Grid} item display={{ xs: "none", lg: "block" }} lg={2}>
          <SkeletonCard height={90} />
        </Box>
        <Box component={Grid} item display={{ xs: "none", lg: "block" }} lg={2}>
          <SkeletonCard height={90} />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box component={Grid} item xs={24} sm={12} md={8} lg={3}>
        <Today />
      </Box>

      {days &&
        days
          .slice(0, 7)
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
