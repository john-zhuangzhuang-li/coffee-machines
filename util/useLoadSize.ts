import { useState } from "react";
import { useBreakpointValue } from "@chakra-ui/react";

const INITIAL_LOAD_SIZE = 12;

const useLoadSize = () => {
  const [currentLoad, setCurrentLoad] = useState(INITIAL_LOAD_SIZE);
  const loadSize = useBreakpointValue(
    {
      base: 6,
      md: 8,
      lg: 12,
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
