import React from "react";
import TargetList from "./TargetList";
import { useDiaryContext } from "../../../context/DiaryContext";
import SkeletonCard from "../Skeleton/Card";
import getDayColorationByScore from "../../../context/helpers/getDayColorationByScore";

const RightSidebar: React.FC<{}> = () => {
  const { day, makeDayMutation } = useDiaryContext();
  if (day) {
    return (
      <>
        <TargetList
          data={day?.targets || []}
          coloration={getDayColorationByScore(day.score)}
          makeDayMutation={makeDayMutation}
        />
      </>
    );
  } else {
    return <SkeletonCard height={500} />;
  }
};

export default RightSidebar;
