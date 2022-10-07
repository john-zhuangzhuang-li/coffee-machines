import { useState } from "react";
import { Grid, useDisclosure } from "@chakra-ui/react";

import Card from "./Card";
import ImgModal from "./ImgModal";

import { DUMMY_DATA } from "./dummy";

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
      <Grid
        as="main"
        gridColumn="center"
        zIndex={1}
        gap={6}
        templateColumns={{
          base: "1fr",
          md: "repeat(2, minmax(min-content, 1fr))",
          lg: "repeat(3, minmax(min-content, 1fr))",
        }}
      >
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
      </Grid>
      <ImgModal isOpen={isOpen} onClose={onClose} modalImgSrc={modalImgSrc} />
    </>
  );
};

export default Main;
