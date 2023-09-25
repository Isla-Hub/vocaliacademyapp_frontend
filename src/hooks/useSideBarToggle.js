import { useState } from "react";

const useSideBarToggle = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return [isSideBarOpen, setIsSideBarOpen];
};

export default useSideBarToggle;
