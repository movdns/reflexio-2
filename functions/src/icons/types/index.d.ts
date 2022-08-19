export type TIconGroupSnapshot = {
  id: string;
  label?: string;
  order?: number;
  singleSelectMode?: boolean;
  fullWidth?: boolean;
  size?: number;
  icons?: {
    code: string;
    color?: string;
    coloration?: string;
    size?: number;
  }[];
} | null;
