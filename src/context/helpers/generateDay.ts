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
    score: 5,
    description: {
      blocks: [
        {
          id: `${dayjs(date, "D-MM-YY").unix()}`,
          type: "header",
          data: {
            text: `<font color="#05CBD6">${dayjs(date, "D-MM-YY").format(
              "D MMMM, dddd"
            )}</font>`,
            level: 1,
          },
        },
      ],
      time: dayjs(date, "D-MM-YY").unix(),
    },
    icons: [],
  };
};

export default generateDay;
