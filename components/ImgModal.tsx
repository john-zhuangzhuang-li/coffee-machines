import { useRef } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Box,
  Button,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";

import { ExternalLinkIcon } from "@chakra-ui/icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  modalImgSrc: string;
};

const ImgModal = ({ isOpen, onClose, modalImgSrc }: Props) => {
  const initialRef = useRef<HTMLButtonElement>(null);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      isCentered
      scrollBehavior="inside"
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent overflow="hidden">
        <ModalBody p={0}>
          {modalImgSrc && <Image src={modalImgSrc} />}
          <Box p={3}>
            <Text
              fontSize="md"
              noOfLines={1}
            >{`Provided by the Internet 😂`}</Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Link
            href="https://github.com/john-zhuangzhuang-li/coffee-machines"
            isExternal
          >
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
