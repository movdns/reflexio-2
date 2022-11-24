import React, { FC } from "react";
import {
  Card,
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  CardMedia,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";
import Glyph from "~/components/shared/Glyph";
import GlyphButton from "~/components/shared/Glyph/GlyphButton";
import dayjs from "dayjs";
import { TagT } from "~/components/TimelineView/DayList";
import TagTile from "~/components/shared/Tag/TagTile";
import ColorTextField from "~/components/shared/ColorTextField";

type MomentItemProps = {
  tag?: TagT;
  color?: string;
  createdAt?: any;
  description?: string;
  tags?: string[];
  image?: any;
  editMode?: boolean;
};

const MomentItem: FC<MomentItemProps> = ({
  tag,
  image,
  description,
  color,
  tags,
  createdAt,
  editMode,
}) => {
  const isEditModeColored = false;
  return (
    <Grid xs={12} px={0} pb={editMode ? 0 : "inherit"}>
      <Card
        elevation={editMode ? 3 : 0}
        sx={{
          display: "flex",
          alignItems: "center",
          color: isEditModeColored && editMode ? color : "inherit",
          //boxShadow: isEditModeColored && editMode ? "0 0 0 2px" : "none",
          minHeight: editMode ? 176 : "auto",
        }}
      >
        <Box p={2} width="100%">
          <Box
            display="flex"
            alignItems="top"
            justifyContent="space-between"
            position="relative"
          >
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box mr={2}>
                <TagTile
                  inverted={editMode}
                  outlined={editMode}
                  onClick={() => console.log("pidor")}
                  color={color}
                  tagProps={tag}
                />
              </Box>

              <Box display="flex" flexDirection="column" mr={2}>
                {editMode ? (
                  <>
                    <ColorTextField
                      variant="outlined"
                      size="small"
                      placeholder="Label"
                      focusColor={color}
                      defaultValue={tag?.label}
                    />
                  </>
                ) : (
                  <Typography variant="h3">{tag?.label}</Typography>
                )}

                {!editMode && (
                  <Typography variant="h4" color="#bbb">
                    {dayjs(createdAt).format("hh:mm")}
                  </Typography>
                )}
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
          </Box>

          {description && (
            <Box width="100%" mt={2}>
              <Typography fontSize="1.1rem">{description}</Typography>
            </Box>
          )}

          {editMode && (
            <Box
              mt={3}
              display="flex"
              justifyContent="space-between"
              alignItems="end"
            >
              <Box width="100%">
                <ColorTextField
                  fullWidth
                  multiline
                  focusColor={color}
                  defaultValue={description}
                  placeholder="Describe your moment (or not)"
                />
              </Box>

              <Box ml={2}>
                <GlyphButton
                  code="turn-down-left"
                  rounded
                  fullWidth
                  size={25}
                  p={12}
                  variant="filled"
                  iconType="solid"
                  color={color}
                  onClick={() => console.log("pidoraska ")}
                />
              </Box>
            </Box>
          )}

          {image && (
            <CardMedia
              component="img"
              image={image}
              height={300}
              sx={{ borderRadius: 3, mt: 2 }}
            />
          )}

          {tags && (
            <Stack direction="row" spacing={2} mt={2}>
              {tags?.map((code) => (
                <Button variant="contained">{code}</Button>
              ))}
            </Stack>
          )}
        </Box>
      </Card>
    </Grid>
  );
};

export default MomentItem;
