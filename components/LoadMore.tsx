import { Flex, Button } from "@chakra-ui/react";
import { RepeatIcon, CheckIcon } from "@chakra-ui/icons";

type Props = {
  currentLoad: number;
  listSize: number;

  onLoadMore: () => void;
};

const LoadMore = ({ currentLoad, listSize, onLoadMore }: Props) => {
  return (
    <Flex
      as="section"
      gridColumn="center"
      justifyContent="center"
      alignItems="center"
      py={6}
    >
      {listSize !== 0 && currentLoad >= listSize ? (
        <Button
          colorScheme="gray"
          variant="ghost"
          size="md"
          cursor="default"
          rightIcon={<CheckIcon />}
        >
          {`All ☕ loaded to the cup`}
        </Button>
      ) : (
        <Button
          colorScheme="teal"
          size="md"
          textTransform="uppercase"
          rightIcon={<RepeatIcon />}
          onClick={onLoadMore}
          isLoading={listSize === 0}
          isDisabled={currentLoad >= listSize}
        >
          load more
        </Button>
      )}
    </Flex>
  );
};

export default LoadMore;
