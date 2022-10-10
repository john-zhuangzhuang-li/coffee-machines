import { useState, useRef, FormEvent } from "react";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref as refDB, set } from "firebase/database";
import { storage, database } from "../util/firebase";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Progress,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

import useInputValidation from "../util/useInputValidation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// interface imgDataModel {
//   id: string;
//   url: string;
//   path: string;
//   artist: string;
//   artistUrl: string;
//   company: string;
//   companyUrl: string;
// }

const handleUnsplashCreditSplit = (credit: string) => {
  const splitCredit = credit.split(` on `);
  const parsedCredit = splitCredit.map((credit) => {
    const indexFirstQuote = credit.indexOf(`"`);
    const indexLastQuote = credit.lastIndexOf(`"`);
    const url = credit.slice(indexFirstQuote + 1, indexLastQuote);
    const indexFirstRightAngleBracket = credit.indexOf(`>`);
    const indexLastLeftAngleBracket = credit.lastIndexOf(`<`);
    const text = credit.slice(
      indexFirstRightAngleBracket + 1,
      indexLastLeftAngleBracket
    );
    return { url, text };
  });
  const { text: artist, url: artistUrl } = parsedCredit[0];
  const { text: company, url: companyUrl } =
    parsedCredit[parsedCredit.length - 1];
  return {
    artist,
    artistUrl,
    company,
    companyUrl,
  };
};

const UploadModal = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);
  const creditRef = useRef<HTMLInputElement>(null);

  const {
    inputValue: creditValue,
    isValid: creditIsValid,
    helperText: creditHelperText,
    handleInputChange: handleCreditChange,
    handleClearInput: handleClearCredit,
  } = useInputValidation({ max: 500, process: "unsplash" });

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = fileRef.current?.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    const { name } = file;
    const id = name.substring(0, name.lastIndexOf("."));
    if (!id) return;
    setLoading(true);
    const path = `test/${name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("UPLOAD ERROR");
        console.log(error);
        setUploadError("An error occurred while uploading to storage");
        setLoading(false);
      },
      () => {
        // Handle successful uploads on complete
        console.log("UPLOAD COMPLETED");
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            const creditInfo = handleUnsplashCreditSplit(creditValue);
            const uploadData = {
              ...creditInfo,
              id,
              url: downloadURL,
              path,
            };
            console.log(uploadData);
            return set(refDB(database, `test/${uploadData.id}`), uploadData);
          })
          .then(() => {
            console.log("DATABASE UPDATE COMPLETED");
            if (fileRef.current?.value) fileRef.current.value = "";
            handleClearCredit();
            setLoading(false);
          })
          .catch((error: any) => {
            console.log("DATABASE UPDATE ERROR");
            console.log(error);
            setUploadError("An error occurred while updating database");
            setLoading(false);
          });
      }
    );

    // TO DO: COULD CREATE A PREVIEW AND GET NATURAL PIXELS FROM IT FOR NEXT
    // TO DO: add a library to optimize image before upload, perhaps add a checkbox to select
  };

  const handleModalClose = () => {
    onClose();
    if (uploadError) setUploadError("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      initialFocusRef={creditRef}
      closeOnOverlayClick={!loading}
      closeOnEsc={!loading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Image upload</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody as="form" id="upload-form" onSubmit={handleSubmit}>
          <FormControl as="fieldset">
            <FormLabel>Image</FormLabel>
            <Input
              type="file"
              ref={fileRef}
              accept="image/*"
              isDisabled={loading || Boolean(uploadError)}
            />
          </FormControl>
          <FormControl
            mt={3}
            as="fieldset"
            isInvalid={Boolean(creditHelperText)}
          >
            <FormLabel>Credit</FormLabel>
            <InputGroup>
              <Input
                placeholder="Credit"
                value={creditValue}
                onChange={handleCreditChange}
                ref={creditRef}
                isDisabled={loading || Boolean(uploadError)}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Empty input"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={handleClearCredit}
                  isDisabled={loading || Boolean(uploadError)}
                />
              </InputRightElement>
            </InputGroup>
            {!creditHelperText && !uploadError ? (
              <FormHelperText>
                {!loading && "Paste directly from clipboard"}
                {loading &&
                  uploadProgress < 99 &&
                  "Uploading image to storage..."}
                {loading &&
                  uploadProgress >= 99 &&
                  "Updating info to database..."}
              </FormHelperText>
            ) : (
              <FormErrorMessage>{creditHelperText}</FormErrorMessage>
            )}
            {Boolean(uploadError) && (
              <FormHelperText color="textError">{uploadError}</FormHelperText>
            )}
          </FormControl>
          {loading && (
            <Progress
              colorScheme={"teal"}
              hasStripe
              value={uploadProgress}
              mt={3}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            type="submit"
            form="upload-form"
            mr={3}
            disabled={loading || !creditIsValid || Boolean(uploadError)}
          >
            Upload
          </Button>
          <Button
            variant="ghost"
            onClick={handleModalClose}
            isDisabled={loading}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
