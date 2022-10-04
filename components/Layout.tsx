import { chakra } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
};

const Container = chakra("div", {
  baseStyle: {
    minH: "100vh",
    bg: "#eee",
    display: "grid",
    rowGap: "1.5rem",
    columnGap: "1.5rem",
    gridTemplateColumns:
      "minmax(0, 1fr) [center-start] minmax(min-content, 75rem) [center-end] minmax(0, 1fr)",
    gridAutoFlow: "column",
    color: "#fff",
  },
});

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* THERE WILL NEED TO BE: */}
      {/* PAGE LV CONTAINER */}
      {/* NAV BAR WITH STICKY: LEFT ICON AND RIGHT CLR MODE SWITCH, LEAVE ROOM FOR A SETTING BTN */}
      {/* CONTENT AREA: FOR CHILDREN, INCLUDE CARD, MODAL AND LOAD MORE BTN */}
      {/* FOOTER FOR GITHUB LINK: CAN RE-USE */}
      <Container>
        <NavBar />
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
