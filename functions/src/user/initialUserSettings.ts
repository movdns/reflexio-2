import { TUserSettings } from "./types";

const initialUserSettings: TUserSettings = {
  palette: {
    neutral: {
      main: "#bcd5ed",
      secondary: "#493a2c",
    },
    negative: {
      main: "#ef8899",
      secondary: "#433748",
    },
    positive: {
      secondary: "#463021",
      main: "#0bd8d1",
    },
    danger: {
      main: "#84a5bf",
      secondary: "#2d434b",
    },
    special: {
      secondary: "#05416d",
      main: "#cee97e",
    },
    custom1: {
      secondary: "#aef5e6",
      main: "#00616b",
    },
  },
  mood: {
    negative: {
      label: "wtf?",
      score: 1,
      paletteCode: "negative",
      glyphCode: "face-pensive",
    },
    danger: {
      label: "Not good",
      score: 3,
      paletteCode: "danger",
      glyphCode: "face-unamused",
    },
    neutral: {
      label: "Not good not terrible",
      score: 5,
      paletteCode: "neutral",
      glyphCode: "face-smile-relaxed",
    },
    positive: {
      label: "Good",
      score: 7,
      paletteCode: "positive",
      glyphCode: "face-meh",
    },
    special: {
      label: "Awesome!",
      score: 9,
      paletteCode: "special",
      glyphCode: "face-awesome",
    },
  },
  sentiments: {
    positive: {
      label: "Positive vibes",
      subLabel: "something positive that happened with me today",
      order: 1,
      glyphs: [
        "person-walking",
        "person-running",
        "person-hiking",
        "person-swimming",
        "person-biking-mountain",
      ],
      tags: [
        {
          label: "Friends",
        },
        {
          glyphCode: "campfire",
          label: "Camping",
        },
        {
          label: "Reading",
        },
        {
          label: "Chill",
        },
        {
          label: "Films",
        },
        {
          label: "Shopping",
        },
        {
          glyphCode: "sunset",
          label: "Sunset",
        },
        {
          glyphCode: "pizza-slice",
          label: "Cooking",
        },
        {
          label: "Devices detox",
        },
      ],
    },
    negative: {
      label: "Negative feelings",
      subLabel: "some shit that happened with me today",
      order: 2,
      glyphs: [
        "smoking",
        "wine-glass",
        "mug-hot",
        "bong",
        "person-biking-mountain",
        "gamepad-modern",
        "virus-covid",
      ],
      tags: [
        {
          label: "Fighting",
        },
        {
          label: "Junk food",
        },
        {
          glyphCode: "burst",
          label: "Explosion",
        },
        {
          label: "Bad things",
        },
        {
          glyphCode: "wine-bottle",
          label: "drunk",
        },
        {
          glyphCode: "comet",
          label: "Armageddon",
        },
      ],
    },
    special: {
      label: "Special!",
      subLabel: "things what makes me feel especially",
      order: 3,
      glyphs: ["cat", "comet", "code", "star"],
      tags: [
        {
          glyphCode: "campfire",
          label: "Dating",
        },
        {
          label: "Parachute jump",
        },
        {
          glyphCode: "comet",
          label: "Comet",
        },
        {
          glyphCode: "face-party",
          label: "Party",
        },
        {
          glyphCode: "campfire",
          label: "Camping",
        },
      ],
    },
  },
  glyphs: {
    mood: {
      label: "Emotions",
      data: [
        {
          score: 1,
          paletteCode: "negative",
          code: "face-eyes-xmarks",
          label: "Holy shit!",
        },
        {
          paletteCode: "danger",
          code: "face-confused",
          label: "Terrible :/",
          score: 3,
        },
        {
          paletteCode: "neutral",
          label: "meh",
          score: 5,
          color: "gray",
          code: "face-expressionless",
        },
        {
          paletteCode: "special",
          score: 9,
          code: "face-awesome",
          label: "Something special",
        },
        {
          paletteCode: "custom1",
          score: 2,
          code: "face-explode",
          label: "wtf??",
        },
      ],
    },
    positive: {
      label: "Positive",
      paletteCode: "positive",
      data: [
        {
          code: "person-walking",
        },
        {
          code: "person-running",
        },
        {
          code: "person-hiking",
        },
        {
          code: "person-swimming",
        },
        {
          code: "person-biking-mountain",
        },
      ],
    },
    negative: {
      label: "Negative",
      iconType: "thin",
      paletteCode: "negative",
      data: [
        {
          code: "smoking",
        },
        {
          code: "wine-glass",
        },
        {
          code: "mug-hot",
        },
        {
          code: "bong",
        },
        {
          code: "gamepad-modern",
        },
        {
          code: "virus-covid",
        },
      ],
    },
    weather: {
      label: "Weather",
      iconType: "thin",
      paletteCode: "negative",
      data: [
        {
          code: "sun",
        },
        {
          code: "moon-stars",
        },
        {
          code: "sun-cloud",
        },
        {
          code: "clouds",
        },
        {
          code: "cloud-fog",
        },
        {
          code: "cloud-bolt",
        },
        {
          code: "cloud-showers",
        },
        {
          code: "cloud-hail",
        },
        {
          code: "cloud-snow",
        },
      ],
    },
    special: {
      label: "Special",
      paletteCode: "special",
      data: [
        {
          code: "cat",
        },
        {
          code: "code",
        },
      ],
    },
  },
  tags: {
    positive: {
      label: "Positive",
      paletteCode: "positive",
      data: [
        {
          text: "Friends",
        },
        {
          glyphCode: "campfire",
          text: "Camping",
        },
        {
          text: "Reading",
        },
        {
          text: "Chill",
        },
        {
          text: "Films",
        },
        {
          text: "Shopping",
        },
        {
          glyphCode: "sunset",
          text: "Sunset",
        },
        {
          glyphCode: "pizza-slice",
          text: "Cooking",
        },
        {
          text: "Devices detox",
        },
      ],
    },
    negative: {
      label: "Negative",
      paletteCode: "negative",
      data: [
        {
          text: "Fighting",
        },
        {
          text: "Junk food",
        },
        {
          glyphCode: "burst",
          text: "Explosion",
        },
        {
          text: "Bad things",
        },
        {
          glyphCode: "wine-bottle",
          text: "drunk",
        },
        {
          glyphCode: "comet",
          text: "Armageddon",
        },
      ],
    },
    special: {
      label: "Special!",
      paletteCode: "special",
      data: [
        {
          glyphCode: "campfire",
          text: "Dating",
        },
        {
          text: "Parachute jump",
        },
        {
          glyphCode: "comet",
          text: "Comet",
        },
        {
          glyphCode: "face-party",
          text: "Party",
        },
        {
          text: "Parachute jump",
        },
        {
          glyphCode: "campfire",
          text: "Camping",
        },
      ],
    },
  },
};

// "DIY", "Camping", "Cooking", "Friends", "Party", "Books", ""
export default initialUserSettings;
