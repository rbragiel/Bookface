import React from "react";
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface FormFieldProps<T> extends FormControlProps {
  id: string;
  name: T;
  helperText: string;
  label: string;
  type: InputProps["type"];
  placeholder: string;
  register: (name: T) => ReturnType<UseFormRegister<T>>;
  error: FieldError | undefined;
}

const FormField = <T extends string>({
  id,
  helperText,
  label,
  error,
  placeholder,
  register,
  type,
  name,
  ...rest
}: FormFieldProps<T>) => {
  const { t } = useTranslation();
  return (
    <FormControl id={id} isInvalid={!!error} {...rest}>
      <FormLabel>{t(label)}</FormLabel>
      <Input type={type} placeholder={t(placeholder)} {...register(name)} />
      <FormHelperText>{t(helperText)}</FormHelperText>
      <FormErrorMessage>
        {error && error.message && t(error.message)}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormField;
