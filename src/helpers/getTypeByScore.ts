/**
 * Get day type by mood score
 * @param score<number | undefined>
 */
const getTypeByScore = (
  score: number | undefined
): "positive" | "negative" | "neutral" | "danger" | "special" | undefined => {
  if (score) {
    switch (true) {
      case score < 2:
        return "negative";
      case score < 3:
        return "danger";
      case score === 3:
        return "neutral";
      case score <= 4.5:
        return "positive";
      case score === 5:
        return "special";
      default:
        return "neutral";
    }
  }
};
export default getTypeByScore;
