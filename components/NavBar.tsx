import {
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  Heading,
  Link,
  Icon,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FaCoffee } from "react-icons/fa";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      as="nav"
      pos="sticky"
      top="0"
      bg="blue.600"
      color="white"
      gridColumn="center"
      justifyContent="center"
      alignItems="center"
      p={3}
      columnGap={3}
      zIndex={2}
    >
      <Icon as={FaCoffee} w={5} h={5} />
      <Heading as="h4" size="md" noOfLines={1}>
        Bottomless
      </Heading>
      <Spacer />
      {colorMode === "light" ? (
        <IconButton
          colorScheme="pink"
          aria-label="Toggle color mode"
          icon={<MoonIcon />}
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          colorScheme="pink"
          aria-label="Toggle color mode"
          icon={<SunIcon />}
          onClick={toggleColorMode}
        />
      )}
    </Flex>
  );
};

export default NavBar;
