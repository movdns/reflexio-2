import React, { useEffect, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import palette from "../../../../common/palette";
import { useDiaryContext } from "../../../../context/DiaryContext";
import { useThemeContext } from "../../../../context/ThemeContext";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import MoodIcon from "@mui/icons-material/Mood";
import GlyphButton from "../../Glyphs/GlyphButton";
import Glyph from "../../Glyphs/Glyph";

const Mood = () => {
  const { day, setDay } = useDiaryContext();

  const { setPrimaryColor } = useThemeContext();
  const [happiness, setHappiness] = useState<string>("Not good not terrible");
  const [scoreState, setScoreState] = useState(day?.score || 5);

  useEffect(() => {
    day?.score && day.score !== scoreState && setScoreState(day.score);
  }, [day, scoreState]);

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
        setHappiness("Somelightg special!");
        break;
      default:
        setPrimaryColor?.("#aec8cf");
        break;
    }
  }, [scoreState, setPrimaryColor]);

  // const GlyphButton = styled(IconButton)(({ hexColor }: { hexColor: any }) => ({
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 15,
  //   "& svg": {
  //     fontSize: "2.8rem",
  //   },
  //   color: hexColor || "red",
  // }));

  const setScoreHandler = (score: number) => {
    setDay?.({ score: score });
  };

  return (
    <>
      <Box component={Grid} spacing={2} columns={5} container>
        <Box
          component={Grid}
          item
          xs={1}
          display="flex"
          justifyContent="center"
        >
          <GlyphButton coloration="negative" onClick={() => setScoreHandler(1)}>
            <Glyph code="face-eyes-xmarks" size={50} />
          </GlyphButton>
        </Box>
        <Box
          component={Grid}
          item
          xs={1}
          display="flex"
          justifyContent="center"
        >
          <GlyphButton coloration="danger" onClick={() => setScoreHandler(3)}>
            <Glyph code="face-diagonal-mouth" size={50} />
          </GlyphButton>
        </Box>
        <Box
          component={Grid}
          item
          xs={1}
          display="flex"
          justifyContent="center"
        >
          <GlyphButton onClick={() => setScoreHandler(5)} coloration="neutral">
            <Glyph code="face-meh" size={50} />
          </GlyphButton>
        </Box>
        <Box
          component={Grid}
          item
          xs={1}
          display="flex"
          justifyContent="center"
        >
          <GlyphButton coloration="positive" onClick={() => setScoreHandler(8)}>
            <Glyph code="face-smile" size={50} />
          </GlyphButton>
        </Box>
        <Box
          component={Grid}
          item
          xs={1}
          display="flex"
          justifyContent="center"
        >
          <GlyphButton
            coloration="special"
            onClick={() => setScoreHandler(10)}
            selected
          >
            <Glyph code="face-awesome" size={50} />
          </GlyphButton>
        </Box>

        {/*<IconButton*/}
        {/*  // onClick={() => handleSelectIcon(icon.code)}*/}
        {/*  sx={{*/}
        {/*    borderRadius: 3,*/}
        {/*    color: palette.danger.main,*/}
        {/*    padding: 1,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <SentimentDissatisfiedIcon sx={{ fontSize: "2.2em" }} />*/}
        {/*</IconButton>*/}

        {/*<IconButton*/}
        {/*  // onClick={() => handleSelectIcon(icon.code)}*/}
        {/*  sx={{*/}
        {/*    borderRadius: 3,*/}
        {/*    color: palette.neutral.main,*/}
        {/*    padding: 1,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <SentimentDissatisfiedIcon sx={{ fontSize: "2.2em" }} />*/}
        {/*</IconButton>*/}

        {/*<IconButton*/}
        {/*  // onClick={() => handleSelectIcon(icon.code)}*/}
        {/*  sx={{*/}
        {/*    borderRadius: 3,*/}
        {/*    color: palette.positive.main,*/}
        {/*    padding: 1,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <SentimentSatisfiedIcon sx={{ fontSize: "2.2em" }} />*/}
        {/*</IconButton>*/}

        {/*<IconButton*/}
        {/*  // onClick={() => handleSelectIcon(icon.code)}*/}
        {/*  sx={{*/}
        {/*    borderRadius: 3,*/}
        {/*    color: palette.special.main,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <MoodIcon sx={{ fontSize: "2.2em" }} />*/}
        {/*</IconButton>*/}
      </Box>
    </>
  );
};

export default Mood;
