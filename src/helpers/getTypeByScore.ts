/**
 * Get day type by mood score
 * @param score<number | undefined>
 */
const getTypeByScore = (
  score: number | undefined
): "positive" | "negative" | "neutral" | "danger" | "special" | undefined => {
  if (score) {
    switch (true) {
      case score < 3:
        return "negative";
      case score < 5:
        return "danger";
      case score === 5:
        return "neutral";
      case score < 8:
        return "positive";
      case score <= 10:
        return "special";
      default:
        return "neutral";
    }
  }
};
export default getTypeByScore;
