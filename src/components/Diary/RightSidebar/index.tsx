import React from "react";
import {
  Box,
  //  Button,
  Card,
  CardMedia,
  Chip,
  // Grid,
  // ListItem,
  // Typography,
} from "@mui/material";
// import StyledSlider from "./StyledSlider";
// import { useThemeContext } from "../../../context/ThemeContext";
// import palette from "../../../common/palette";
// import Quiz from "./Quiz";
// import { useDiaryContext } from "../../../context/DiaryContext";
// import { Image } from "@mui/icons-material";
// import expressionless from "../../../common/assets/img/emotions/expressionless.png";
// import { styled } from "@mui/styles";
// import SkeletonCard from "../Skeleton/Card";

const RightSidebar: React.FC<{ score?: number }> = ({ score }) => {
  return (
    <>
      <Card>
        <CardMedia
          component="img"
          height="auto"
          image="https://images.unsplash.com/photo-1659342313448-3f5115622e83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
          alt="green iguana"
          // sx={{ borderRadius: 3 }}
        />
      </Card>

      <Box pt={2}>
        <Chip label="Ride" variant="outlined" sx={{ marginRight: 1 }} />

        <Chip label="Pills" variant="outlined" sx={{ marginRight: 1 }} />

        <Chip label="Coffee" variant="outlined" sx={{ marginRight: 1 }} />
        <Chip label="Nicotine" variant="outlined" sx={{ marginRight: 1 }} />

        <Chip label="Hike" variant="outlined" />
      </Box>

      <Box mt={2}>
        {/*<SkeletonCard height={490} />*/}
        {/*<Quiz />*/}
      </Box>
    </>
  );
};

export default RightSidebar;
