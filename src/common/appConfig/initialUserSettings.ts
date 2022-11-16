import { TUserSettings } from "../../../types/userSettings";
import initialPalette from "./initialPalette";

const initialUserSettings: TUserSettings = {
  palette: initialPalette,
  mood: {
    negative: {
      score: 1,
      label: "...",
      paletteCode: "negative",
      glyphCode: "face-pensive",
    },
    danger: {
      score: 2,
      label: "Meh...",
      paletteCode: "danger",
      glyphCode: "face-unamused",
    },
    neutral: {
      score: 3,
      label: "Routine",
      paletteCode: "neutral",
      glyphCode: "face-meh",
    },
    positive: {
      score: 4,
      label: "Good",
      paletteCode: "positive",
      glyphCode: "face-smile-relaxed",
    },
    special: {
      score: 5,
      label: "Awesome!",
      paletteCode: "special",
      glyphCode: "face-awesome",
    },
  },
  sentiments: {
    positive: {
      label: "Positive side",
      order: 1,
      glyphs: [
        "sushi",
        "donut",
        "dolphin",
        "soft-serve",
        "person-hiking",
        "person-running",
        "person-walking",
        "person-swimming",
        "bowling-ball-pin",
        "person-biking-mountain",
      ],
      tags: [
        "Chill",
        "Films",
        "Sunset",
        "Friends",
        "Camping",
        "Reading",
        "Cooking",
        "Shopping",
        "Devices detox",
      ],
    },
    negative: {
      label: "Negative side",
      order: 2,
      glyphs: [
        "smoking",
        "coffee-beans",
        "wine-glass",
        "face-thermometer",
        "joint",
        "virus-covid",
        "gamepad-modern",
        "face-sleeping",
      ],
      tags: [
        "drunk",
        "comet",
        "Fighting",
        "Junk food",
        "Explosion",
        "Bad things",
      ],
    },
    special: {
      label: "Special!",
      order: 3,
      glyphs: ["cat", "comet", "code", "star", "planet-ringed", "ufo"],
      tags: ["Dating", "Parachute jump", "Comet", "Party", "Camping"],
    },
  },
};

export default initialUserSettings;
