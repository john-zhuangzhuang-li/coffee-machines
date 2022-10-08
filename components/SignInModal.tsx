import { useState, useRef, ChangeEvent, FormEvent } from "react";

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
  Icon,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useUserContext } from "../util/UserContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SignInModal = ({ isOpen, onClose }: Props) => {
  const initialRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordDisplayToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleEmailValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.currentTarget.value);
  };
  const handlePasswordValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.currentTarget.value);
  };

  const { userSignIn } = useUserContext();
  const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!userSignIn) return;
    try {
      await userSignIn(emailValue, passwordValue);
      console.log("SIGN IN SUCCESSFUL");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Admin Sign-in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" id="sign-in-form" onSubmit={handleSubmit}>
          <FormControl as="fieldset">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="email@example.com"
              value={emailValue}
              onChange={handleEmailValueChange}
              ref={initialRef}
            />
          </FormControl>
          <FormControl mt={3} as="fieldset">
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={passwordValue}
                onChange={handlePasswordValueChange}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Toggle password display"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handlePasswordDisplayToggle}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} type="submit" form="sign-in-form">
            Sign-in
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignInModal;
