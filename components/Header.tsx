import { Heading, Flex, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex
      gridColumn="center"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      zIndex={1}
      rowGap={3}
      py={6}
    >
      <Heading as="h1" size={{ base: "2xl", sm: "3xl" }} noOfLines={1}>
        Cup Bottomless
      </Heading>
      <Text as="h2" size="md" noOfLines={1}>
        A collection of stylish coffee makers
      </Text>
    </Flex>
  );
};

export default Header;
