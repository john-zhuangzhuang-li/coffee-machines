import { useState } from "react";
import { chakra } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Image,
} from "@chakra-ui/react";
// import NextImage from "next/image";
import Card from "./Card";
import ImgModal from "./ImgModal";

import { DUMMY_DATA } from "./dummy";

const MainSection = chakra("main", {
  baseStyle: {
    // bg: "#fff",
    gridColumn: "center",
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(min-content, 1fr))",
    rowGap: "1.5rem",
    columnGap: "1.5rem",
  },
});

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalImgSrc, setModalImgSrc] = useState("");

  const handleCardImgClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    const { imgId } = event.currentTarget.dataset;
    if (!imgId) return;
    const currentImg = DUMMY_DATA.find((item) => item.id === imgId);
    if (!currentImg) return;
    const { src } = currentImg;
    if (!src) return;
    console.log(src);
    setModalImgSrc(src);
    onOpen();
  };

  return (
    <>
      <MainSection>
        {DUMMY_DATA.map((item) => {
          const { id, src, author, authorLink, companyLink } = item;
          return (
            <Card
              key={`image-${id}`}
              imageId={id}
              imageSrc={src}
              authorName={author}
              authorLink={authorLink}
              companyLink={companyLink}
              onImgClick={handleCardImgClick}
            />
          );
        })}
      </MainSection>
      <ImgModal isOpen={isOpen} onClose={onClose} modalImgSrc={modalImgSrc} />
      {/* <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent overflow="hidden">
          <ModalBody p={0}>
            {modalImgSrc && <Image src={modalImgSrc} />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}
    </>
  );
};

export default Main;
