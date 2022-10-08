import * as Joi from "joi";

const setUserSettingsValidationSchema = Joi.object().keys({
  palette: Joi.object(),
  sentiments: Joi.object(),
  glyphs: Joi.object(),
});

export default setUserSettingsValidationSchema;
