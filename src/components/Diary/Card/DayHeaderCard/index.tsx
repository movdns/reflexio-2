import React, { FC, useCallback, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Collapse,
  Grid,
  Typography,
} from "@mui/material";
import Glyph from "../../../Glyph";
import { useDiaryContext } from "../../../../context/DiaryContext";
import dayjs from "dayjs";
import { TGlyph } from "../../../../types";
import { useSettingsContext } from "../../../../context/SettingsContext";
import GlyphsCircleSelector from "../../../Glyph/GlyphsCircleSelector";
import SkeletonCard from "../SkeletonCard/";
import GlyphsGroup from "../../../Glyph/GlyphsGroup";
// @ts-ignore
import image from "../../../../common/assets/img/post.png";
import GlyphButton from "../../../Glyph/GlyphButton";

const DayHeaderCard: FC = () => {
  const { day } = useDiaryContext();
  const { getColorsFromPalette, glyphs: glyphsFromUserSettings } =
    useSettingsContext();

  const [collapse, setCollapse] = useState(false);

  const colors = getColorsFromPalette?.(day?.paletteCode);

  const {
    mood,
    negative,
    positive,
    weather,
    ...rest
  }: { [key: string]: string | string[] } = day?.glyphs || {};

  const currentMoodGlyphCode = mood && !Array.isArray(mood) ? mood : null;

  // const handleFavorite = useCallback(() => {
  //   setIsFavorite?.();
  // }, [day?.isFavorite, setIsFavorite]);

  const handleMoodSelect = useCallback((mood: TGlyph) => {
    // setDayMood?.(mood);
  }, []);

  if (!day || !glyphsFromUserSettings) {
    return <SkeletonCard height={375} />;
  }

  return (
    <Box component={Card} position="relative">
      <Box
        height={280}
        sx={{
          backgroundColor: colors?.main,
        }}
      ></Box>

      {/*<CardMedia image={image} sx={{ minHeight: 340, width: "100%" }} />*/}

      <Box position="absolute" top={20} left={20} color={colors?.secondary}>
        <Box m={0}>
          <Box display="inline-flex" alignItems="center" width="100%">
            <Typography variant="h1" fontSize={60}>
              {dayjs(day?.date, "D-MM-YY").format("D dddd")}
            </Typography>
            <Box ml={2}>
              {Array.isArray(weather) &&
                weather.slice(0, 4).map((i: any) => (
                  <Box mr={2} display="inline-flex" key={i}>
                    <Glyph code={i} />
                  </Box>
                ))}
            </Box>
          </Box>
          <Typography variant="h2" fontSize={30}>
            {dayjs(day?.date, "D-MM-YY").format("MMMM")}
          </Typography>
        </Box>
      </Box>

      <Box position="absolute" right={10} top={12}>
        <GlyphButton onClick={() => console.log("Mutation here")}>
          <Glyph
            size={26}
            code="star"
            iconType={day?.isFavorite ? "solid" : "thin"}
            fullWidth
            color={day?.isFavorite ? "yellow" : colors?.secondary || "white"}
          />
        </GlyphButton>
      </Box>

      <Box
        sx={{
          //@todo отрефакторить по-человечески
          position: "absolute",
          left: "calc(50% + 40px)",
          transform: "translateX(-50%)",
          zIndex: 9999,
        }}
        mt={-5}
        ml={-10}
      >
        <GlyphsCircleSelector
          data={glyphsFromUserSettings?.mood?.icons || null}
          selectedCode={currentMoodGlyphCode}
          handleMoodSelect={handleMoodSelect}
          size={56}
        />
      </Box>

      <CardActionArea onClick={() => setCollapse(!collapse)}>
        <CardContent>
          <Box
            component={Grid}
            container
            p={2}
            display="flex"
            justifyContent="space-between"
          >
            <Box
              component={Grid}
              item
              xs={4}
              display="flex"
              alignItems="left"
              flexDirection="row"
            >
              <Box mr={2}>
                <Glyph code="circle-up" iconType="thin" size={22} />
                {/*<GlyphsGroup*/}
                {/*  label={*/}
                {/*    collapse ? glyphsFromUserSettings["positive"]?.label : null*/}
                {/*  }*/}
                {/*  data={positive || null}*/}
                {/*/>*/}
              </Box>
            </Box>

            <Box
              position="relative"
              component={Grid}
              item
              xs={4}
              display="flex"
              justifyContent="center"
              alignItems="top"
              zIndex={9999}
            ></Box>

            <Box
              component={Grid}
              item
              xs={4}
              display="flex"
              alignItems="end"
              justifyContent="start"
              flexDirection="column"
            >
              {/*<GlyphsGroup*/}
              {/*  label={*/}
              {/*    collapse ? glyphsFromUserSettings["negative"]?.label : null*/}
              {/*  }*/}
              {/*  data={negative || null}*/}
              {/*/>*/}
            </Box>

            <Collapse in={collapse}>
              <Grid container>
                {rest &&
                  Object.keys(rest).map((item: string) => (
                    <Box component={Grid} item key={item} mr={2}>
                      {/*<GlyphsGroup*/}
                      {/*  label={glyphsFromUserSettings[item]?.label}*/}
                      {/*  data={(item?.length && rest[item]) || null}*/}
                      {/*/>*/}
                    </Box>
                  ))}
              </Grid>
            </Collapse>
          </Box>
        </CardContent>
      </CardActionArea>
    </Box>
  );
};

export default DayHeaderCard;
