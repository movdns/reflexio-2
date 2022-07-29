export type FirebaseId = {
  id: string;
};

export type TDay = {
  date: string;
  uid?: string;
  score?: number;
  description?: {
    blocks: [
      {
        type: string;
        id: string;
        data: {
          text: string;
          level: number;
        };
      }
    ];
    time: number;
  };
  icons?: string[];
};

export type TDaysList = TDay[] | [];
export type TDayItem = TDay | {};
