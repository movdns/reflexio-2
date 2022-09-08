import React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Glyph from "../../LeftSidebar/Glyphs/Glyph";
import GlyphButton from "../../LeftSidebar/Glyphs/GlyphButton";
// @ts-ignore
import image from "../../common/assets/img/post.JPG";

const Summary = () => {
  return (
    <Box mb={4}>
      <Box component={Card} sx={{ position: "relative" }}>
        {/*<CardMedia component="img" image={image} height={300} />*/}
        <Box sx={{ height: 300, background: "#00C292FF" }} />

        <Box position="absolute" sx={{ top: 0, color: "white" }}>
          <Box m={2}>
            <Box display="inline-flex" alignItems="center">
              <Typography variant="h1" fontSize={60}>
                8 Thursday
              </Typography>
              <Box ml={2} textAlign="center">
                <Glyph code="sun-cloud" />
              </Box>
            </Box>
            <Typography variant="h2" fontSize={30}>
              September
            </Typography>
          </Box>
        </Box>

        <Box position="absolute" right={10} top={10}>
          <GlyphButton>
            <Glyph
              code="camera-viewfinder"
              iconType="thin"
              color="white"
              fullWidth
            />
          </GlyphButton>
        </Box>

        <CardContent>
          <Box
            component={Grid}
            container
            p={2}
            display="flex"
            justifyContent="space-between"
            //minHeight={80}
          >
            <Box
              component={Grid}
              item
              xs={5}
              display="flex"
              alignItems="center"
            >
              <Box display="flex" alignItems="center" flexWrap="wrap">
                <Box mr={2}>
                  <Glyph code="walking" size={22} iconType="thin" />
                </Box>
                <Box mr={2}>
                  <Glyph code="running" size={22} iconType="thin" />
                </Box>
                <Box mr={2}>
                  <Glyph
                    code="person-biking-mountain"
                    size={22}
                    iconType="thin"
                  />
                </Box>
                <Box mr={2}>
                  <Glyph code="person-swimming" size={22} iconType="thin" />
                </Box>
              </Box>
            </Box>

            <Box
              position="relative"
              component={Grid}
              item
              xs={2}
              display="flex"
              justifyContent="center"
            >
              <Box
                mt={-4}
                sx={{
                  background: "white",
                  borderRadius: "50%",
                  width: 70,
                  height: 70,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 22,
                  position: "absolute",
                  left: "50%",
                  top: -20,
                  transform: "translateX(-50%)",
                }}
              >
                <Glyph
                  code="face-smile-relaxed"
                  fullWidth
                  size={58}
                  coloration="positive"
                />
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle2" color="#80808080">
                  Awesome
                </Typography>
              </Box>
            </Box>
            <Box
              component={Grid}
              item
              xs={5}
              display="flex"
              alignItems="center"
              justifyContent="end"
            >
              <Box display="flex" alignItems="center">
                <Box mr={2}>
                  <Glyph code="smoking" size={18} iconType="thin" />
                </Box>
                <Box mr={2}>
                  <Glyph code="wine-glass" size={22} iconType="thin" />
                </Box>
                <Box mr={2}>
                  <Glyph code="bong" size={22} iconType="thin" />
                </Box>
                <Box>
                  <Glyph code="gamepad-modern" size={20} iconType="thin" />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Box>
  );
};

export default Summary;
