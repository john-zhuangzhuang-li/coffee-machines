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
import { FaCoffee } from "react-icons/fa";

import { useUserContext } from "../util/UserContext";
import { imgDataModel } from "../util/types";

type Props = {
  onSignInOpen: () => void;
  onUploadOpen: () => void;
  imgList?: imgDataModel[] | null;
};

const NavBar = ({ onSignInOpen, onUploadOpen, imgList }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, userSignOut } = useUserContext();

  const handleSignOut = async () => {
    if (!userSignOut) return;
    try {
      await userSignOut();
      console.log("SIGN OUT SUCCESSFUL");
    } catch (error: any) {
      console.log(error.message);
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

          {/* TEST ONLY */}
          {/* <MenuItem
            onClick={() => {
              console.log(imgList);
            }}
          >
            Print data
          </MenuItem> */}

          {/* TEST ONLY */}
          {/* GOOD WORKS AS EXPECTED NOW CAN FINISH DATA LOADING */}
          {/* <MenuItem
            onClick={() => {
              console.log("Testing date");
              const timeStamp = Date.now();
              console.log(timeStamp);
              const newDate = new Date(timeStamp);
              console.log(newDate);
              const newDateText = newDate.toLocaleString("en-US");
              console.log(`Local time is ${newDateText}`);
              const oldTimeStamp = 0;
              const oldDate = new Date(oldTimeStamp);
              console.log(oldDate);
              const oldDateText = oldDate.toLocaleString("en-US");
              console.log(`Old time is ${oldDateText}`);
              const dates = [oldTimeStamp, timeStamp];
              console.log("Array should be old > new");
              console.log(dates.map((stamp) => new Date(stamp)));
              dates.sort((a, b) => b - a);
              console.log("Array should be new > old");
              console.log(dates.map((stamp) => new Date(stamp)));
              dates.sort((a, b) => a - b);
              console.log("Array should be old > new");
              console.log(dates.map((stamp) => new Date(stamp)));
            }}
          >
            Test Date
          </MenuItem> */}
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
