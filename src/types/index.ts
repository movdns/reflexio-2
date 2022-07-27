export type FirebaseId = {
  id: string;
};

export type TDay = {
  date: string;
  score: number;
  icons: string[];

  description: any;
};

export type TDaysList = TDay[] | [];
export type TDayItem = TDay | {};
