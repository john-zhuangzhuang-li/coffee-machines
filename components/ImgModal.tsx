import { useState, useRef } from "react";

import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalBody,
  Box,
  Button,
  Image,
  Text,
  Link,
  Skeleton,
  Spinner,
  Center,
} from "@chakra-ui/react";

import { ExternalLinkIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { imgDataModel } from "../util/types";

// import NextImage from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  imgId: string;
  imgList: imgDataModel[];
};

const ImgModal = ({ isOpen, onClose, imgId, imgList }: Props) => {
  const errorModal = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Error</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display="flex"
          justifyContent="center"
          flexDir="column"
          alignItems="center"
          rowGap={3}
        >
          <WarningTwoIcon w={8} h={8} />
          <Text size="md">Error loading image 😨</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  if (!imgId) return <>{errorModal}</>;

  const currentImg = imgList.find((img) => img.id === imgId);
  if (!currentImg) return <>{errorModal}</>;

  const { url, companyUrl, timeStamp } = currentImg;
  const initialRef = useRef<HTMLButtonElement>(null);
  const uploadDate = new Date(timeStamp);

  const [imgLoaded, setImgLoaded] = useState(false);
  const handleImgLoaded = () => {
    console.log("MODAL IMG LOADED");
    setImgLoaded(true);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      isCentered
      scrollBehavior="inside"
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalBody
          p={0}
          // display="flex"
          // justifyContent="center"
          // alignItems="center"
        >
          {/* <Box as="figure" width="100%" height="100%" position="relative"> */}
          {/* <NextImage src={url} layout="fill" objectFit="cover" /> */}
          {/* </Box> */}

          {/* FIND OUT WHY THIS SKELETON NOT SHOWING */}
          {/* OR USE ANOTHER SOLUTION LIKE SPINNER AS IT MAY LOOK BETTER */}

          {/* <Skeleton isLoaded={imgLoaded}> */}
          {/* {!imgLoaded && <Spinner />} */}
          <Image
            // minHeight={{ base: "10rem", md: "20rem" }}
            objectFit="contain"
            src={url}
            fallback={
              <Center py={{ base: 8, md: 24 }}>
                <Spinner size="lg" />
              </Center>
            }
            // opacity={imgLoaded ? "1" : "0"}
            // onLoad={handleImgLoaded}
          />
          {/* </Skeleton> */}
          <Box p={3}>
            <Text fontSize="md">{`Uploaded on ${uploadDate.toLocaleDateString(
              "en-US"
            )}`}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Link href={companyUrl} isExternal>
            <Button variant="ghost" rightIcon={<ExternalLinkIcon />} mr={3}>
              Source
            </Button>
          </Link>
          <Button ref={initialRef} colorScheme="teal" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImgModal;
