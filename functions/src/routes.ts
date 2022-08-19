import { Router } from "express";
import getAllDays from "./day/getDays";
import getDay from "./day/getDay";
import setDay from "./day/setDay";
import getIconsGroups from "./icons/getIconsGroups";
import getIconsGroup from "./icons/getIconsGroup";
import setIconsGroup from "./icons/setIconsGroup";

export const routes = Router();

routes.get("/", (req, res) => {
  res.send("Welcome to Reflexio API");
});

// Days API Routes
const daysPath = "/days";

routes.get(daysPath, getAllDays); // days collection
routes.get(`${daysPath}/:date`, getDay); // day resource
routes.post(daysPath, setDay); // day create or update

// Icons API Routes
const iconsPath = "/icons";

routes.get(iconsPath, getIconsGroups);
routes.get(`${iconsPath}/:id`, getIconsGroup);
routes.post(iconsPath, setIconsGroup); // day create or update
