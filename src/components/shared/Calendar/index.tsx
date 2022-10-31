import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSettingsContext } from "~/context/SettingsContext";
import { useDiaryContext } from "~/context/DiaryContext";
import { Calendar as ReactCalendar } from "../ReactCalendar";
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
  }

  function tileDisabled({ date, view }: { date: string; view: string }) {
    if (view === "month") {
      return dayjs(date).isAfter(dayjs());
    }
  }

  function tileClassName({ date, view }: { date: string; view: string }) {
    if (view === "month") {
      const formattedDay = dayjs(date).format("D-MM-YY");

      const isSelected = queryDate === formattedDay ? "selected" : "";

      if (datesArr.includes(formattedDay)) {
        const day = daysObj && daysObj.find((day) => formattedDay === day.date);
        const isFavorite = day?.isFavorite ? "favorite" : "";

        return [isSelected, " ", isFavorite].join("");
      }
    }
  }

  const navigate = useNavigate();
  const tileClickHandler = (date: string) => {
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
      tileStyle={tileStyles}
      tileDisabled={tileDisabled}
      onClickDay={(date: string) => tileClickHandler(date)}
    />
  );
};

export default Calendar;
