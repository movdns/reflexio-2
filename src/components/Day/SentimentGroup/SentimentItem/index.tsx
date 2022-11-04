import React, { FC, useCallback, useEffect, useState } from "react";
import GlyphGroupButton from "~/components/shared/Glyph/GlyphButtonGroup";
import { TSentiment, TSentimentData } from "root/types/day";
import ColorButton from "~/components/shared/ColorButton";
import TagGroup from "~/components/shared/Tag/TagGroup";
import DaySentimentItemSkeleton from "./Skeleton";
import DiaryCard from "~/components/shared/Card";
import useDebounce from "~/hooks/useDebounce";
import hash from "object-hash";
import {
  TTUserSettingsPaletteData,
  TUserSettingsSentimentData,
} from "root/types/userSettings";
import {
  Box,
  CardContent,
  Divider,
  Grid,
  Tab,
  Tabs,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Slider as SnapSlider } from "@lifarl/react-scroll-snap-slider";

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
  const { glyphs: dayGlyphs, tags: dayTags, description } = sentimentData || {};
  const { glyphs: availableGlyphs, tags: availableTags } = sentimentSettings;

  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.up("xl"));

  const [descriptionValue, setDescriptionValue] = useState(description);

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionValue(event.target.value);
  };

  const debounceDescription = useDebounce(descriptionValue, 1000);

  useEffect(() => {
    if (hash(debounceDescription || "") !== hash(description || "")) {
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

  const calcTotalPoints = () => {
    return dayGlyphs && dayTags ? dayGlyphs?.length + dayTags?.length : 0;
  };

  const xs = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  if (!sentimentCode || !sentimentSettings) {
    return <DaySentimentItemSkeleton vertical />;
  }

  const horizontal = true;

  return (
    <DiaryCard colors={colors} boxProps={{ p: 0 }}>
      {/*<Box*/}
      {/*  display="flex"*/}
      {/*  justifyContent="space-between"*/}
      {/*  alignItems="center"*/}
      {/*  position="relative"*/}
      {/*  p={{ xs: 3, md: 4 }}*/}
      {/*  pb={0}*/}
      {/*>*/}
      {/*  <Box>*/}
      {/*    <Typography*/}
      {/*      textTransform="capitalize"*/}
      {/*      variant="h3"*/}
      {/*      color={colors?.main}*/}
      {/*      borderBottom={`1px solid ${colors?.main}`}*/}
      {/*      pb={0.5}*/}
      {/*      fontWeight={100}*/}
      {/*    >*/}
      {/*      {sentimentSettings.label}*/}
      {/*    </Typography>*/}
      {/*  </Box>*/}

      {/*  <Box position="absolute" right={10} top={10}>*/}
      {/*    <ColorButton*/}
      {/*      colors={colors}*/}
      {/*      sx={{ paddingLeft: 1, paddingRight: 1 }}*/}
      {/*      outlined*/}
      {/*      disabled*/}
      {/*    >*/}
      {/*      <Typography*/}
      {/*        variant="subtitle1"*/}
      {/*        fontWeight={500}*/}
      {/*        fontSize="0.8rem"*/}
      {/*        color={colors?.main}*/}
      {/*      >*/}
      {/*        {calcTotalPoints()}*/}
      {/*      </Typography>*/}
      {/*    </ColorButton>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      <Box p={{ xs: 3, md: 4 }} position="relative">
        <Box mb={2}>
          <GlyphGroupButton
            size={xs ? 34 : 36}
            maxVisible={xs ? 12 : 10}
            groupCode={sentimentCode}
            glyphs={availableGlyphs}
            selectedGlyphs={dayGlyphs}
            onSelect={handleSelect}
          />
        </Box>

        <Divider orientation="horizontal" flexItem sx={{ mr: "-1px" }}>
          <Typography variant="subtitle2" color="gray" />
        </Divider>

        <Box height={90}>
          <Box
            position="absolute"
            // display="flex"
            //flexWrap="wrap"
            overflow="scroll"
            whiteSpace="nowrap"
            width="100vw"
            py={3}
            left={-24}
            display="flex"
          >
            <TagGroup
              tags={availableTags}
              selectedTags={dayTags}
              onSelect={handleSelect}
              colors={colors}
            />
          </Box>
        </Box>

        <Divider orientation="horizontal" flexItem sx={{ mr: "-1px" }}>
          <Typography variant="subtitle2" color="gray" />
        </Divider>

        <Box mt={3}>
          <TextField
            label="Few words about your feelings"
            multiline
            fullWidth
            size="medium"
            placeholder="Few words"
            minRows={xs ? 1 : 6}
            value={descriptionValue}
            onChange={handleChangeDescription}
            sx={{
              "& label.Mui-focused": {
                color: "#0009",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  //  borderColor: "#E0E0E0",
                  borderColor: colors?.main,
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors?.main,
                },
              },
            }}
          />
        </Box>
      </Box>
    </DiaryCard>
  );
};

export default DaySentimentItem;
