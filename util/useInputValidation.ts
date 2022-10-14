import { useState, ChangeEvent } from "react";

interface validationConfig {
  max: number | null;
  format?: "email" | null;
  process?: "unsplash" | null;
}

const formatRegex = {
  email: /^(.+)@(.+)$/,
};

const processCheck = {
  unsplash: (input: string) =>
    input.startsWith(`Photo by <a href="https://unsplash.com/`) &&
    input.trimEnd().endsWith(`>Unsplash</a>`),
};

const useInputValidation = (config: validationConfig) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleClearInput = () => {
    setInputValue("");
  };

  const validate = (input: string, config: validationConfig) => {
    const { max, format, process } = config;
    if (!input) return { message: "", isValid: false };
    if (max && input.length > max)
      return {
        message: `Please enter no more than ${max} characters`,
        isValid: false,
      };
    if (format) {
      const valid = input.match(formatRegex[format]);
      if (!valid)
        return {
          message: `Please enter in correct ${format} format`,
          valid: false,
        };
    }
    if (process) {
      const valid = processCheck[process](input);
      if (!valid)
        return {
          message: `Please paste credit directly from ${process}`,
          valid: false,
        };
    }

    return { message: "", isValid: true };
  };

  const { message, isValid } = validate(inputValue, config);

  return {
    inputValue,
    isValid,
    helperText: message,
    handleInputChange,
    handleClearInput,
  };
};

export default useInputValidation;
