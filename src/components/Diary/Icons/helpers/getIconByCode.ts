import appIcons, { TIcon } from "../../../../__mock__/icons";

const getIconByCode = (iconsCode: string) => {
  return appIcons.find((i) => iconsCode === i.code);
};

export default getIconByCode;
