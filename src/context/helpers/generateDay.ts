import { TDay } from "../../types";
import dayjs from "dayjs";

/**
 * Generate day with initial values
 * @param {string} date - "D-MM-YY"
 * @param {string} uid
 * @return {TDay | null}
 */
function generateDay({ date, uid }: { date: string; uid: string }): TDay {
  return {
    uid,
    date,
    score: 5,
    description: [
      // {
      //   type: "heading-one",
      //   children: [
      //     {
      //       text: `${dayjs(date, "D-MM-YY").format("D MMMM, dddd")}`,
      //       highlight: true,
      //     },
      //   ],
      // },
      {
        type: "paragraph",
        children: [
          {
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
          },
          { text: "bold", bold: true },
          {
            text: ", or add a  rendered block quote in the middle of the page, like this:",
          },
        ],
      },
      {
        type: "paragraph",
        align: "center",
        children: [{ text: "Try it out for yourself!" }],
      },
    ],

    // blocks: [
    //   {
    //     id: `${dayjs(date, "D-MM-YY").unix()}`,
    //     type: "header",
    //     data: {
    //       text: `<font color="#05CBD6">${dayjs(date, "D-MM-YY").format(
    //         "D MMMM, dddd"
    //       )}</font>`,
    //       level: 1,
    //     },
    //   },
    // ],
    // time: dayjs(date, "D-MM-YY").unix(),

    icons: ["face-expressionless"],
  };
}

export default generateDay;
