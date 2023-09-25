import useWindowSize from "./useWindowSize";
const useIsMobile = () => {
  const { innerWidth } = useWindowSize();
  return innerWidth <= 576;
};

export default useIsMobile;
