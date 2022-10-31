import * as Joi from "joi";
import isDate from "./helpers/isDate";

const setDayValidationSchema = Joi.object().keys({
  id: Joi.string(),
  uid: Joi.string(),
  date: Joi.string().required().custom(isDate),
  isFavorite: Joi.boolean(),
  paletteCode: Joi.string(),
  mood: Joi.object(),
  metrics: Joi.object(),
  description: Joi.array(),
  sentiments: Joi.object(),
  todo: Joi.array(),
});

export default setDayValidationSchema;
