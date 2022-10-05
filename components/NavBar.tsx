// import { chakra} from "@chakra-ui/react";
import { Flex, Spacer, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

// const Nav = chakra("nav", {
//   baseStyle: {
//     bg: "#999",
//     gridColumn: "center",
//     display: "flex",
//     color: "#fff",
//   },
// });

const NavBar = () => {
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
    >
      COFFEE
      <Spacer />
      <IconButton
        colorScheme="pink"
        aria-label="Toggle color mode"
        icon={<SunIcon />}
      />
      <IconButton
        colorScheme="pink"
        aria-label="Toggle color mode"
        icon={<MoonIcon />}
      />
    </Flex>
  );
};

export default NavBar;
