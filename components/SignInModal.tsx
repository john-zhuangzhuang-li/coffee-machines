import { useState, useRef, FormEvent } from "react";

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
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
} from "@chakra-ui/react";

import {
  ViewIcon,
  ViewOffIcon,
  WarningTwoIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { useUserContext } from "../util/UserContext";
import useInputValidation from "../util/useInputValidation";

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

  const {
    inputValue: emailValue,
    isValid: emailIsValid,
    helperText: emailHelperText,
    handleInputChange: handleEmailChange,
    handleClearInput: handleClearEmail,
  } = useInputValidation({ max: 30, format: "email" });

  const {
    inputValue: passwordValue,
    isValid: passwordIsValid,
    helperText: passwordHelperText,
    handleInputChange: handlePassowrdChange,
    handleClearInput: handleClearPassowrd,
  } = useInputValidation({ max: 30 });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const { user, userSignIn } = useUserContext();
  const handleSubmit = async (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!userSignIn) return;
    setLoading(true);
    try {
      await userSignIn(emailValue, passwordValue);
      console.log("SIGN IN SUCCESSFUL");
      handleClearEmail();
      handleClearPassowrd();
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
      setAuthError("An error occurred while authenticating");
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    onClose();
    if (authError) setAuthError("");
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
        <ModalHeader>Admin Sign-in</ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        {authError && (
          <ModalBody
            display="flex"
            justifyContent="center"
            flexDir="column"
            alignItems="center"
            rowGap={3}
          >
            <WarningTwoIcon w={8} h={8} />
            <Text size="md">Invalid credentials 😨</Text>
          </ModalBody>
        )}
        {!authError && user && (
          <ModalBody
            display="flex"
            justifyContent="center"
            flexDir="column"
            alignItems="center"
            rowGap={3}
            mt={3}
          >
            <CheckCircleIcon w={8} h={8} />
            <Text size="md">Welcome back 😋</Text>
          </ModalBody>
        )}
        {!authError && !user && (
          <ModalBody as="form" id="sign-in-form" onSubmit={handleSubmit}>
            <FormControl as="fieldset" isInvalid={!!emailHelperText}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="email@example.com"
                value={emailValue}
                onChange={handleEmailChange}
                ref={initialRef}
                isDisabled={loading}
              />
              {!!emailHelperText && (
                <FormErrorMessage>{emailHelperText}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mt={3} as="fieldset" isInvalid={!!passwordHelperText}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={passwordValue}
                  onChange={handlePassowrdChange}
                  isDisabled={loading}
                />
                <InputRightElement>
                  <IconButton
                    aria-label="Toggle password display"
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    size="sm"
                    onClick={handlePasswordDisplayToggle}
                    isDisabled={loading}
                  />
                </InputRightElement>
              </InputGroup>
              {!!passwordHelperText && (
                <FormErrorMessage>{passwordHelperText}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
        )}
        <ModalFooter>
          {authError && (
            <Button
              colorScheme="teal"
              mr={3}
              isDisabled={loading}
              onClick={() => setAuthError("")}
            >
              Retry
            </Button>
          )}
          {!authError && !user && (
            <Button
              colorScheme="teal"
              mr={3}
              type="submit"
              form="sign-in-form"
              isLoading={loading}
              isDisabled={loading || !emailIsValid || !passwordIsValid}
            >
              Sign-in
            </Button>
          )}
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

export default SignInModal;
