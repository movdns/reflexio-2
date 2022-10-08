import { TDay } from "../../types";

/**
 * Generate day with initial values
 * @param {string} date - "D-MM-YY"
 * @param {string} uid
 * @return {TDay | null}
 */
function generateDay({ date, uid }: { date: string; uid: string }): TDay {
  return {
    uid,
    date,
    score: {
      general: 5,
      mood: 5,
      health: 5,
      motivation: 5,
    },
    isFavorite: false,
    paletteCode: "special",
    mood: {
      glyphCode: "face-expressionless",
      paletteCode: "neutral",
      label: "Meh :|",
    },
    sentiments: {
      positive: {
        description: "Ride on bicycle, sundown, amazing sunset!",
        glyphs: ["person-walking", "mushroom", "cannabis"],
        tags: ["Friends", "Sunset", "Chill"],
      },
      negative: {
        description: "Broken rear shock absorber :(",
        glyphs: ["smoking", "cup-togo"],
        tags: ["Junk food", "Explosion"],
      },
      special: {
        description: "Nothing special :/",
        glyphs: ["code", "cat"],
        tags: ["Dating", "Comet"],
      },
    },
    // glyphs: {
    //   mood: "face-expressionless",
    //   positive: ["walk", "person-biking-mountain"],
    //   negative: ["smoking", "mug-hot"],
    // },
    // icons: ["face-expressionless"],
    targets: [
      {
        id: genUniqueId(),
        value: "Change me!",
        coloration: "neutral",
        selected: false,
        createdAt: new Date().getTime(),
      },
    ],
  };
}
export function genUniqueId(): string {
  // const dateStr = Date.now().toString(36); // convert num to base 36 and stringify
  const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

  return `${randomStr}`;
}

export default generateDay;
