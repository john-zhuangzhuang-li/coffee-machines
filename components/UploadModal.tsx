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
  Progress,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

import useInputValidation from "../util/useInputValidation";
import { resizeImage, handleUnsplashCreditSplit } from "../util/util";

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

  const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = fileRef.current?.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    const { name } = file;
    const id = name.substring(0, name.lastIndexOf("."));
    if (!id) return;
    setLoading(true);

    const optimizedFile = await resizeImage(file);
    console.log("COMPRESS COMPLETED");
    // console.log(optimizedFile);

    if (!optimizedFile || !(optimizedFile instanceof File)) {
      console.log("COMPRESS ERROR");
      setUploadError("An error occurred while optimizing image");
      setLoading(false);
      return;
    }

    const path = `test/${optimizedFile.name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, optimizedFile);

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
              isDisabled={loading || !!uploadError}
            />
          </FormControl>
          <FormControl mt={3} as="fieldset" isInvalid={!!creditHelperText}>
            <FormLabel>Credit</FormLabel>
            <InputGroup>
              <Input
                placeholder="Credit"
                value={creditValue}
                onChange={handleCreditChange}
                ref={creditRef}
                isDisabled={loading || !!uploadError}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Empty input"
                  icon={<DeleteIcon />}
                  size="sm"
                  onClick={handleClearCredit}
                  isDisabled={loading || !!uploadError}
                />
              </InputRightElement>
            </InputGroup>
            {!creditHelperText && !uploadError ? (
              <FormHelperText>
                {!loading && "Paste directly from clipboard"}
                {loading &&
                  uploadProgress < 1 &&
                  "Optimizing image before upload..."}
                {loading &&
                  uploadProgress >= 1 &&
                  uploadProgress < 99 &&
                  "Uploading image to cloud storage..."}
                {loading &&
                  uploadProgress >= 99 &&
                  "Updating information to database..."}
              </FormHelperText>
            ) : (
              <FormErrorMessage>{creditHelperText}</FormErrorMessage>
            )}
            {!!uploadError && (
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
            disabled={loading || !creditIsValid || !!uploadError}
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
