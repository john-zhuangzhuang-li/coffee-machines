import { chakra } from "@chakra-ui/react";

const HeaderSection = chakra("header", {
  baseStyle: {
    bg: "#333",
    gridColumn: "center",
    display: "flex",
    color: "#fff",
  },
});

const Header = () => {
  return (
    <HeaderSection>
      <h3>THIS WILL BE MAIN</h3>
    </HeaderSection>
  );
};

export default Header;
