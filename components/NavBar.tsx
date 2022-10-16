import { useState, useEffect } from "react";

import {
  ref as refDB,
  onValue,
  get,
  off,
  getDatabase,
} from "firebase/database";

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
import {
  SettingsIcon,
  LockIcon,
  UnlockIcon,
  SunIcon,
  MoonIcon,
} from "@chakra-ui/icons";
import { FaCoffee, FaShapes } from "react-icons/fa";

import { useUserContext } from "../util/UserContext";

type Props = {
  onSignInOpen: () => void;
  onUploadOpen: () => void;
};

const NavBar = ({ onSignInOpen, onUploadOpen }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, userSignOut } = useUserContext();
  const [loading, setLoading] = useState(false);

  // useEffect(()=>{
  //   const databaseTest = getDatabase();
  //   const testRef = refDB(databaseTest, "coffee/");
  //   get(testRef).then((snapshot) => console.log(snapshot));
  // }, [])

  const handleSignOut = async () => {
    if (!user || !userSignOut) return;
    setLoading(true);
    try {
      await userSignOut();
      console.log("SIGN OUT SUCCESSFUL");
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <Flex
      as="nav"
      pos="sticky"
      top="0"
      bg="bgNavBar"
      backdropFilter="auto"
      backdropBlur="10px"
      gridColumn={{ base: "1 / -1", md: "center" }}
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
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      />
      <Button
        leftIcon={<Icon as={FaCoffee} w={5} h={5} color="accent" />}
        variant="ghost"
        display={{ base: "none", sm: "flex" }}
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        <Heading as="h2" size="md" noOfLines={1}>
          Bottomless
        </Heading>
      </Button>
      <Spacer />
      <Menu>
        <MenuButton
          as={Button}
          aria-label="Config menu"
          rightIcon={<SettingsIcon />}
          isLoading={loading}
        >
          Config
        </MenuButton>
        <MenuList>
          {user ? (
            <MenuItem icon={<UnlockIcon />} onClick={handleSignOut}>
              Sign-out
            </MenuItem>
          ) : (
            <MenuItem icon={<LockIcon />} onClick={onSignInOpen}>
              Sign-in
            </MenuItem>
          )}
          <MenuItem
            icon={user ? <UnlockIcon /> : <LockIcon />}
            isDisabled={!user}
            onClick={onUploadOpen}
          >
            Upload
          </MenuItem>

          {/* TEST FOR WHEN FIREBASE FUNC FAILS IN BUILD VER*/}
          {/* <MenuItem
            onClick={() => {
              const testFetch = async () => {
                const res = await fetch(
                  "https://cup-bottomless-default-rtdb.firebaseio.com/coffee.json"
                );
                const resData = await res.json();
                console.log(resData);
              };

              testFetch();
            }}
          >
            TEST
          </MenuItem>
          <MenuItem
            onClick={() => {
              const databaseTest = getDatabase();
              const testRef = refDB(databaseTest, "coffee/");
              get(testRef)
                .then((snapshot) => console.log(snapshot.val()))
                .catch((error) => console.error(error));
            }}
          >
            TEST 2
          </MenuItem> */}
        </MenuList>
      </Menu>
      <IconButton
        colorScheme="teal"
        aria-label="Toggle color mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default NavBar;
