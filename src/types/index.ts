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
  uid?: string;
  score?: number;
  description?: any[];
  // blocks: [
  //   {
  //     type: string;
  //     id: string;
  //     data: {
  //       text: string;
  //       level: number;
  //     };
  //   }
  // ];
  // time: number;

  icons?: TIcon[];
};

export type TIcon = string;

export type TGlyph = {
  code: string;
  color?: string;
  coloration?: string;
  size?: number;
  score?: number;
};

export type TGlyphGroup = {
  id: string;
  label?: string;
  order?: number;
  singleSelectMode?: boolean;
  fullWidth?: boolean;
  size?: number;
  icons?: TGlyph[];
};

// export type TDaysList = TDay[] | [];
// export type TDayItem = TDay | {};
