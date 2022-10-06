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
      bg="bgNavBar"
      backdropFilter="auto"
      backdropBlur="10px"
      gridColumn={{ base: "1 / -1", md: "center" }}
      justifyContent="center"
      alignItems="center"
      px={{ base: 6, md: 0 }}
      py={3}
      columnGap={3}
      zIndex={2}
    >
      <Icon as={FaCoffee} w={5} h={5} color="accent" />
      <Heading as="h4" size="md" noOfLines={1}>
        Bottomless
      </Heading>
      <Spacer />
      {colorMode === "light" ? (
        <IconButton
          colorScheme="gray"
          aria-label="Toggle color mode"
          icon={<MoonIcon />}
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          colorScheme="gray"
          aria-label="Toggle color mode"
          icon={<SunIcon />}
          onClick={toggleColorMode}
        />
      )}
    </Flex>
  );
};

export default NavBar;
