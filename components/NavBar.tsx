import { chakra } from "@chakra-ui/react";

const Nav = chakra("nav", {
  baseStyle: {
    bg: "#999",
    gridColumn: "center",
    display: "flex",
    color: "#fff",
  },
});

const NavBar = () => {
  return (
    <Nav>
      <h2>This will be nav</h2>
    </Nav>
  );
};

export default NavBar;
