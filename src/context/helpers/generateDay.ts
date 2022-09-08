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
    favorite: false,
    description: [
      {
        type: "paragraph",
        children: [
          {
            text: " ",
          },
        ],
      },
    ],
    icons: ["face-expressionless"],
    targets: [
      {
        id: genUniqueId(),
        value: "Change me!",
        coloration: "neutral",
        selected: false,
        createdAt: new Date().getTime(),
      },
    ],
  };
}
export function genUniqueId(): string {
  // const dateStr = Date.now().toString(36); // convert num to base 36 and stringify
  const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

  return `${randomStr}`;
}

export default generateDay;
