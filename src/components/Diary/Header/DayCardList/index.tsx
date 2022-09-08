import React, { FC } from "react";
import DayCard from "../DayCardItem";
import { Box, Card, Grid, useMediaQuery } from "@mui/material";
import { useDiaryContext } from "../../../../context/DiaryContext";
import SkeletonCard from "../../Skeleton/Card";
import { useParams } from "react-router-dom";
import MobileNav from "../MobileNav";
import { TDay } from "../../../../types";
import { useTheme } from "@mui/material";
import getCardType from "../DayCardItem/helpers/getCardType";
import getDayLeftInPercent from "../DayCardItem/helpers/getDayLeftInPercent";
import Glyph from "../../LeftSidebar/Glyphs/Glyph";

const DayCardList: FC = () => {
  const { days } = useDiaryContext();
  const { date } = useParams();

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));

  // console.log(days);

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

  const defaultCardSize = "medium";

  if (days) {
    return (
      <>
        {!md && (
          <Box>
            <MobileNav days={days} />
          </Box>
        )}
        {/*<DayCard*/}
        {/*  key={Math.random()}*/}
        {/*  index={1}*/}
        {/*  size="small"*/}
        {/*  date="24-02-2021"*/}
        {/*  favorite*/}
        {/*  icons={["face-explode"]}*/}
        {/*  score={1}*/}
        {/*  selected*/}
        {/*/>*/}

        {days &&
          days
            .slice(sliceOffset(days), defaultCardSize === "medium" ? 7 : 10)
            .map((day: any, index) => {
              const size = date === day.date ? "large" : defaultCardSize;
              // console.log(day.date);
              return (
                <DayCard
                  // outline
                  key={Math.random()}
                  type={day?.type}
                  index={index}
                  selected={date === day.date || false}
                  size={size}
                  date={day.date}
                  icons={day.icons}
                  score={day.score}
                  favorite={day?.favorite}
                />
              );
            })}
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
