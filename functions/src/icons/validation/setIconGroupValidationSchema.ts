import * as Joi from "joi";

const setIconValidationSchema = Joi.object().keys({
  id: Joi.string(),
  label: Joi.string().required(),
  order: Joi.number(),
  size: Joi.number(),
  singleSelectMode: Joi.boolean(),
  coloration: Joi.string(),
  selectedColor: Joi.string(),
  selectedColoration: Joi.string(),
  iconType: Joi.string(),
  fullWidth: Joi.boolean(),
  icons: Joi.array(),
});

export default setIconValidationSchema;
