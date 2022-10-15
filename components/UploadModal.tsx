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
  Checkbox,
  Text,
  Collapse,
  Highlight,
  Link,
} from "@chakra-ui/react";

import { DeleteIcon, ExternalLinkIcon } from "@chakra-ui/icons";

import { useUserContext } from "../util/UserContext";

import useInputValidation from "../util/useInputValidation";
import {
  resizeImage,
  handleUnsplashCreditSplit,
  IMG_LIST_PATH,
} from "../util/util";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UploadModal = ({ isOpen, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const initialRef = useRef<HTMLButtonElement>(null);

  const { user } = useUserContext();

  const {
    inputValue: creditValue,
    isValid: creditIsValid,
    helperText: creditHelperText,
    handleInputChange: handleCreditChange,
    handleClearInput: handleClearCredit,
  } = useInputValidation({ max: 500, process: "unsplash" });

  const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (!user) {
      console.log("USER EXPIRED");
      setUploadError("Please sign-in before uploading");
      setLoading(false);
      return;
    }
    const { email: userEmail } = user;

    const creditInfo = handleUnsplashCreditSplit(creditValue);
    if (!creditInfo) {
      console.log("PARSING ERROR");
      setUploadError("An error occurred while parsing credit input");
      setLoading(false);
      return;
    }

    const files = fileRef.current?.files;
    if (!files || files.length === 0) {
      console.log("MISSING FILE");
      setUploadError("Could not find the file to upload");
      setLoading(false);
      return;
    }
    const file = files[0];

    setLoading(true);

    const { name } = file;
    const imgName = name.substring(0, name.lastIndexOf("."));
    const timeStamp = Date.now();
    const keyStamp = Math.floor(timeStamp * Math.random());

    const optimizedFile = await resizeImage(file);
    console.log("COMPRESS COMPLETED");

    if (!optimizedFile || !(optimizedFile instanceof File)) {
      console.log("COMPRESS ERROR");
      setUploadError("An error occurred while optimizing image");
      setLoading(false);
      return;
    }

    const path = `${IMG_LIST_PATH}${optimizedFile.name}`;
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
        setUploadProgress(0);
        setUploadError("An error occurred while uploading to storage");
        setLoading(false);
      },
      () => {
        // Handle successful uploads on complete
        console.log("UPLOAD COMPLETED");
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            const uploadData = {
              ...creditInfo,
              id: `${imgName}-${keyStamp}`,
              url: downloadURL,
              path,
              timeStamp,
              userEmail,
            };
            console.log(uploadData);
            return set(
              refDB(database, `${IMG_LIST_PATH}${uploadData.id}`),
              uploadData
            );
          })
          .then(() => {
            console.log("DATABASE UPDATE COMPLETED");
            setUploadProgress(0);
            if (fileRef.current?.value) fileRef.current.value = "";
            handleClearCredit();
            setLoading(false);
          })
          .catch((error: any) => {
            console.log("DATABASE UPDATE ERROR");
            console.log(error);
            setUploadProgress(0);
            setUploadError("An error occurred while updating database");
            setLoading(false);
          });
      }
    );
  };

  const handleModalClose = () => {
    onClose();
    if (uploadError) setUploadError("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      initialFocusRef={initialRef}
      closeOnOverlayClick={!loading}
      closeOnEsc={!loading}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Image upload</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody as="form" id="upload-form" onSubmit={handleSubmit}>
          <Text>
            {`The upload function accepts images downloaded from `}
            <Link color="accent" href="" isExternal>
              {`Unsplash`}
              <ExternalLinkIcon mx="2px" />
            </Link>
            <Highlight
              query={["copy", "paste"]}
              styles={{
                color: "accent",
              }}
            >
              {` only. When downloading an image, copy the credit code provided and paste it directly into the credit input below.`}
            </Highlight>
          </Text>
          <Text mt={3}>
            Images uploaded by test users will be visible to logged-in users
            only and removed periodically.
          </Text>
          <Checkbox
            mt={3}
            isChecked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
            isDisabled={loading || !!uploadError}
          >
            I agree to upload responsibly
          </Checkbox>
          <Collapse in={isAgreed} animateOpacity>
            <FormControl mt={3} as="fieldset">
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                ref={fileRef}
                accept="image/*"
                isDisabled={loading || !!uploadError || !isAgreed}
              />
            </FormControl>
            <FormControl mt={3} as="fieldset" isInvalid={!!creditHelperText}>
              <FormLabel>Credit</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Credit"
                  value={creditValue}
                  onChange={handleCreditChange}
                  isDisabled={loading || !!uploadError || !isAgreed}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Empty input"
                    icon={<DeleteIcon />}
                    size="sm"
                    onClick={handleClearCredit}
                    isDisabled={loading || !!uploadError || !isAgreed}
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
          </Collapse>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="teal"
            type="submit"
            form="upload-form"
            mr={3}
            disabled={loading || !creditIsValid || !!uploadError || !isAgreed}
          >
            Upload
          </Button>
          <Button
            variant="ghost"
            onClick={handleModalClose}
            isDisabled={loading}
            ref={initialRef}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadModal;
