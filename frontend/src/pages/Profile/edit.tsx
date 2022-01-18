import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useImageInput } from "@hooks/useImageInput";
import dayjs from "dayjs";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { User } from "../../models/user";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { update } from "@store/auth";

type UserEditable = Pick<User, "birthday" | "description">;
type UserRequiredEditable = Required<UserEditable>;

interface EditProps {
  data: UserEditable;
  off: () => void;
}

const eighteenYearsOld = dayjs()
  .subtract(18, "years")
  .set("months", 1)
  .set("date", 1)
  .format("YYYY-MM-DD");

const formSchema = zod.object({
  description: zod
    .string()
    .max(150, "About length must be less than 150 characters."),
  birthday: zod.string(),
});

const Edit = ({ data, off }: EditProps) => {
  const { birthday, description } = data;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const { clickInput, inputRef, onChange, image } = useImageInput();

  const { register, handleSubmit } = useForm<UserRequiredEditable>({
    defaultValues: {
      birthday: birthday ? dayjs(birthday).format("YYYY-MM-DD") : "",
      description: description ?? "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    const { birthday, description } = data;
    const formData = new FormData();

    formData.append("birthday", birthday);
    formData.append("description", description);

    if (image) {
      formData.append("file", image);
    }

    try {
      await dispatch(update(formData)).unwrap();
    } catch (error) {
      //
    } finally {
      off();
    }
  });

  return (
    <Stack spacing={4} as="form" onSubmit={onSubmit}>
      <FormControl>
        <FormLabel>{t("Birthday")}</FormLabel>
        <Input
          placeholder={t("Your birthday")}
          type="date"
          max={eighteenYearsOld}
          {...register("birthday")}
          isDisabled={loading}
        />
      </FormControl>
      <FormControl>
        <FormLabel>{t("About")}</FormLabel>
        <Textarea
          resize="none"
          placeholder={t("Your about")}
          {...register("description")}
          isDisabled={loading}
        />
      </FormControl>
      <FormControl mt={4} display="flex" alignItems="center">
        <FormLabel>{t("Avatar")}</FormLabel>
        <Input
          type="file"
          accept="image/*"
          display="none"
          name="image"
          ref={inputRef}
          onChange={onChange}
          isDisabled={loading}
        />
        <Button colorScheme="teal" onClick={clickInput}>
          {t("Upload avatar")}
        </Button>
      </FormControl>
      {image && (
        <Text>
          {t("Filename")}: {image.name}
        </Text>
      )}
      <Button
        colorScheme="teal"
        alignSelf="flex-end"
        justifySelf="flex-end"
        width="fit-content"
        type="submit"
        isLoading={loading}
      >
        {t("Save")}
      </Button>
    </Stack>
  );
};

export { Edit };
