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
import getCardColor from "./helpers/getCardColor";
import Glyph from "../../LeftSidebar/Glyphs/Glyph";
import { useIconsContext } from "../../../../context/IconContext";

dayjs.extend(customParseFormat);
dayjs.extend(isToday);

type NavCardProps = {
  index: number;
  date: any;
  color?: "ghost" | "neutral" | "positive" | "negative" | "special";
  icons?: any;
  score?: any;
  selected: boolean;
};

const DayCardItem: React.FC<NavCardProps> = ({
  index,
  date,
  icons,
  score,
  selected,
}) => {
  const ghost = !icons && !score;

  const { getIconByScore } = useIconsContext();

  const formattedDate = dayjs(date, "D-MM-YY");

  const dayLeftInPercent = (): number => {
    let start, finish, midpoint, percent, elapsed;
    start = dayjs().startOf("d").unix();
    finish = dayjs().endOf("d").unix();
    midpoint = dayjs().unix();

    elapsed = midpoint - start;
    percent = (elapsed / (finish - start)) * 100;

    return Math.round(percent);
  };

  const mood = icons && getIconByScore?.(score);
  const isToday = dayjs(date, "DD-MM-YY").isToday();

  return (
    <Box
      component={Grid}
      item
      xs={24}
      sm={selected || index < 2 ? 12 : 0}
      md={index > 3 ? 0 : 8}
      lg={index > 6 ? 0 : 6}
      xl={selected ? 6 : index > 8 ? 0 : 3}
      sx={{
        display: {
          xs: selected ? "flex" : "none",
          sm: selected || index < 1 ? "flex" : "none",
          md: index < 3 ? "flex" : "none",
          lg: index < 4 ? "flex" : "none",
          xl: index < 7 ? "flex" : "none",
        },
      }}
    >
      <Card
        elevation={!selected ? 0 : 0}
        color={ghost ? "ghost" : getCardColor(score)}
        sx={{
          position: "relative",
          "&:before": isToday
            ? {
                content: "''",
                fontSize: 15,

                position: "absolute",
                background: "#ffffff30",
                width: `${100 - dayLeftInPercent()}%`,
                height: "100%",
                right: 0,
              }
            : {},

          "&:after": selected
            ? {
                content: "''",
                position: "absolute",
                left: "10%",
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
              <Grid container sx={{ justifyContent: "space-between" }}>
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
                          {selected && (
                            <Typography
                              variant="subtitle2"
                              sx={{ marginLeft: 1, opacity: 0.5 }}
                            >
                              {100 - dayLeftInPercent()}% left
                            </Typography>
                          )}
                        </Box>

                        <Typography variant="subtitle2">
                          {formattedDate.format("D, dddd")}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="h6">
                          {formattedDate.format("D MMMM")}
                        </Typography>
                        <Typography variant="subtitle2">
                          {formattedDate.format("dddd")}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
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
                  {selected && (
                    <Box mr={2}>
                      <Typography variant="subtitle2">{score} / 10</Typography>
                    </Box>
                  )}
                  {mood && (
                    <Box>
                      <Glyph code={mood.code} size={32} iconType="thin" />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default DayCardItem;
