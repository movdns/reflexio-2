import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import StyledSlider from "./StyledSlider";
import { useThemeContext } from "../../../context/ThemeContext";
import palette from "../../../common/palette";
import Quiz from "./Quiz";
import { useDiaryContext } from "../../../context/DiaryContext";
import { Image } from "@mui/icons-material";
import expressionless from "../../../common/assets/img/emotions/expressionless.png";
import { styled } from "@mui/styles";
import SkeletonCard from "../Skeleton/Card";

const RightSidebar: React.FC<{ score?: number }> = ({ score }) => {
  const { day, setDay } = useDiaryContext();

  const { setPrimaryColor } = useThemeContext();
  const [happiness, setHappiness] = useState<string>("Not good not terrible");
  const [scoreState, setScoreState] = useState(day?.score || 5);

  useEffect(() => {
    day?.score && day.score !== scoreState && setScoreState(day.score);
  }, [day, scoreState]);

  // const sliderMarks = [
  //   {
  //     value: 0,
  //     label: ":(",
  //   },
  //   {
  //     value: 4,
  //     label: ":|",
  //   },
  //   {
  //     value: 6,
  //     label: ":)",
  //   },
  //   {
  //     value: 9,
  //     label: "^_^",
  //   },
  // ];

  // const handleSliderChange = (event: Event, value: number | number[]) => {
  //   if (typeof value === "number") {
  //     setScoreState(value);
  //   }
  // };
  //
  useEffect(() => {
    // console.log(scoreState);
    switch (true) {
      case scoreState < 4:
        setPrimaryColor?.(palette.negative.main);
        setHappiness("Bad day :(");
        break;
      case scoreState < 6:
        setPrimaryColor?.(palette.neutral.main);
        setHappiness("Not good not terrible");
        break;
      case scoreState < 9:
        setPrimaryColor?.(palette.positive.main);
        setHappiness("Day went great :)");
        break;
      case scoreState >= 9:
        setPrimaryColor?.(palette.special.main);
        setHappiness("Something special!");
        break;
      default:
        setPrimaryColor?.("#aec8cf");
        break;
    }
  }, [scoreState, setPrimaryColor]);

  const MoodButton = styled(Button)(() => ({
    height: 65,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    borderRadius: 10,
    textTransform: "none",

    // opacity: 0.7,
    // "&:hover": {
    //   opacity: 1,
    // },
    // "& span": {
    //   margin: "6px",
    // },
  }));

  const setScoreHandler = (score: number) => {
    setDay?.({ score: score });
  };

  return (
    <>
      <Box component={Grid} container columns={5} spacing={2} mb={1}>
        <Box component={Grid} item>
          <MoodButton
            color="negative"
            onClick={() => setScoreHandler(2)}
            // sx={{ outline: "1px solid #747E88" }}
            sx={{ outline: day?.score === 2 ? "2px solid black" : "none" }}
          >
            x_x
          </MoodButton>
          {/*<Box*/}
          {/*  width="100%"*/}
          {/*  height={70}*/}
          {/*  sx={{*/}
          {/*    background: palette.negative.main,*/}
          {/*    color: palette.negative.contrastText,*/}
          {/*  }}*/}
          {/*  display="flex"*/}
          {/*  alignItems="center"*/}
          {/*  justifyContent="center"*/}
          {/*  fontSize="1.2rem"*/}
          {/*  borderRadius={3}*/}
          {/*  onClick={() => setScoreState(1)}*/}
          {/*>*/}
          {/*  x＿x*/}
          {/*</Box>*/}
        </Box>
        <Box component={Grid} xs={1} item>
          <MoodButton
            onClick={() => setScoreHandler(3)}
            color="danger"
            sx={{ outline: day?.score === 3 ? "2px solid black" : "none" }}
          >
            - ︹ -
          </MoodButton>
        </Box>
        <Box component={Grid} xs={1} item>
          <MoodButton
            onClick={() => setScoreHandler(5)}
            color="neutral"
            sx={{ outline: day?.score === 5 ? "2px solid black" : "none" }}
          >
            . __ .
          </MoodButton>
        </Box>
        <Box component={Grid} xs={1} item>
          <MoodButton
            onClick={() => setScoreHandler(8)}
            color="positive"
            sx={{ outline: day?.score === 8 ? "2px solid black" : "none" }}
          >
            ^‿^
          </MoodButton>
        </Box>
        <Box component={Grid} xs={1} item>
          <MoodButton
            onClick={() => setScoreHandler(10)}
            color="special"
            sx={{ outline: day?.score === 10 ? "2px solid black" : "none" }}
          >
            ★‿★
          </MoodButton>
        </Box>
      </Box>
      <Typography variant="subtitle2" textAlign="right">
        {happiness}
      </Typography>

      <Box mt={2}>
        {/*<SkeletonCard height={490} />*/}
        <Quiz />
      </Box>
    </>
  );
};

export default RightSidebar;
