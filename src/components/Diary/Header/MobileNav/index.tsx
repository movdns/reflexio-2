import React from "react";
import { Box, Tab } from "@mui/material";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
//
// const ZeroFab = styled(Fab)({
//   position: "absolute",
//   boxShadow: "none",
//   zIndex: 1,
//   top: -10,
//   left: "-40%",
//   right: 0,
//   margin: "0 auto",
// });
//
// const StyledFab = styled(Fab)({
//   position: "absolute",
//   boxShadow: "none",
//   zIndex: 1,
//   top: -10,
//   left: 0,
//   right: 0,
//   margin: "0 auto",
// });
//
// const SecondFab = styled(Fab)({
//   position: "absolute",
//   boxShadow: "none",
//   zIndex: 1,
//   top: -10,
//   left: "40%",
//   right: 0,
//   margin: "0 auto",
// });
//
// interface StyledTabProps {
//   label: string;
// }

interface LinkTabProps {
  label?: string;
  to: string;
}

const StyledTab = styled((props: LinkTabProps) => (
  <Tab
    component={Link}
    // onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    //   event.preventDefault();
    // }}
    {...props}
  />
))(({ theme }) => ({
  textTransform: "none",
  height: 60,
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  "&.Mui-selected": {
    color: "indianred",
  },
  "&.Mui-focusVisible": {
    color: "indianred",
  },
}));

const MobileNav = ({ days }: { days: any }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        position: "fixed",
        display: "inline-flex",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 999,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
        }}
      >
        {days &&
          days.map((day: any) => {
            const formattedDate = dayjs(day.date, "D-MM-YY");
            return (
              <StyledTab
                key={Math.random()}
                label={formattedDate.format("D MMM, dddd")}
                to={`/diary/${day.date}`}
              />
            );
          })}

        {/*<StyledTab label="10 Aug" />*/}
        {/*<StyledTab label="9 Aug" />*/}
        {/*<StyledTab label="8 Aug" />*/}
        {/*<StyledTab label="7 Aug" />*/}
        {/*<StyledTab label="6 Aug" />*/}
        {/*<StyledTab label="5 Aug" />*/}
      </Tabs>
    </Box>
  );
};

export default MobileNav;
