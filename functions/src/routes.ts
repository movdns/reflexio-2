import { Router } from "express";
import getOrCreateUserSettings from "./user/getOrCreateUserSettings";
import setUserSettings from "./user/setUserSettings";
import getOrCreateDay from "./day/getOrCreateDay";
import getAllDays from "./day/getDays";
import setDay from "./day/setDay";

export const routes = Router();

routes.get("/", (req, res) => {
  res.send("Welcome to Reflexio API");
});

// Days API Routes
const daysPath = "/days";
routes.get(daysPath, getAllDays); // days collection
routes.get(`${daysPath}/:date`, getOrCreateDay); // day resource
routes.post(daysPath, setDay); // day create or update

// UserSettings API Routes
const settingsPath = "/settings";
routes.get(settingsPath, getOrCreateUserSettings);
routes.post(settingsPath, setUserSettings);
