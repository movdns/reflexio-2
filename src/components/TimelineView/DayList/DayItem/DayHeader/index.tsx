import React, { FC } from "react";
import { Divider, Typography } from "@mui/material";
import dayjs from "dayjs";

type DayHeaderProps = {
  date?: any;
};

const DayHeader: FC<DayHeaderProps> = ({ date }) => {
  if (!date) {
    return <>ghost</>;
  }

  return (
    <Divider
      sx={{ width: "100%", position: "relative" }}
      flexItem
      variant="fullWidth"
    >
      <Typography fontSize={35} fontWeight={100}>
        {dayjs(date).format("D MMM")}
      </Typography>

      <Typography
        fontSize={16}
        sx={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        fontWeight={100}
        color="darkgray"
      >
        {dayjs(date).isToday() ? "Today" : dayjs(date).fromNow()}
      </Typography>
    </Divider>
  );
};

export default DayHeader;
