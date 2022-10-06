import { Flex, Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";

const LoadMore = () => {
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
        // isLoading
      >
        load more
      </Button>
    </Flex>
  );
};

export default LoadMore;
