import { chakra, useDisclosure } from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import SignInModal from "./SignInModal";

type Props = {
  children?: React.ReactNode;
};

const Container = chakra("div", {
  baseStyle: {
    minH: "100vh",
    display: "grid",
    rowGap: 6,
    columnGap: 6,
    gridTemplateColumns:
      "minmax(0, 1fr) [center-start] minmax(min-content, 75rem) [center-end] minmax(0, 1fr)",
    gridAutoFlow: "column",
  },
});

const Layout = ({ children }: Props) => {
  const {
    isOpen: signInOpen,
    onOpen: onSignInOpen,
    onClose: onSignInClose,
  } = useDisclosure();
  return (
    <>
      <Container>
        <NavBar onSignInOpen={onSignInOpen} />
        <SignInModal isOpen={signInOpen} onClose={onSignInClose} />
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
