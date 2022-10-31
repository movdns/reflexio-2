export type TDay = {
  id: string;
  uid?: string;
  date?: string;

  paletteCode?: string;
  isFavorite?: boolean;

  mood?: {
    label?: string;
    glyphCode?: string;
    paletteCode?: string;
  };

  description?: any;
  metrics?: {
    total?: number;
    score?: {
      total?: number;
      mood?: number;
      motivation?: number;
      health?: number;
    };
    points?: {
      total?: number;
      todo?: number;
      sentiments?: {
        [key: string]: {
          total?: number;
          glyphs: number;
          tags: number;
        };
      };
    };
  };

  sentiments?: TSentiment;
  todo?: TTodoItem[];
};

export type TSentiment = {
  [key: string]: TSentimentData;
};

export type TSentimentData = {
  description?: string;
  glyphs?: string[];
  tags?: string[];
};

export type TTodoItem = {
  id: string;
  text: string;
  paletteCode?: string;
  complete: boolean;
  createdAt: number;
};
