import dayjs from "dayjs";
import { TDay } from "../../types";

const generateDay = ({
  date,
  uid,
}: {
  date: string;
  uid: string;
}): TDay | null => {
  if (!dayjs(date, "D-MM-YY").isValid()) {
    return null;
  }
  return {
    uid,
    date,
    score: 9,
    description: {
      blocks: [
        {
          id: `${dayjs(date, "D-MM-YY").unix()}`,
          type: "header",
          data: {
            text: `<font color="#0689D7">${dayjs(date, "D-MM-YY").format(
              "D MMMM, dddd"
            )}</font>`,
            level: 1,
          },
        },
      ],
      time: dayjs(date, "D-MM-YY").unix(),
    },
    icons: ["bike", "hike", "pills", "alcohol", "coffee"],
  };
};

export default generateDay;
