import { chakra } from "@chakra-ui/react";
import Card from "./Card";

import { DUMMY_DATA } from "./dummy";

const MainSection = chakra("main", {
  baseStyle: {
    bg: "#fff",
    gridColumn: "center",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(min-content, 1fr))",
    rowGap: "1.5rem",
    columnGap: "1.5rem",
  },
});

const Main = () => {
  return (
    <MainSection>
      {DUMMY_DATA.map((item) => {
        const { id, src } = item;
        return <Card key={`image-${id}`} imageSrc={src} />;
      })}
    </MainSection>
  );
};

export default Main;
