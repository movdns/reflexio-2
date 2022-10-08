import React from "react";
import { Box, Card, Divider, Grid, IconButton, TextField } from "@mui/material";
import GlyphButton from "../../../Glyph/GlyphButton";
import Glyph from "../../../Glyph";

const MomentCard = () => {
  return (
    <Box mb={2}>
      <Card>
        <Box p={3}>
          <Box component={Grid} container mb={3}>
            <Box
              component={Grid}
              item
              xs={1}
              display="flex"
              alignItems="center"
            >
              <GlyphButton>
                <Glyph
                  code="face-dotted"
                  size={44}
                  color="gray"
                  iconType="thin"
                />
              </GlyphButton>
            </Box>
            <Box component={Grid} item xs={10} pl={1}>
              <TextField
                placeholder="Пару слов для потомков?"
                fullWidth
                multiline
              />
            </Box>
            <Box
              component={Grid}
              item
              xs={1}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <IconButton>
                <Glyph
                  code="paper-plane"
                  size={32}
                  color="turquoise"
                  //iconType="solid"
                />
              </IconButton>
            </Box>
          </Box>
          <Divider />
          <Box component={Grid} container mt={2}>
            <Box
              component={Grid}
              item
              xs={4}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pr={2}
            >
              <Glyph
                code="walking"
                size={28}
                coloration="positive"
                iconType="thin"
              />
              <Glyph
                code="running"
                size={28}
                coloration="positive"
                iconType="thin"
              />
              <Glyph
                code="person-biking-mountain"
                size={28}
                coloration="positive"
                iconType="thin"
              />
              <Glyph
                code="person-swimming"
                size={28}
                coloration="positive"
                iconType="thin"
              />
              <Divider variant="middle" orientation="vertical" />
            </Box>

            <Box
              component={Grid}
              item
              xs={4}
              display="flex"
              alignItems="center"
              pl={2}
            >
              <Glyph
                code="smoking"
                size={26}
                coloration="negative"
                iconType="thin"
              />
            </Box>
            <Box
              component={Grid}
              item
              xs={4}
              display="flex"
              alignItems="center"
            >
              <Glyph
                code="face-expressionless"
                size={32}
                coloration="positive"
                iconType="thin"
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default MomentCard;
