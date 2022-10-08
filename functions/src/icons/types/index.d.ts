export type TIconGroupSnapshot = {
  id: string;
  label?: string;
  order?: number;
  singleSelectMode?: boolean;
  fullWidth?: boolean;
  size?: number;
  coloration?: string;
  icons?: {
    code: string;
    color?: string;
    coloration?: string;
    size?: number;
  }[];
} | null;
