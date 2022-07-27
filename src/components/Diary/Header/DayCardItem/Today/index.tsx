import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import dayjs from "dayjs";

const Today = () => {
  // const { day, today } = useDiaryContext();

  const date = dayjs();
  const current = true;

  // useEffect(() => {}, [today, day]);

  // console.log(current);

  return (
    <Card
      //type={current ? "current" : getCardColorByDayScore(10)}
      color="special"
      // elevation={current ? 24 : 0}
      raised
    >
      <CardContent>
        {/*<Box*/}
        {/*  component={IconButton}*/}
        {/*  width={30}*/}
        {/*  height="100%"*/}
        {/*  sx={{*/}
        {/*    background: "#FFFFFF20",*/}
        {/*    borderRight: "1px solid #FFFFFF40",*/}
        {/*    borderRadius: 0,*/}
        {/*    color: "white",*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <ArrowLeftIcon fontSize="large" />*/}
        {/*</Box>*/}
        <Box height={90} display="flex" alignItems="center">
          <CardActionArea href={`/diary/today`}>
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Box component={Grid} item xs={6} md={7}>
                <Box p={2}>
                  <Typography variant="h6">Today</Typography>
                  <Typography>{date.format("D MMMM, dddd")}</Typography>
                </Box>
              </Box>
              <Box component={Grid} item xs={6} md={5} display="flex">
                <Box
                  p={2}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  textAlign="right"
                  width="100%"
                  sx={{ paddingLeft: 0 }}
                >
                  <Typography variant="h6">15:35:53:13</Typography>
                  <Typography variant="subtitle1">88% day is left</Typography>
                </Box>
              </Box>
            </Grid>
          </CardActionArea>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Today;
