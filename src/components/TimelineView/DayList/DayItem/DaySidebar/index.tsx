import React, { FC } from "react";
import { Badge, Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import Glyph from "~/components/shared/Glyph";
import { StickyContainer, Sticky } from "react-sticky";
import { DayT, TagT } from "~/components/TimelineView/DayList";
import TagTile from "~/components/shared/Tag/TagTile";
import image from "~/common/assets/images/post.png";
import StickyBox from "react-sticky-box";
import { genUniqueId } from "~/helpers/genUniqueId";

type DaySidebarProps = Pick<DayT, "color" | "moments" | "tag"> & {};

const DaySidebar: FC<DaySidebarProps> = ({ tag, color, moments }) => {
  const tagsArr =
    moments &&
    moments.map((moment) => ({
      color: moment.color,
      ...moment.tag,
    }));

  // Count duplicates
  const countDict = tagsArr.reduce((acc, curr) => {
    const { icon } = curr;
    if (acc[icon]) ++acc[icon];
    else acc[icon] = 1;
    return acc;
  }, {});

  // Assign "count" field to tags array
  const result = tagsArr.map((obj) => {
    obj["count"] = countDict[obj.icon];
    return obj;
  });

  // Assign "count" field to tags array
  const uniqueTags = [];
  const countedTags = result.filter(
    (element): (TagT & { count: number }) | boolean => {
      const isDuplicate = uniqueTags.includes(element.icon);

      if (!isDuplicate) {
        uniqueTags.push(element.icon);

        return true;
      }

      return false;
    }
  );

  return (
    <StickyBox offsetTop={20} offsetBottom={20}>
      <Box py={2}>
        <Card elevation={1}>
          <Box
            sx={{
              position: "relative",
              width: "100%",
            }}
          >
            <Box height={180} borderRadius={3} bgcolor={color} />
            {/*<CardMedia*/}
            {/*  component="img"*/}
            {/*  image={image}*/}
            {/*  height={180}*/}
            {/*  sx={{ borderRadius: 3, filter: "brightness(0.7)" }}*/}
            {/*/>*/}
            <Box
              position="absolute"
              left={18}
              bottom={18}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TagTile
                inverted
                outlined
                color={color}
                tagProps={{
                  icon: tag?.icon,
                  type: "glyph",
                }}
                size="large"
                onClick={() => console.log("tile pidor")}
              />
            </Box>

            <Box
              position="absolute"
              left={0}
              top={24}
              px={2.5}
              height={40}
              bgcolor="white"
              borderRadius="0 8px 8px 0"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography fontSize={18} fontWeight={100}>
                {tag?.label || "Day #17"}
              </Typography>
            </Box>

            <Box
              position="absolute"
              right={24}
              top={0}
              p={countedTags ? 1 : 0}
              bgcolor="white"
              borderRadius="0 0 8px 8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color={color || "primary.main"}
            >
              <Glyph code="gear" size={20} iconType="solid" />
            </Box>
          </Box>
          <Stack
            p={countedTags?.length ? 1 : 0}
            direction="row"
            flexWrap="wrap"
            gap={1}
            justifyContent="end"
          >
            {countedTags &&
              countedTags.map(
                (tag: TagT & { count: number; color: string }) => {
                  const { label, type, icon, count, color } = {
                    ...tag,
                  };
                  const firstChar =
                    label &&
                    label
                      .trim()
                      .split(" ")
                      .map((e) => e.charAt(0).toUpperCase())
                      .join("");

                  return (
                    <Badge
                      key={genUniqueId()}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      invisible={count < 2}
                      badgeContent={count}
                      sx={{
                        "& .MuiBadge-badge": {
                          right: 4,
                          top: 4,
                          //border: `1px solid`,
                          padding: "0 4px",
                          bgcolor: color,
                          color: "white",
                        },
                      }}
                    >
                      <TagTile color={color} tagProps={tag} size="small" />
                    </Badge>
                  );
                }
              )}
          </Stack>
        </Card>
      </Box>
    </StickyBox>
  );
};

export default DaySidebar;
