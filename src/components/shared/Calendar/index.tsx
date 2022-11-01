import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import {
  Calendar as ReactCalendar,
  CalendarTileProperties,
} from "react-calendar";
import Glyph from "../Glyph";
import dayjs from "dayjs";
import "./styles.css";

const Calendar: FC = () => {
  const { getColorsFromPalette } = useSettingsContext();
  const { days, queryDate } = useDiaryContext();

  const datesArr: string[] = [];

  const daysObj =
    days &&
    days.map((day) => {
      if (day?.date) {
        const { main: background, contrastText: color } =
          getColorsFromPalette?.(day.paletteCode) || {};

        datesArr.push(day.date);

        return {
          date: day.date,
          isFavorite: day.isFavorite,
          styles: {
            background,
            color,
            fontWeight: "bold",
          },
        };
      }
      return {};
    });

  function tileStyles({ date, view }: any) {
    if (view === "month") {
      const formattedDay = dayjs(date).format("D-MM-YY");
      if (datesArr.includes(formattedDay)) {
        const match =
          daysObj && daysObj.find((day) => formattedDay === day.date);

        const todayStyles = dayjs(date).isToday()
          ? {
              // background: "red",
            }
          : {};

        return match && { ...match?.styles, ...todayStyles };
      } else {
        if (dayjs(date).isAfter(dayjs().subtract(1, "d"))) {
          return {
            background: "transparent",
            color: "#ccc",
          };
        } else {
          return {
            background: "#eee",
          };
        }
      }
    }
    return { background: "red" };
  }

  function tileDisabled(props: CalendarTileProperties): boolean {
    const { view, date } = { ...props };
    if (view === "month") {
      return dayjs(date).isAfter(dayjs());
    }
    return false;
  }

  function tileClassName(
    props: CalendarTileProperties
  ): string | string[] | null {
    const { view, date } = { ...props };
    if (view === "month") {
      const formattedDay = dayjs(date).format("D-MM-YY");

      const isSelected = queryDate === formattedDay ? "selected" : "";

      if (datesArr.includes(formattedDay)) {
        const day = daysObj && daysObj.find((day) => formattedDay === day.date);
        const isFavorite = day?.isFavorite ? "favorite" : "";

        return [isSelected, " ", isFavorite].join("");
      }
    }
    return null;
  }

  const navigate = useNavigate();

  const tileClickHandler = (date: Date) => {
    navigate({
      pathname: dayjs(date).format("D-MM-YY"),
    });
  };

  return (
    <ReactCalendar
      showNeighboringMonth={false}
      value={new Date()}
      prevLabel={<Glyph code="chevron-left" size={16} color="#a6a6a6" />}
      nextLabel={<Glyph code="chevron-right" size={16} color="#a6a6a6" />}
      maxDetail="month"
      minDetail="month"
      showFixedNumberOfWeeks={false}
      tileClassName={tileClassName}
      // @ts-ignore
      tileStyle={tileStyles}
      tileDisabled={tileDisabled}
      onClickDay={(date: Date) => tileClickHandler(date)}
    />
  );
};

export default Calendar;
