import * as Joi from "joi";
import isDate from "./helpers/isDate";

const getDayValidationSchema = Joi.object().keys({
  date: Joi.string().required().custom(isDate),
});

export default getDayValidationSchema;
