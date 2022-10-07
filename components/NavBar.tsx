import {
  Flex,
  Spacer,
  IconButton,
  useColorMode,
  Heading,
  Icon,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { SettingsIcon, LockIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
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
      <IconButton
        variant="ghost"
        aria-label="Logo"
        icon={<Icon as={FaCoffee} w={5} h={5} color="accent" />}
        display={{ base: "flex", sm: "none" }}
        onClick={() => window.scrollTo(0, 0)}
      />
      <Button
        leftIcon={<Icon as={FaCoffee} w={5} h={5} color="accent" />}
        variant="ghost"
        display={{ base: "none", sm: "flex" }}
        onClick={() => window.scrollTo(0, 0)}
      >
        <Heading as="h2" size="md" noOfLines={1}>
          Bottomless
        </Heading>
      </Button>

      <Spacer />
      <Menu>
        <MenuButton
          as={Button}
          aria-label="Admin menu"
          rightIcon={<SettingsIcon />}
        >
          Admin
        </MenuButton>
        <MenuList>
          <MenuItem icon={<LockIcon />}>Sign-in</MenuItem>
          <MenuItem icon={<LockIcon />}>Upload</MenuItem>
        </MenuList>
      </Menu>

      {colorMode === "light" ? (
        <IconButton
          colorScheme="teal"
          aria-label="Toggle color mode"
          icon={<MoonIcon />}
          onClick={toggleColorMode}
        />
      ) : (
        <IconButton
          colorScheme="teal"
          aria-label="Toggle color mode"
          icon={<SunIcon />}
          onClick={toggleColorMode}
        />
      )}
    </Flex>
  );
};

export default NavBar;
