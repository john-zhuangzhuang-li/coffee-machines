import { useState } from "react";
import { Grid, useDisclosure } from "@chakra-ui/react";

import Card from "./Card";
import ImgModal from "./ImgModal";

import { imgDataModel } from "../util/types";

type Props = {
  imgList?: imgDataModel[] | null;
};

const Main = ({ imgList }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalImgId, setModalImgId] = useState("");

  const handleCardImgClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (!imgList) return;
    const { imgId } = event.currentTarget.dataset;
    if (!imgId) return;
    setModalImgId(imgId);
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
        {imgList &&
          imgList.map((item) => (
            <Card key={item.id} onImgClick={handleCardImgClick} {...item} />
          ))}
      </Grid>
      {imgList && (
        <ImgModal
          isOpen={isOpen}
          onClose={onClose}
          imgId={modalImgId}
          imgList={imgList}
        />
      )}
    </>
  );
};

export default Main;
