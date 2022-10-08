import { TGlyph, TGlyphGroup } from "../../../../src/types";

export type TSettings = {
  palette: {
    [key: string]: {
      main: string;
      secondary: string;
    };
  };
  glyphs: TGlyphGroup[];
};

export type TUserSettings = {
  palette: {
    [key: string]: {
      main: string;
      secondary: string;
    };
  };
  mood: {
    [key: string]: {
      label: string;
      score: number;
      paletteCode: string;
      glyphCode: string;
    };
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

export type TIconType = "thin" | "light" | "regular" | "duotone" | "solid";
