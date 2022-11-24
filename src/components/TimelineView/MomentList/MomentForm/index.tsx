import React, { FC } from "react";
import { Box, Card, Grid, Typography, TextField } from "@mui/material";
import Glyph from "~/components/shared/Glyph";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";
import TagTile from "~/components/shared/Tag/TagTile";

type MomentFormProps = {};

const MomentForm: FC<MomentFormProps> = () => {
  return (
    <Box mt={3}>
      <Card sx={{ color: "primary.main", boxShadow: "0 0 0 2px" }}>
        <Box p={2}>
          <Box
            display="flex"
            alignItems="top"
            justifyContent="space-between"
            position="relative"
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box mr={2}>
                <TagTile
                  outlined
                  inverted
                  color="lightgray"
                  tagProps={{ type: "glyph", icon: "question" }}
                  onClick={() => console.log("ty pidor")}
                />
              </Box>
            </Box>

            <Box
              px={1}
              mb={1}
              borderRadius={1}
              boxShadow="0 0 0 1px #f0f0f0"
              height={20}
              display="flex"
              alignItems="center"
            >
              <Glyph
                code="ellipsis"
                iconType="solid"
                color="#ccc"
                size={24}
                fullWidth={false}
              />
            </Box>

            {/*<TextField variant="outlined" sx={{ width: "88%" }} />*/}
          </Box>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Box width="100%">
              <TextField
                fullWidth
                multiline
                placeholder="Describe your moment (or not)"
              />
            </Box>

            <Box ml={1}>
              <GlyphButton
                code="paper-plane"
                rounded
                fullWidth
                size={25}
                p={12}
                variant="filled"
                iconType="solid"
                color="#03c9d7"
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default MomentForm;
