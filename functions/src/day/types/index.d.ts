import { TIcon, TTarget } from "../../../../src/types";

export type TDaySnapshot = {
  id: string;
  uid?: string;
  date?: string;
  paletteCode?: string;
  score?:
    | {
        general?: number;
        mood?: number;
        motivation?: number;
        health?: number;
      }
    | { [key in "general" | "mood" | "motivation" | "health"]: number };
  mood?: {
    glyph: string;
    description: string;
  };
  sentiments?: {
    [key: string]: {
      description: string;
      glyphs: string[];
      tags?: string[];
    };
  };
  isFavorite?: boolean;
  glyphs?: { [key: string]: string | string[] };
  icons?: TIcon[];
  targets?: TTarget[];
} | null;

export type TColoration =
  | "negative"
  | "danger"
  | "neutral"
  | "positive"
  | "special"
  | "ghost";
