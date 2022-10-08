import React, { FC } from "react";
import { Box, Rating, Typography } from "@mui/material";
import Glyph from "../../../Glyph";
import { styled } from "@mui/material/styles";
import SectionCard from "../SectionCard";
import SkeletonCard from "../SkeletonCard";
import { useDiaryContext } from "../../../../context/DiaryContext";

const DayFeelingsCard: FC = () => {
  const { day, makeDayMutation } = useDiaryContext();

  const { score } = day || {};

  const handleRatingChange = (value: number | null, type: string) => {
    value &&
      makeDayMutation?.({
        score: {
          ...score,
          [type]: value,
        },
      });
  };

  if (!day) {
    return <SkeletonCard height={175} />;
  }

  return (
    <SectionCard minHeight={170} title="Feelings">
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
        width="100%"
      >
        <Box>
          <Typography variant="subtitle1" color="#777e89" fontWeight={300}>
            Health
          </Typography>
          <Box pt={1}>
            <HealthRating
              max={5}
              value={score?.health || 2.5}
              onChange={(event, value) => handleRatingChange(value, "health")}
              precision={0.5}
              emptyIcon={
                <Box>
                  <Glyph code="heart" iconType="thin" size={26} fullWidth />
                </Box>
              }
              icon={
                <Box>
                  <Glyph code="heart" iconType="solid" size={26} fullWidth />
                </Box>
              }
            />
          </Box>
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            color="#777e89"
            fontWeight={300}
            textAlign="right"
          >
            Motivation
          </Typography>
          <Box pt={1}>
            <MotivationRating
              precision={0.5}
              value={score?.motivation || 2.5}
              onChange={(event, value) =>
                handleRatingChange(value, "motivation")
              }
              max={5}
              emptyIcon={
                <Box>
                  <Glyph code="bolt" iconType="thin" size={26} fullWidth />
                </Box>
              }
              icon={
                <Box>
                  <Glyph code="bolt" iconType="solid" size={26} fullWidth />
                </Box>
              }
            />
          </Box>
        </Box>
      </Box>
    </SectionCard>
  );
};

const HealthRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const MotivationRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#03c9d7",
  },
  "& .MuiRating-iconHover": {
    color: "#03a9d7",
  },
});

export default DayFeelingsCard;
