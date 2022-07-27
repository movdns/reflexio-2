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

dayjs.extend(customParseFormat);
dayjs.extend(isToday);

type NavCardProps = {
  index: number;
  date: any;
  color?: "ghost" | "neutral" | "positive" | "negative" | "special";
  icons?: any;
  score?: any;
};

const DayCardItem: React.FC<NavCardProps> = ({
  index,
  date,
  color,
  icons,
  score,
}) => {
  const selected = false;
  const ghost = !icons && !score;

  const formattedDate = dayjs(date, "D-MM-YY");

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const iconsList =
    icons &&
    icons.map((i: any) => {
      return getIconByCode(i);
    });

  return (
    <Box
      component={Grid}
      item
      xs={2}
      sm={2}
      md={2}
      lg={2}
      sx={{
        display: {
          xs: "none",
          sm: index < 3 ? "block" : "none",
          md: index < 3 ? "block" : "none",
          lg: "block",
        },
      }}
    >
      <Card
        elevation={selected ? 24 : 0}
        color={ghost ? "ghost" : getCardColor(score)}
      >
        <CardContent>
          <Box height={90} display="flex" alignItems="center">
            <CardActionArea href={`/diary/${date}`}>
              <Grid container sx={{ justifyContent: "space-between" }}>
                <Box component={Grid} item xs={12} md={12} lg={7}>
                  <Box p={2}>
                    <Typography variant="h6">
                      {formattedDate.format("D MMMM")}
                    </Typography>
                    <Typography>{formattedDate.format("dddd")}</Typography>
                  </Box>
                </Box>
                <Box component={Grid} item xs={0} md={0} lg={5} display="flex">
                  <Box
                    p={0}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    textAlign="right"
                    width="100%"
                    sx={{ display: { xs: "none", lg: "flex" }, paddingLeft: 0 }}
                  >
                    <Box
                      width={90}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexWrap="wrap"
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
                      {!ghost ? (
                        <>
                          {iconsList &&
                            iconsList
                              .slice(
                                0,
                                sm
                                  ? iconsList.slice(3, iconsList.length)
                                      .length > 1
                                    ? 3
                                    : 4
                                  : 2
                              )
                              .map((icon: any) => (
                                <Box
                                  component="span"
                                  key={Math.random()}
                                  display="flex"
                                >
                                  <icon.component />
                                </Box>
                              ))}
                          {sm &&
                            iconsList &&
                            iconsList.slice(3, iconsList.length).length > 1 && (
                              <Box
                                component="span"
                                key={Math.random()}
                                display="flex"
                                justifyContent="center"
                                width={24}
                              >
                                {
                                  icons.slice(sm ? 3 : 2, iconsList.length)
                                    .length
                                }
                                +
                              </Box>
                            )}
                        </>
                      ) : (
                        <QuestionMarkIcon />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </CardActionArea>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DayCardItem;
