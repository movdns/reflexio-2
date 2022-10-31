import * as Joi from "joi";

const setUserSettingsValidationSchema = Joi.object().keys({
  mood: Joi.object(),
  palette: Joi.object(),
  sentiments: Joi.object(),
});

export default setUserSettingsValidationSchema;
