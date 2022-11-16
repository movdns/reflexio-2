import { TDay } from "../../../types/day";

/**
 * Generate day with initial values
 * @param {string} date "D-MM-YY"
 * @param {string} id "D-MM-YY"-UID
 * @param {string} uid
 * @return {TDay | null}
 */
function genInitialDay({
  date,
  id,
  uid,
}: {
  date: string;
  id: string;
  uid: string;
}): TDay {
  return {
    uid,
    date,
    id,
    isFavorite: false,
    paletteCode: "neutral",
    mood: {
      glyphCode: "seal-question",
      paletteCode: "neutral",
      label: "Pick the mood",
    },
    metrics: {
      score: {
        mood: 3,
        health: 3,
        motivation: 3,
      },
      points: {
        todo: 0,
      },
    },
    sentiments: {
      // positive: {
      //   description: "Ride on bicycle, sundown, amazing sunset!",
      //   glyphs: ["person-walking"],
      //   tags: ["Friends", "Sunset", "Chill"],
      // },
      // negative: {
      //   description: "Broken rear shock absorber :(",
      //   glyphs: ["smoking"],
      //   tags: ["Junk food", "Explosion"],
      // },
      // special: {
      //   description: "",
      //   glyphs: [],
      //   tags: [],
      // },
    },
    todo: [
      // {
      //   id: genUniqueId(),
      //   text: "Wake up",
      //   paletteCode: "special",
      //   complete: true,
      //   createdAt: new Date().getTime(),
      // },
      // {
      //   id: genUniqueId(),
      //   text: "See sunset",
      //   paletteCode: "positive",
      //   complete: true,
      //   createdAt: new Date().getTime(),
      // },
      // {
      //   id: genUniqueId(),
      //   text: "Change me!",
      //   paletteCode: "negative",
      //   complete: false,
      //   createdAt: new Date().getTime(),
      // },
    ],
  };
}

export default genInitialDay;
