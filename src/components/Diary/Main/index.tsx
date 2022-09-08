import React, { FC, useEffect, useState } from "react";
import { Grid, Box, Card, Typography, CardMedia } from "@mui/material";
import SkeletonCard from "../Skeleton/Card";
import { useDiaryContext } from "../../../context/DiaryContext";
import Editor from "./Editor";
import GlyphButton from "../LeftSidebar/Glyphs/GlyphButton";
import Glyph from "../LeftSidebar/Glyphs/Glyph";
import dayjs from "dayjs";
import palette from "../../../common/palette";
// @ts-ignore
import image from "../../../common/assets/img/post.JPG";

const Main: FC = () => {
  const { day, isDayEditable, makeDayMutation } = useDiaryContext();
  const [showToolBar, setShowToolbar] = useState(false);

  const handleFavorite = (val: boolean) => {
    makeDayMutation?.({ favorite: val });
  };

  useEffect(() => {}, [day]);
  if (!day) {
    return (
      <Grid container gap={4} direction="column">
        <SkeletonCard height={500} />
      </Grid>
    );
  }
  return (
    <>
      <Grid container gap={4} direction="column">
        <Card>
          <Box p={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="baseline">
                <Typography variant="h6" mr={1}>
                  {dayjs(day.date, "D-MM-YY").format("D MMMM, dddd")}
                </Typography>
                <GlyphButton onClick={() => handleFavorite(!day?.favorite)}>
                  <Glyph
                    code="bookmark"
                    size={18}
                    color={day?.favorite ? palette.special.main : "inherit"}
                    iconType={day?.favorite ? "solid" : "thin"}
                    fullWidth
                  />
                </GlyphButton>
              </Box>

              <Box display="flex">
                <GlyphButton
                  onClick={() => setShowToolbar(!showToolBar)}
                  selectedType="outline"
                  selected={showToolBar}
                >
                  <Glyph code="font" size={20} iconType="solid" fullWidth />
                </GlyphButton>
              </Box>
            </Box>

            <Editor
              data={day?.description || []}
              readonly={!isDayEditable?.()}
              showToolBar={showToolBar}
            />
          </Box>
        </Card>
      </Grid>
    </>
  );
};

export default Main;
