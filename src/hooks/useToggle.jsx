import { useState } from "react";

const useToggle = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const toggleHandler = () => {
    setState(!state);
  };

  return [state, toggleHandler];
};

export default useToggle;
