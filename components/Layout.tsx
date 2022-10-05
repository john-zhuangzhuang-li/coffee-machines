import { chakra } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
};

const Container = chakra("div", {
  baseStyle: {
    minH: "100vh",
    // bg: "#eee",
    display: "grid",
    rowGap: "1.5rem",
    columnGap: "1.5rem",
    gridTemplateColumns:
      "minmax(0, 1fr) [center-start] minmax(min-content, 75rem) [center-end] minmax(0, 1fr)",
    gridAutoFlow: "column",
    // color: "#fff",
  },
});

const Layout = ({ children }: Props) => {
  return (
    <>
      <Container>
        <NavBar />
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
