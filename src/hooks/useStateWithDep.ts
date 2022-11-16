import { useEffect, useState } from "react";

export default function useStateWithDep(defaultValue: any) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return [value, setValue];
}
