import { chakra } from "@chakra-ui/react";

const FooterSection = chakra("footer", {
  baseStyle: {
    bg: "#666",
    gridColumn: "center",
    display: "flex",
    color: "#fff",
  },
});

const Footer = () => {
  return (
    <FooterSection>
      <h4>This will be footer</h4>
    </FooterSection>
  );
};

export default Footer;
