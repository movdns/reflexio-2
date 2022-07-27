import React, { useEffect } from "react";
import DayCard from "../DayCardItem";
import Today from "../DayCardItem/Today";
import { Box, Grid } from "@mui/material";
import { useDiaryContext } from "../../../../context/DiaryContext";

const DayCardList = () => {
  const { days } = useDiaryContext();

  useEffect(() => {}, [days]);

  return (
    <>
      <Box component={Grid} item xs={12} sm={6} md={4} lg={3}>
        <Today />
      </Box>

      {days &&
        days
          .slice(1, 5)
          .map((day: any, index) => (
            <DayCard
              key={Math.random()}
              index={index}
              date={day.date}
              icons={day.icons}
              score={day.score}
            />
          ))}
    </>
  );
};

export default DayCardList;
