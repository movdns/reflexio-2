// import { Descendant } from "slate";

export type FirebaseId = {
  id: string;
};

export type TResponseData<T> = {
  error: boolean;
  data: T | null;
  message?: string;
};

export type TDay = {
  id?: string;
  date: string;
  paletteCode?: string;
  uid?: string;
  score?: { [key: string]: number };
  mood?: {
    label: string;
    glyphCode: string;
    paletteCode: string;
  };
  sentiments?: TSentiment;
  isFavorite?: boolean;
  description?: any;
  glyphs?: { [key: string]: string | string[] };
  icons?: TIcon[];
  targets?: TTarget[];
};

export type TSentiment = {
  [key: string]: TSentimentData;
};
// @todo simplify
export type TSentimentData = {
  description?: string;
  glyphs?: string[];
  tags?: string[];
};

export type TTarget = {
  id: string;
  value: string;
  coloration: "negative" | "danger" | "neutral" | "positive" | "special";
  selected: boolean;
  createdAt: number;
};

export type TColoration =
  | "negative"
  | "danger"
  | "neutral"
  | "positive"
  | "special"
  | "ghost";

export type TIcon = string;

export type TGlyph = {
  code: string;
  paletteCode?: string;

  label?: string;
  size?: number;
  score?: number;

  color?: string;
  coloration?: string;
};

export type TGlyphGroup = {
  id: string;
  label?: string;
  code?: string;
  order?: number;
  iconType?: string;
  coloration?: string;
  // selectedColoration?: string;
  // singleSelectMode?: boolean;
  fullWidth?: boolean;
  size?: number;
  icons?: TGlyph[];
};

export type TUserSettings = {
  palette: {
    [key: string]: {
      main: string;
      secondary: string;
    };
  };
  mood: {
    [key: string]: TTUserSettingsMoodData;
  };
  sentiments: {
    [key: string]: {
      label: string;
      subLabel?: string;
      order?: number;
      glyphs: string[];
      tags?: {
        label: string;
        glyphCode?: string;
      }[];
    };
  };
  // ????????
  glyphs: {
    [key: string]: {
      label?: string;
      paletteCode?: string;
      iconType?: TIconType;
      data: TGlyph[];
    };
  };
  tags: {
    [key: string]: {
      label?: string;
      paletteCode?: string;
      data: {
        text: string;
        glyphCode?: string;
      }[];
    };
  };
};

export type TTUserSettingsMoodData = {
  main: string;
  secondary: string;
  contrastText?: string;
} | null;

export type TTUserSettingsPaletteData = {
  main: string;
  secondary: string;
  contrastText?: string;
} | null;

export type TUserSettingsSentimentData = {
  label: string;
  subLabel?: string;
  order?: number;
  glyphs: string[];
  tags?: TUserSettingsSentimentTagData[];
};

export type TUserSettingsSentimentTagData = {
  label: string;
  glyphCode?: string;
};

export type TIconType = "thin" | "light" | "regular" | "duotone" | "solid";

// export type TDaysList = TDay[] | [];
// export type TDayItem = TDay | {};
