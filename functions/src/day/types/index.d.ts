export type TDaySnapshot = {
  id: string;
  uid?: string;
  date?: string;
  score?: string;
  description?: {
    blocks: [
      {
        type: string;
        id: number;
        level: number;
        text: string;
      }
    ];
    time: number;
  };
  icons?: string[];
} | null;
