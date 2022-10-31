import randomIntFromInterval from "~/mock/helpers/randomIntFromInterval";

const getMockProperty = (
  property: any,
  maxPossibleCount?: number,
  minPossibleCount?: number
) => {
  return maxPossibleCount
    ? Array.from(
        new Set(
          [
            ...Array(
              randomIntFromInterval(minPossibleCount || 2, maxPossibleCount)
            ),
          ].map(
            () =>
              property[randomIntFromInterval(0, Object(property).length - 1)]
          )
        )
      )
    : property[randomIntFromInterval(0, Object(property).length - 1)];
};

export default getMockProperty;
