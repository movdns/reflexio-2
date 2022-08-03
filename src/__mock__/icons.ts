import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import CoffeeIcon from "@mui/icons-material/Coffee";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import MedicationIcon from "@mui/icons-material/Medication";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import HikingIcon from "@mui/icons-material/Hiking";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import React from "react";

export type TIcon = {
  alias: string;
  code: string;
  component: any;
};

const icons = <TIcon[]>[
  {
    alias: "Coffee",
    code: "coffee",
    component: CoffeeIcon,
  },
  {
    alias: "Nicotine",
    code: "nicotine",
    component: SmokingRoomsIcon,
  },

  {
    alias: "Alcohol",
    code: "alcohol",
    component: SportsBarIcon,
  },
  {
    alias: "Walking",
    code: "walk",
    component: DirectionsWalkIcon,
  },
  {
    alias: "Running",
    code: "run",
    component: DirectionsRunIcon,
  },
  {
    alias: "Biking",
    code: "bike",
    component: DirectionsBikeIcon,
  },
  {
    alias: "Hiking",
    code: "hike",
    component: HikingIcon,
  },
  {
    alias: "Gym",
    code: "gym",
    component: FitnessCenterIcon,
  },
  {
    alias: "Mind boosters / Nootropics",
    code: "nootropics",
    component: PsychologyIcon,
  },
  {
    alias: "Pills / Medicine",
    code: "pills",
    component: MedicationIcon,
  },
  {
    alias: "Drugs",
    code: "drugs",
    component: AutoFixHighIcon,
  },
];

export default icons;
