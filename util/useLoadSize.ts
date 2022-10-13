import { useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

const INITIAL_LOAD_SIZE = 3;

const useLoadSize = () => {
  const [currentLoad, setCurrentLoad] = useState(INITIAL_LOAD_SIZE);
  const loadSize = useBreakpointValue(
    {
      base: 1,
      md: 2,
      lg: 3,
    },
    {
      fallback: "lg",
    }
  );

  const handleLoadMore = () => {
    setCurrentLoad((prev) => (loadSize ? prev + loadSize : prev));
  };

  return { currentLoad, handleLoadMore };
};

export default useLoadSize;
