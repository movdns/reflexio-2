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
import Icons from "./Icons";

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

  const formattedDate = dayjs(date, "D-MM-YY");

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const xxl = useMediaQuery(theme.breakpoints.up("xxl"));

  return (
    <Box
      component={Grid}
      item
      xs={2}
      sm={2}
      md={2}
      lg={3}
      sx={{
        display: {
          xs: "none",
          sm: index < 3 ? "flex" : "none",
          md: index < 3 ? "flex" : "none",
          lg: "flex",
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
                left: "20%",
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
                    display: { xs: "none", md: "flex", lg: "flex" },
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
                    <Typography variant="body2">
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
                    opacity: selected ? 1 : 0.5,
                    "&:hover": {
                      opacity: 1,
                    },
                    "& span": {
                      margin: "6px",
                    },
                  }}
                >
                  <Icons icons={icons} ghost={ghost} />
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
