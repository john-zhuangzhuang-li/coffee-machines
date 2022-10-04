import { chakra } from "@chakra-ui/react";

const MainSection = chakra("main", {
  baseStyle: {
    bg: "#fff",
    gridColumn: "center",
    display: "flex",
    color: "#000",
  },
});

const Main = () => {
  return (
    <MainSection>
      <h3>THIS WILL BE MAIN</h3>
    </MainSection>
  );
};

export default Main;
