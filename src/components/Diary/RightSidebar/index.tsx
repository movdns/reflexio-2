import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import StyledSlider from "./StyledSlider";
import { useThemeContext } from "../../../context/ThemeContext";
import palette from "../../../common/palette";
import Quiz from "./Quiz";
import { useDiaryContext } from "../../../context/DiaryContext";

const RightSidebar: React.FC<{ score?: number }> = ({ score }) => {
  const { day } = useDiaryContext();

  console.log(day?.score);

  const { setPrimaryColor } = useThemeContext();
  const [happiness, setHappiness] = useState<string>("Not good not terrible");
  const [scoreState, setScoreState] = useState(day?.score || 5);

  useEffect(() => {
    day?.score && day.score !== scoreState && setScoreState(day.score);
  }, [day, scoreState]);

  const sliderMarks = [
    {
      value: 0,
      label: ":(",
    },
    {
      value: 4,
      label: ":|",
    },
    {
      value: 6,
      label: ":)",
    },
    {
      value: 9,
      label: "^_^",
    },
  ];

  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (typeof value === "number") {
      setScoreState(value);
    }
  };

  useEffect(() => {
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

  return (
    <Card>
      <Box p={4} height="100%">
        <Box pb={2}>
          <Typography variant="body2">Rate your day:</Typography>

          <StyledSlider
            valueLabelDisplay="auto"
            aria-label="rate your day"
            defaultValue={scoreState}
            max={10}
            onChange={(e, v) => handleSliderChange(e, v)}
            marks={sliderMarks}
          />
          <Typography variant="body2" textAlign="right">
            {happiness}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default RightSidebar;
