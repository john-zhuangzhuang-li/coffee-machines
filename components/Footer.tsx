import { Flex, IconButton, Icon, Heading } from "@chakra-ui/react";
import { RiGithubFill } from "react-icons/ri";

const Footer = () => {
  return (
    <Flex
      gridColumn="center"
      bg="#666"
      color="white"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      rowGap="1rem"
    >
      <IconButton
        aria-label="View github repo"
        colorScheme="teal"
        // variant="ghost"
        size="lg"
        icon={<Icon as={RiGithubFill} w={8} h={8} />}
      />
      <Heading as="h6" size="xs">
        Build by John Li for 💪 practice
      </Heading>
    </Flex>
  );
};

export default Footer;
