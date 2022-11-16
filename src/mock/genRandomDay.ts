import randomIntFromInterval from "~/mock/helpers/randomIntFromInterval";
import dayPossibleProperties from "~/mock/dayPossibleProperties";
import getMockProperty from "./helpers/getMockProperty";
import { genUniqueId } from "~/helpers/genUniqueId";
import { TDay } from "root/types/day";

const genRandomDay = (date: string): TDay => {
  const isSpecial = randomIntFromInterval(0, 1);
  const paletteCode =
    dayPossibleProperties.paletteCode[randomIntFromInterval(0, 5)];

  return {
    id: `${date}-demo`,
    date,
    uid: "anonymous",
    isFavorite: !!randomIntFromInterval(0, 1),
    paletteCode,
    mood: {
      label: getMockProperty(dayPossibleProperties.mood.label),
      glyphCode: getMockProperty(dayPossibleProperties.mood.glyphCode),
      paletteCode,
    },
    sentiments: {
      positive: {
        description: getMockProperty(dayPossibleProperties.description),
        glyphs: getMockProperty(
          dayPossibleProperties.sentiments.positive.glyphs,
          4
        ),
        tags: getMockProperty(
          dayPossibleProperties.sentiments.positive.tags,
          4
        ),
      },
      negative: {
        description: getMockProperty(dayPossibleProperties.description),
        glyphs: getMockProperty(
          dayPossibleProperties.sentiments.negative.glyphs,
          4
        ),
        tags: getMockProperty(
          dayPossibleProperties.sentiments.negative.tags,
          4
        ),
      },
      special: isSpecial
        ? {
            description: getMockProperty(dayPossibleProperties.description),
            glyphs: getMockProperty(
              dayPossibleProperties.sentiments.special.glyphs,
              4
            ),
            tags: getMockProperty(
              dayPossibleProperties.sentiments.special.tags,
              4
            ),
          }
        : {},
    },
    metrics: {
      score: {
        mood: isSpecial ? 5 : randomIntFromInterval(1, 5),
        motivation: randomIntFromInterval(1, 5),
        health: randomIntFromInterval(1, 5),
      },
    },
    todo: [...Array(randomIntFromInterval(2, 6))].map(() => ({
      id: genUniqueId(),
      paletteCode:
        dayPossibleProperties.paletteCode[randomIntFromInterval(0, 5)],
      text: getMockProperty(dayPossibleProperties.todo.text),
      createdAt: new Date(
        new Date(2022, 2, 24).getTime() +
          Math.random() *
            (new Date().getTime() - new Date(2022, 2, 24).getTime())
      ).getTime(),
      complete: !!randomIntFromInterval(0, 1),
    })),
  };
};

export default genRandomDay;
