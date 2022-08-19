const getCardColorByDayScore = (score: number | undefined) => {
  if (!score) {
    return "ghost";
  } else {
    switch (true) {
      case score < 3:
        return "negative";
      case score < 5:
        return "danger";
      case score < 6:
        return "neutral";
      case score < 9:
        return "positive";
      case score >= 9:
        return "special";
      default:
        return "neutral";
    }
  }
};

export default getCardColorByDayScore;
