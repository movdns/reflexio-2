import { TColoration } from "../../types";

function getDayColorationByScore(score: number | undefined): TColoration {
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
      case score < 8:
        return "positive";
      case score <= 10:
        return "special";
      default:
        return "neutral";
    }
  }
}

export default getDayColorationByScore;
