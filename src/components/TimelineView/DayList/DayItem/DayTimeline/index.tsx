import React, { FC } from "react";
import Timeline from "@mui/lab/Timeline";
import TimeLineItem from "~/components/shared/Timeline/TimelineItem";
import Glyph from "~/components/shared/Glyph";
import Grid from "@mui/material/Unstable_Grid2";
import MomentItem from "~/components/TimelineView/MomentList/MomentItem";
import { MomentsT } from "~/components/TimelineView/DayList";
import dayjs from "dayjs";
import { genUniqueId } from "~/helpers/genUniqueId";

type DayTimelineProps = {
  date?: any;
  color?: string;
  moments?: MomentsT[];
};

const DayTimeline: FC<DayTimelineProps> = ({ moments, date, color }) => {
  const existingHoursArr = moments?.map((moment) =>
    dayjs(moment.createdAt).format("H")
  );
  const existingHoursSet = new Set(existingHoursArr);

  const momentGroups: { [key: string]: MomentsT[] } = {};

  moments &&
    moments.forEach((moment) => {
      const momentHour = dayjs(moment.createdAt).format("H");
      if (!momentGroups[momentHour]) {
        momentGroups[momentHour] = [];
      }
      if ([...Array.from(existingHoursSet)].includes(momentHour)) {
        momentGroups[momentHour].push(moment);
      }
    });

  const isChainColored = false;

  if (!moments || !momentGroups) {
    return <>loading</>;
  }
  return (
    <Timeline>
      {dayjs(date).isToday() && (
        <TimeLineItem
          chainColor={color || "primary.main"}
          chainGlyph={<Glyph code="chevron-right" iconType="solid" />}
        >
          <MomentItem
            editMode
            color={color}
            tag={{ type: "glyph", icon: "question" }}
          />
        </TimeLineItem>
      )}
      {momentGroups && Object.keys(momentGroups).length ? (
        Object.keys(momentGroups).map((hour) => {
          return (
            <TimeLineItem
              key={genUniqueId()}
              title={`${hour}:00`}
              //chainColor="#e8e8e8"
              // titleColor="#bbb"
              chainColor={isChainColored ? color : "#e8e8e8"}
              titleColor={isChainColored ? color : "cadetblue"}
              actions={<Glyph code="plus" size={30} iconType="light" />}
            >
              <Grid container spacing={3}>
                {momentGroups[hour]
                  .sort(
                    (a, b) =>
                      dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
                  )
                  .map((moment) => {
                    const {
                      image,
                      createdAt,
                      color: momentColor,
                      tag,
                      description,
                    } = {
                      ...moment,
                    };
                    const isEditMode =
                      dayjs(createdAt).unix() === dayjs(1669166128).unix();

                    return (
                      <MomentItem
                        editMode={isEditMode}
                        key={genUniqueId()}
                        tag={tag}
                        image={image}
                        color={momentColor || color || "#ddd"}
                        createdAt={createdAt}
                        description={description}
                      />
                    );
                  })}
              </Grid>
            </TimeLineItem>
          );
        })
      ) : (
        <TimeLineItem
          chainColor={color || "primary.main"}
          chainGlyph={<Glyph code="chevron-right" iconType="solid" />}
        >
          <MomentItem
            editMode
            color={color}
            tag={{ type: "glyph", icon: "question" }}
          />
        </TimeLineItem>
      )}
    </Timeline>
  );
};

export default DayTimeline;
