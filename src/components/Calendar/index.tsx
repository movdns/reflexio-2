import React from "react";
// import "react-calendar/dist/Calendar.css";
import "./styles.css";
import { Calendar as ReactCalendar } from "react-calendar";
// import { CalendarProps, CalendarTileProperties } from "react-calendar";
// import { Calendar as ReactCalendar } from "../Cal";
import dayjs from "dayjs";
import { useSettingsContext } from "../../context/SettingsContext";
import Glyph from "../Glyph";
import { useDiaryContext } from "../../context/DiaryContext";
import { useNavigate } from "react-router-dom";

const CalendarA = () => {
  const { getColorsFromPalette } = useSettingsContext();
  const { days, queryDate } = useDiaryContext();

  const { main: background, secondary: color } =
    getColorsFromPalette?.("positive") || {};

  const { main: negativeBg, secondary: negativeColor } =
    getColorsFromPalette?.("special") || {};

  // const classes = {
  //   positive: ,
  // }

  //const daysDateArr = [];

  const colors = ["rgb(240, 239, 239)", "#f44336", "#00e1db", "#4CAF50"];
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const datesArr: any[] = [];
  const daysObj =
    days &&
    days.map((day) => {
      if (day?.id) {
        const { main: background, secondary: color } =
          getColorsFromPalette?.(day.paletteCode) || {};

        datesArr.push(day.date);

        return {
          date: day.date,
          isFavorite: day.isFavorite,
          styles: {
            background,
            color,
          },
        };
      }
      return {};
    });

  function tileClassName({ date, view }: any) {
    if (view === "month") {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      const formattedDay = dayjs(date).format("D-MM-YY");
      // debugger;
      if (datesArr.includes(formattedDay)) {
        const hehe =
          daysObj && daysObj.find((day) => formattedDay === day.date);

        const todayStyles = dayjs(date).isToday()
          ? {
              fontWeight: "bold",
            }
          : {};

        return hehe && { ...hehe?.styles, ...todayStyles };
      } else {
        if (dayjs(date).isAfter(dayjs().subtract(1, "d"))) {
          return {
            background: "transparent",
            // outline: "1px dashed #ccc",
            color: "#ccc",
          };
        } else {
          return {
            background: "transparent",
            outline: "1px dashed #ccc",
            // color: "#ccc",
          };
        }
      }
    }
  }

  function tileDisabled({ date, view }: any) {
    if (view === "month") {
      return dayjs(date).isAfter(dayjs());
    }
  }

  function tileClass({ date, view }: any) {
    if (view === "month") {
      const formattedDay = dayjs(date).format("D-MM-YY");

      const isSelected = queryDate === formattedDay && "selected";

      if (datesArr.includes(formattedDay)) {
        const day = daysObj && daysObj.find((day) => formattedDay === day.date);
        // console.log(day?.isFavorite);
        const isFavorite = day?.isFavorite && "favorite";

        return [isSelected, " ", isFavorite].join("");
      }
    }
  }

  const navigate = useNavigate();
  const tileClickHandler = (date: any) => {
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
      //value={dayjs().subtract(1, "M").toDate()}
      // showDoubleView={true}
      maxDetail="month"
      minDetail="month"
      showFixedNumberOfWeeks={false}
      //@ts-ignore
      tileClassName={tileClass}
      tileStyle={tileClassName}
      //@ts-ignore
      tileDisabled={tileDisabled}
      onClickDay={(date: any) => tileClickHandler(date)}
    />
  );
};

export default CalendarA;
