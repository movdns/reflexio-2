import * as Joi from "joi";
import isDate from "./helpers/isDate";

const setDayValidationSchema = Joi.object().keys({
  date: Joi.string().required().custom(isDate),
  id: Joi.string(),
  uid: Joi.string(),
  score: Joi.number(),
  description: Joi.array(),
  icons: Joi.array(),
});

export default setDayValidationSchema;
