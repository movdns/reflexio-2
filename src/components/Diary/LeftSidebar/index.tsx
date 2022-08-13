import React, { useEffect } from "react";
import SkeletonCard from "../Skeleton/Card";
import { Card } from "@mui/material";
import { useDiaryContext } from "../../../context/DiaryContext";
import Glyphs from "../Glyphs";
import { useIconsContext } from "../../../context/IconContext";

const LeftSidebar = () => {
  const { day, loadingDay, updateDayState } = useDiaryContext();
  const { glyphs, loadingIcons } = useIconsContext();

  //console.log(day?.icons);
  // useEffect(() => {}, [day]);

  if (loadingIcons || loadingDay) {
    return (
      <Card>
        <SkeletonCard height={800} />
      </Card>
    );
  }

  return (
    <>
      <Card>
        <Glyphs
          data={glyphs}
          selectedIcons={day?.icons}
          updateDay={updateDayState}
        />
      </Card>
    </>
  );
  // return <SkeletonCard height={360} />;
};

export default LeftSidebar;
