import { Flex, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

type Props = {
  step: number;
  maxStep: number;
  onLoadMore: () => void;
};

const LoadMore = ({ step, maxStep, onLoadMore }: Props) => {
  return (
    <Flex
      as="section"
      gridColumn="center"
      justifyContent="center"
      alignItems="center"
      py={6}
    >
      <Button
        colorScheme="teal"
        size="md"
        textTransform="uppercase"
        rightIcon={<RepeatIcon />}
        onClick={onLoadMore}
        isDisabled={step >= maxStep}
      >
        load more
      </Button>
    </Flex>
  );
};

export default LoadMore;
