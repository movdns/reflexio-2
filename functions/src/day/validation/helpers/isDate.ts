import * as dayjs from "dayjs";
import { CustomHelpers } from "joi";

const isDate = (value: string, helper: CustomHelpers) => {
  if (dayjs(value, "D-MM-YY", true).isValid()) {
    return value;
  } else {
    return helper.message({ custom: "Invalid date" });
  }
};

export default isDate;
