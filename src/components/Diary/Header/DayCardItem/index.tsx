import React from "react";
import dayjs from "dayjs";
import {
  Grid,
  CardContent,
  Typography,
  Box,
  Card,
  CardActionArea,
  useMediaQuery,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useTheme } from "@mui/material/styles";
import isToday from "dayjs/plugin/isToday";
import customParseFormat from "dayjs/plugin/customParseFormat";
import getIconByCode from "../../Icons/helpers/getIconByCode";
import getCardColor from "./helpers/getCardColor";
import { Link } from "react-router-dom";

import Glyph from "../../Glyphs/Glyph";
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
  color,
  icons,
  score,
  selected,
}) => {
  const ghost = !icons && !score;

  const { getSelectedIconsByGroup, getIconByScore } = useIconsContext();

  const formattedDate = dayjs(date, "D-MM-YY");

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const xxl = useMediaQuery(theme.breakpoints.up("xxl"));

  const mood = icons && getIconByScore?.(score);
  const positive = getSelectedIconsByGroup?.(icons, "negative");

  // const { getIconByScore } = useIconsContext();

  //const icc = getIconByScore?.(score);

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
        // raised={selected}
        color={ghost ? "ghost" : getCardColor(score)}
        sx={{
          position: "relative",
          "&:after": selected
            ? {
                content: "''",
                position: "absolute",
                left: "10%",
                bottom: 0,
                borderLeft: "12px solid transparent",
                borderRight: "12px solid transparent",
                borderBottom: `12px solid #FAFBFB`,
                clear: "both",
              }
            : {},
        }}
      >
        <CardActionArea component={Link} to={`/diary/${date}`}>
          <CardContent sx={{ padding: { xs: 1 } }}>
            <Box //height={80}
              display="flex"
              alignItems="center"
            >
              <Grid container sx={{ justifyContent: "space-between" }}>
                <Box
                  component={Grid}
                  item
                  sx={{
                    // display: { sm: "none", md: "flex", lg: "flex" },
                    paddingLeft: 0,
                    // position: "relative",
                    // "&:before": {
                    //   content: "''",
                    //   position: "absolute",
                    //   zIndex: 1,
                    //   width: 170,
                    //   height: 170,
                    //   background: "#ffffff30",
                    //   borderRadius: "50%",
                    //   top: -40,
                    //   left: -50,
                    //   opacity: 0.5,
                    // },
                  }}
                >
                  <Box p={1}>
                    <Typography variant="h6">
                      {formattedDate.format("D MMMM")}
                    </Typography>
                    <Typography variant="subtitle2">
                      {formattedDate.format("dddd")}
                    </Typography>
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
                  {mood && (
                    <Box>
                      <Glyph code={mood.code} size={32} iconType="thin" />
                    </Box>
                  )}

                  {/*{selected &&*/}
                  {/*  positive &&*/}
                  {/*  positive.slice(0, 2).map((i: any) => (*/}
                  {/*    <Box p={1}>*/}
                  {/*      <Glyph*/}
                  {/*        code={i.code}*/}
                  {/*        iconType="thin"*/}
                  {/*        fullWidth*/}
                  {/*        size={25}*/}
                  {/*      />*/}
                  {/*    </Box>*/}
                  {/*  ))}*/}

                  {/*<Icons icons={icons} ghost={ghost} />*/}
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
