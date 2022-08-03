import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import getIconByCode from "../../../Icons/helpers/getIconByCode";
import { TDay } from "../../../../../types";
import { useTheme } from "@mui/material/styles";

type TIconsProps = Pick<TDay, "icons"> & {
  ghost: boolean;
};

type TIcons = Pick<TDay, "icons">;

const Icons: React.FC<TIconsProps> = ({ icons, ghost }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const xxl = useMediaQuery(theme.breakpoints.up("xxl"));

  const iconsList = icons
    ? icons.map((i: any) => {
        return getIconByCode(i);
      })
    : [];

  const renderIcons = (icons: any) => {
    if (!icons) return <></>;

    const iconsLength = iconsList.length;

    const maxIconsCount = iconsList.slice(1, iconsLength).length > 1 ? 1 : 2;
    const plusVisible = maxIconsCount === 1;

    const xxlMaxIconsCount = 4; // iconsList.slice(3, iconsLength).length > 1 ? : 4;

    //  const xxlPlusVisible = xxl && xxlMaxIconsCount === 3;

    return (
      <>
        {iconsList &&
          iconsList.slice(0, xxl ? xxlMaxIconsCount : 2).map((icon: any) => (
            <Box component="span" key={Math.random()} display="flex">
              <icon.component />
            </Box>
          ))}
        {/*{xxlPlusVisible ||*/}
        {/*  (plusVisible && (*/}
        {/*    <Box*/}
        {/*      component="span"*/}
        {/*      key={Math.random()}*/}
        {/*      display="flex"*/}
        {/*      justifyContent="center"*/}
        {/*      width={24}*/}
        {/*    >*/}
        {/*      {*/}
        {/*        iconsList.slice(*/}
        {/*          xxlPlusVisible ? 3 : plusVisible ? 1 : 2,*/}
        {/*          iconsList.length*/}
        {/*        ).length*/}
        {/*      }*/}
        {/*      +*/}
        {/*    </Box>*/}
        {/*  ))}*/}
      </>
    );
  };

  return (
    <Box
      p={0}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      textAlign="right"
      width="100%"
      sx={{
        display: { xs: "none", lg: "flex" },
        paddingLeft: 0,
        borderRadius: 4,
        justifyContent: "center",
        background: "#ffffff30",
        maxWidth: {
          xl: 40,
          xxl: 80,
        },
      }}
    >
      <Box
        // width={90}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        //flexDirection={xl ? "row" : "column"}
        flexDirection={icons && icons.length <= 2 ? "column" : "row"}
        sx={{
          // opacity: selected ? 1 : 0.5,
          // "&:hover": {
          //   opacity: 1,
          // },
          "& span": {
            margin: "6px",
          },
        }}
      >
        {!ghost && iconsList ? (
          renderIcons({ iconsList })
        ) : (
          <QuestionMarkIcon />
        )}
      </Box>
    </Box>
  );
};

export default Icons;
