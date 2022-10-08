import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Skeleton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GlyphGroupButton, {
  GlyphButtonGroupSkeleton,
} from "../../../../Glyph/GlyphButtonGroup";
import TagGroup, { TagGroupSkeleton } from "../../../../Tag/TagGroup";
import {
  TSentiment,
  TSentimentData,
  TTUserSettingsPaletteData,
  TUserSettingsSentimentData,
} from "../../../../../types";
import useDebounce from "../../../../../hooks/useDebounce";
import hash from "object-hash";
import DiaryCard from "../../../Card";

type DaySentimentItemProps = {
  sentimentCode: string;
  sentimentData: TSentimentData;
  sentimentSettings: TUserSettingsSentimentData;
  colors?: TTUserSettingsPaletteData | null;
  handleMutation: (data: TSentiment) => void;
};

const DaySentimentItem: FC<DaySentimentItemProps> = ({
  sentimentCode,
  sentimentData,
  sentimentSettings,
  colors,
  handleMutation,
}) => {
  const { glyphs: dayGlyphs, tags: dayTags, description } = sentimentData;
  const { glyphs: availableGlyphs, tags: availableTags } = sentimentSettings;

  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("xl"));

  const [descriptionValue, setDescriptionValue] = useState(description);

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionValue(event.target.value);
  };

  const debounceDescription = useDebounce(descriptionValue, 1000);

  useEffect(() => {
    if (
      debounceDescription &&
      description &&
      hash(debounceDescription) !== hash(description)
    ) {
      handleMutation({
        [sentimentCode]: {
          ...sentimentData,
          description: debounceDescription,
        },
      });
    }
  }, [
    description,
    debounceDescription,
    handleMutation,
    sentimentCode,
    sentimentData,
  ]);

  const handleSelect = useCallback(
    (data: TSentimentData) => {
      sentimentCode &&
        handleMutation({
          [sentimentCode]: {
            ...sentimentData,
            glyphs: data?.glyphs || dayGlyphs,
            tags: data?.tags || dayTags,
          },
        });
    },
    [dayGlyphs, dayTags, handleMutation, sentimentCode, sentimentData]
  );

  if (!sentimentData || !sentimentCode || !sentimentSettings) {
    return <DaySentimentItemSkeleton />;
  }

  return (
    <DiaryCard variant="outlined" colors={colors} p={0}>
      <CardHeader
        title={
          <Typography textTransform="capitalize" variant="h3">
            {sentimentSettings.label}
          </Typography>
        }
        subheader={sentimentSettings.subLabel}
      />
      <CardContent>
        <Grid item container direction={lg ? "row" : "column"}>
          <Grid item xs={6} pr={lg ? 3 : 0} pb={lg ? 0 : 3}>
            <TextField
              label="Few words about your feelings"
              multiline
              fullWidth
              size="medium"
              placeholder="Few words"
              minRows={5}
              value={descriptionValue}
              onChange={handleChangeDescription}
              sx={{
                "& label.Mui-focused": {
                  color: "#0009",
                },
                // "& .MuiInput-underline:after": {
                //   borderBottomColor: "yellow",
                // },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: colors?.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: colors?.main,
                  },
                },
              }}
            />
          </Grid>

          <Box
            component={Divider}
            orientation="vertical"
            flexItem
            sx={{ mr: "-1px" }}
          />
          <Grid item xs={6} alignItems="center" pl={lg ? 3 : 0}>
            <Box pb={2}>
              <GlyphGroupButton
                groupCode={sentimentCode}
                glyphs={availableGlyphs}
                selectedGlyphs={dayGlyphs}
                onSelect={handleSelect}
              />
            </Box>

            <Divider orientation="horizontal" flexItem sx={{ mr: "-1px" }}>
              <Typography variant="subtitle2" color="gray" />
            </Divider>

            <Box display="inline-flex" flexWrap="wrap" pt={2}>
              <TagGroup
                tags={availableTags}
                selectedTags={dayTags}
                onSelect={handleSelect}
                colors={colors}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </DiaryCard>
  );
};

export const DaySentimentItemSkeleton = () => (
  <Card
    sx={{
      borderTop: "4px solid #bbb",
    }}
  >
    <CardHeader
      title={<Skeleton variant="text" sx={{ fontSize: "2rem" }} width={300} />}
      subheader={
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={100} />
      }
    />
    <CardContent>
      <Grid item container>
        <Grid item xs={6} pr={3}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={150}
            sx={{ borderRadius: 2 }}
          />
        </Grid>

        <Box
          component={Divider}
          orientation="vertical"
          flexItem
          sx={{ mr: "-1px" }}
        />
        <Grid item xs={6} alignItems="center" pl={3}>
          <Box pb={2}>
            <GlyphButtonGroupSkeleton />
          </Box>

          <Divider orientation="horizontal" flexItem sx={{ mr: "-1px" }}>
            <Typography variant="subtitle2" color="gray" />
          </Divider>

          <Box display="inline-flex" flexWrap="wrap" pt={2}>
            <Box pb={2}>
              <TagGroupSkeleton />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default DaySentimentItem;
