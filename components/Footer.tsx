import { Flex, IconButton, Icon, Heading, Link } from "@chakra-ui/react";
import { RiGithubFill } from "react-icons/ri";

const Footer = () => {
  return (
    <Flex
      gridColumn={{ base: "1 / -1", md: "center" }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      rowGap={3}
      pb={6}
    >
      <Link
        href="https://github.com/john-zhuangzhuang-li/coffee-machines"
        isExternal
      >
        <IconButton
          aria-label="View github repo"
          colorScheme="gray"
          variant="ghost"
          size="lg"
          icon={<Icon as={RiGithubFill} w={8} h={8} />}
        />
      </Link>
      <Heading as="h6" size="xs">
        Build by John Li for 💪 exercises
      </Heading>
    </Flex>
  );
};

export default Footer;
