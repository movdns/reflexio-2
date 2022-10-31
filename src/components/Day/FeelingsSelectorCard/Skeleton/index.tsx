import React, { FC } from "react";
import { Box, Rating, Skeleton } from "@mui/material";
import DiaryCard from "~/components/shared/Card";
import Glyph from "~/components/shared/Glyph";

const DayFeelingsSelectorSkeleton: FC = () => (
  <DiaryCard>
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={152}
    >
      <Box>
        <Skeleton width={100} height={30} />
        <Box pt={1}>
          <Rating
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#efefef",
              },
              "& .MuiRating-iconHover": {
                color: "#efefef",
              },
            }}
            disabled
            max={5}
            value={0}
            emptyIcon={
              <Box>
                <Glyph code="ghost" iconType="thin" size={36} fullWidth />
              </Box>
            }
          />
        </Box>
      </Box>

      <Box>
        <Skeleton width={100} height={30} />
        <Box pt={1}>
          <Rating
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#efefef",
              },
              "& .MuiRating-iconHover": {
                color: "#efefef",
              },
            }}
            disabled
            max={5}
            value={0}
            emptyIcon={
              <Box>
                <Glyph code="ghost" iconType="thin" size={36} fullWidth />
              </Box>
            }
          />
        </Box>
      </Box>
    </Box>
  </DiaryCard>
);

export default DayFeelingsSelectorSkeleton;
