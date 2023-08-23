import { useEffect, useState } from "react";

const useKeyLock = (key) => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      setToggled((pToggled) => {
        return event.getModifierState?.(key) ?? pToggled;
      });
    };

    const onKeyUp = (event) => {
      setToggled((pToggled) => {
        return event.getModifierState?.(key) ?? pToggled;
      });
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    return () =>
      document.removeEventListener("keydown", onKeyDown) &&
      document.removeEventListener("keyup", onKeyUp);
  }, [key]);

  return toggled;
};
export default useKeyLock;
