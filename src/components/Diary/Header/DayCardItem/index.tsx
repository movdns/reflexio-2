import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  Grid,
  CardContent,
  Typography,
  Box,
  Card,
  CardActionArea,
} from "@mui/material";
import isToday from "dayjs/plugin/isToday";
import customParseFormat from "dayjs/plugin/customParseFormat";
import getCardType from "./helpers/getCardType";
import Glyph from "../../LeftSidebar/Glyphs/Glyph";
import { useIconsContext } from "../../../../context/IconContext";
import getDayLeftInPercent from "./helpers/getDayLeftInPercent";
import { getMainColorByType } from "../../../../common/palette";

dayjs.extend(customParseFormat);
dayjs.extend(isToday);

type NavCardProps = {
  index: number;
  date: any;
  type?: "neutral" | "positive" | "negative" | "special" | "ghost";
  size?: "small" | "medium" | "large";
  icons?: any;
  score?: any;
  selected?: boolean;
  favorite?: boolean;
  outline?: boolean;
};

//@todo remove 'sx'
const DayCardItem: React.FC<NavCardProps> = ({
  index,
  date,
  icons,
  score,
  type,
  size,
  selected,
  favorite,
  outline,
}) => {
  //console.log(size);
  const { getIconByScore, getSelectedIconsByGroup } = useIconsContext();

  const ghost = !icons && !score;
  const formattedDate = dayjs(date, "D-MM-YY");
  const mood = getIconByScore?.(score, "mood");
  const isToday = dayjs(date, "D-MM-YY").isToday();

  const positiveIcons = getSelectedIconsByGroup?.(icons, "positive");

  return (
    <Box
      component={Grid}
      item
      xs={24}
      sm={selected || index < 2 ? 12 : 0}
      md={index > 3 ? 0 : 8}
      lg={index > 6 ? 0 : 6}
      //xl={selected ? 6 : index > 8 ? 0 : 3}
      xl={
        size === "large"
          ? 6
          : size === "medium"
          ? 3
          : size === "small"
          ? 2
          : index > 8
          ? 0
          : 3
      }
      sx={
        {
          // display: {
          //   xs: selected ? "flex" : "none",
          //   sm: selected || index < 1 ? "flex" : "none",
          //   md: index < 3 ? "flex" : "none",
          //   lg: index < 4 ? "flex" : "none",
          //   xl: index < 7 ? "flex" : "none",
          // },
        }
      }
    >
      <Card
        elevation={!selected ? 0 : 0}
        color={type || ghost ? "ghost" : getCardType(score)}
        sx={{
          // color: outline
          //   ? getMainColorByType(getCardType(score) || "neutral")
          //   : "inherit",
          // outline: outline ? "2px solid" : "none",
          // bgcolor: selected ? "primary.main" : "",
          // color: selected ? "primary.contrastText" : "",
          position: "relative",
          "&:before": isToday
            ? {
                content: "''",
                fontSize: 15,

                position: "absolute",
                background: "#ffffff30",
                width: `${100 - getDayLeftInPercent()}%`,
                height: "100%",
                right: 0,
              }
            : {},

          "&:after": selected
            ? {
                content: "''",
                position: "absolute",
                left: size === "small" ? "50%" : "20%",
                transform: `translateX(${size === "small" ? "-50%" : "-20%"})`,
                bottom: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderBottom: `12px solid #f7f7f7`,
                clear: "both",
              }
            : {},
        }}
      >
        <CardActionArea component={Link} to={`/diary/${date}`}>
          <CardContent sx={{ padding: { xs: 1 } }}>
            <Box display="flex" alignItems="center">
              <Box
                component={Grid}
                container
                justifyContent={size === "small" ? "center" : "space-between"}
              >
                <Box
                  component={Grid}
                  item
                  sx={{
                    paddingLeft: 0,
                  }}
                >
                  <Box p={1}>
                    {isToday ? (
                      <>
                        <Box display="inline-flex" alignItems="baseline">
                          <Typography variant="h6">Today</Typography>
                          {favorite && (
                            <Glyph
                              code="bookmark"
                              size={14}
                              iconType="duotone"
                              fullWidth
                            />
                          )}
                          {selected && (
                            <Typography
                              variant="subtitle2"
                              sx={{ marginLeft: 1, opacity: 0.5 }}
                            >
                              {100 - getDayLeftInPercent()}% left
                            </Typography>
                          )}
                        </Box>

                        <Typography variant="subtitle2">
                          {formattedDate.format("D, dddd")}
                        </Typography>
                      </>
                    ) : (
                      <Box textAlign={size === "small" ? "center" : "left"}>
                        <Typography variant="h6" mr={size === "small" ? 0 : 1}>
                          {formattedDate.format("D ddd")}
                          {favorite && (
                            <Glyph
                              code="bookmark"
                              size={14}
                              iconType="duotone"
                              fullWidth
                            />
                          )}
                        </Typography>
                        <Typography variant="subtitle2">
                          {formattedDate.format("MMMM")}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
                {size !== "small" && (
                  <Box
                    component={Grid}
                    item
                    display="flex"
                    justifyContent="end"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 2,
                      opacity: selected ? 1 : 0.7,
                      "&:hover": {
                        opacity: 1,
                      },
                      "& span": {
                        margin: "6px",
                      },
                    }}
                  >
                    {/*{size === "large" && selected && (*/}
                    {/*  <Box mr={2}>*/}
                    {/*    <Typography variant="subtitle2">{score} / 10</Typography>*/}
                    {/*  </Box>*/}
                    {/*)}*/}
                    {mood ? (
                      <Box>
                        <Glyph
                          code={mood.code}
                          size={32}
                          iconType="solid"
                          //   shadow
                        />
                      </Box>
                    ) : (
                      <Glyph code="ghost" size={32} iconType="thin" />
                    )}

                    {/*{positiveIcons &&*/}
                    {/*  positiveIcons*/}
                    {/*    .slice(0, size === "large" ? 3 : 0)*/}
                    {/*    .map((i: any) => (*/}
                    {/*      <Box key={Math.random()} ml={2}>*/}
                    {/*        <Glyph code={i.code} size={26} iconType="thin" />*/}
                    {/*      </Box>*/}
                    {/*    ))}*/}
                  </Box>
                )}
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default DayCardItem;
