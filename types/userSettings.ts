export type TUserSettings = {
  mood: {
    [key: string]: TTUserSettingsMoodData;
  };
  palette: {
    [key: string]: TTUserSettingsPaletteData;
  };
  sentiments: {
    [key: string]: TUserSettingsSentimentData;
  };
};

export type TTUserSettingsMoodData = {
  label: string;
  score: number;
  glyphCode: string;
  paletteCode: string;
} | null;

export type TTUserSettingsPaletteData = {
  main: string;
  secondary?: string;
  contrastText?: string;
} | null;

export type TUserSettingsSentimentData = {
  label: string;
  tags?: string[];
  order?: number;
  glyphs?: string[];
};
