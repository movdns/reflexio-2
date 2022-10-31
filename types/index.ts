export type TResponseData<T> = {
  error: boolean;
  data?: T;
  message?: string;
};
