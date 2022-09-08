export type TDaySnapshot = {
  id: string;
  uid?: string;
  date?: string;
  score?: string;
  description?: [];
  icons?: string[];
  targets?: {
    id: number;
    value: string;
    type: "negative" | "danger" | "neutral" | "positive" | "special";
    selected: boolean;
  }[];
} | null;

export type TColoration =
  | "negative"
  | "danger"
  | "neutral"
  | "positive"
  | "special"
  | "ghost";
