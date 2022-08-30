import React, { FC, useEffect, useState } from "react";
import { Grid, Box, Card, Typography } from "@mui/material";
import SkeletonCard from "../Skeleton/Card";
import { useDiaryContext } from "../../../context/DiaryContext";
import Editor from "./Editor";
import GlyphButton from "../LeftSidebar/Glyphs/GlyphButton";
import Glyph from "../LeftSidebar/Glyphs/Glyph";
import dayjs from "dayjs";

const Main: FC = () => {
  const { day, isDayEditable } = useDiaryContext();
  //const [readonly, setReadonly] = useState(!isDayEditable?.());
  const [favorite, setFavorite] = useState(true);
  const [showToolBar, setShowToolbar] = useState(true);

  useEffect(() => {}, [day]);
  if (!day) {
    return (
      <Grid container gap={4} direction="column">
        <SkeletonCard height={500} />
      </Grid>
    );
  }

  return (
    <Grid container gap={4} direction="column">
      <Card>
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"

            // sx={{ borderBottom: "1px solid #ddd" }}
          >
            <Box display="flex" alignItems="top">
              <Typography variant="h6" mr={1}>
                {dayjs(day?.date, "DD-MM-YY").format("D MMMM, dddd")}
              </Typography>
            </Box>

            <Box display="flex">
              <GlyphButton
                onClick={() => setShowToolbar(!showToolBar)}
                selectedType="outline"
                selected={!showToolBar}
              >
                <Glyph code="font" size={20} iconType="solid" />
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
  );
};

export default Main;
