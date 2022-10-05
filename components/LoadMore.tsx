import { Flex, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

const LoadMore = () => {
  return (
    <Flex
      as="section"
      gridColumn="center"
      justifyContent="center"
      alignItems="center"
      bg="teal"
      color="white"
    >
      <Button
        colorScheme="blue"
        size="md"
        textTransform="uppercase"
        rightIcon={<RepeatIcon />}
        // isLoading
      >
        load more
      </Button>
    </Flex>
  );
};

export default LoadMore;
