import React, { FC } from "react";
import { GlyphButtonGroupSkeleton } from "~/components/shared/Glyph/GlyphButtonGroup";
import { TagGroupSkeleton } from "~/components/shared/Tag/TagGroup";
import DiaryCard from "~/components/shared/Card";
import {
  Box,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";

export const DaySentimentItemSkeleton: FC<{ vertical?: boolean }> = ({
  vertical,
}) => (
  <DiaryCard boxProps={{ p: 0 }}>
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={4}
      position="relative"
    >
      <Box>
        <Typography
          textTransform="capitalize"
          variant="h3"
          borderBottom="3px solid #eaeaea"
          pb={0.5}
        >
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} width={200} />
        </Typography>
      </Box>
    </Box>
    <CardContent>
      <Grid item container flexDirection={vertical ? "row" : "column"}>
        <Grid
          item
          xs={vertical ? 6 : 12}
          pr={vertical ? 4 : 0}
          order={vertical ? 0 : 2}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        <Box
          component={Divider}
          orientation="vertical"
          flexItem
          sx={{ mr: "-1px" }}
        />
        <Grid
          item
          xs={vertical ? 6 : 12}
          alignItems="center"
          pl={vertical ? 3 : 0}
        >
          <Box pb={2}>
            <GlyphButtonGroupSkeleton size={11} />
          </Box>

          <Divider orientation="horizontal" flexItem sx={{ mr: "-1px" }}>
            <Typography variant="subtitle2" color="gray" />
          </Divider>

          <Box display="inline-flex" flexWrap="wrap" pt={2}>
            <Box pb={2}>
              <TagGroupSkeleton size={7} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </DiaryCard>
);

export default DaySentimentItemSkeleton;
