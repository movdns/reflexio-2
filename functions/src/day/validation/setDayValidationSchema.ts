import * as Joi from "joi";
import isDate from "./helpers/isDate";

const setDayValidationSchema = Joi.object().keys({
  date: Joi.string().required().custom(isDate),
  id: Joi.string(),
  uid: Joi.string(),
  score: Joi.object(),
  mood: Joi.object(),
  sentiments: Joi.object(),
  glyphs: Joi.object(),
  paletteCode: Joi.string(),
  isFavorite: Joi.boolean(),
  description: Joi.array(),
  icons: Joi.array(),
  targets: Joi.array(),
});

export default setDayValidationSchema;
