import { chakra, Heading, Container, Flex } from "@chakra-ui/react";

// const HeaderSection = chakra("header", {
//   baseStyle: {
//     bg: "#333",
//     gridColumn: "center",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//     rowGap: "1.5rem",
//     color: "#fff",
//   },
// });

const Header = () => {
  return (
    <Flex
      gridColumn="center"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      rowGap="1.5rem"
    >
      <Heading as="h1" size="3xl" noOfLines={1}>
        Cup Bottomless
      </Heading>
      <Container maxW="md">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        dolorum quisquam nobis eum asperiores!
      </Container>
    </Flex>
  );
};

export default Header;
