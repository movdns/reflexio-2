import { TDay } from "../../types";

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
    // description: {
    //   blocks: [
    //     {
    //       id: `${dayjs(date, "D-MM-YY").unix()}`,
    //       type: "header",
    //       data: {
    //         text: `<font color="#05CBD6">${dayjs(date, "D-MM-YY").format(
    //           "D MMMM, dddd"
    //         )}</font>`,
    //         level: 1,
    //       },
    //     },
    //   ],
    //   time: dayjs(date, "D-MM-YY").unix(),
    // },
    icons: ["face-expressionless"],
  };
}

export default generateDay;
