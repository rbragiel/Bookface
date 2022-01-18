import React, { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  useBoolean,
} from "@chakra-ui/react";
import { useErrorState } from "@hooks/useErrorState";
import { useAppSelector } from "@store/hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppSpinner } from "@components/spinner";
import { useTranslation } from "react-i18next";
import { getTokenFromLS } from "../../../../store/auth/index";

interface SearchModalProps {
  isOpen: boolean;
  close: () => void;
}

interface UserFromSearch {
  userId: string;
  nickname: string;
  email: string;
  avatarURL: string | null;
}

interface UsersSearchResult {
  users: UserFromSearch[];
}

const getSearchResults = async ({
  search,
  page = 0,
}: {
  search: string;
  page?: number;
}): Promise<[UsersSearchResult | null, unknown | null]> => {
  try {
    const { data } = await axios.get(
      `/api/user/search?query=${search}&page=${page}`,
      { headers: { Authorization: getTokenFromLS() ?? "" } }
    );

    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

const searchLengthAllowed = 2;

const SearchModal = ({ isOpen, close }: SearchModalProps) => {
  const [results, setResults] = useState<UsersSearchResult | null>(null);
  const [search, setSearch] = useState("");
  const { error, reset, handleError } = useErrorState();
  const [loading, { off, on }] = useBoolean(false);
  const { user: loggedUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    let id: number;
    if (search.length > searchLengthAllowed) {
      const handleSearch = async () => {
        reset();

        const [result, error] = await getSearchResults({ search });

        if (result) {
          setResults(result);
        }

        if (error) {
          handleError(error);
        }

        off();
      };

      id = setTimeout(handleSearch, 1000);

      if (results) {
        setResults(null);
      }

      if (!loading && search.length > searchLengthAllowed) {
        on();
      }
    }

    return () => {
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const onClose = () => {
    if (!loading) {
      setResults(null);
      setSearch("");
      reset();
      close();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent p={4}>
        <Box>
          <InputGroup>
            <InputLeftElement height="100%">
              <SearchIcon />
            </InputLeftElement>
            <Input
              type="text"
              name="search"
              placeholder={t("Search for user. Type at least 3 characters.")}
              size="lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          {results &&
            (results.users.length > 0 ? (
              <Stack spacing={4} mt={2}>
                {results.users.map((user) => (
                  <Button
                    key={user.userId}
                    justifyContent="start"
                    onClick={() => {
                      if (user.userId == loggedUser?.userId) {
                        navigate(`/dashboard/profile`);
                      } else {
                        navigate(`/dashboard/users/${user.userId}`);
                      }
                      onClose();
                    }}
                  >
                    {user.nickname}
                  </Button>
                ))}
              </Stack>
            ) : (
              <Box mt={2}>{t("No results")}</Box>
            ))}
          {error && <Box mt={2}>{error.message}</Box>}
          {loading && (
            <Center mt={2}>
              <AppSpinner size="lg" />
            </Center>
          )}
        </Box>
      </ModalContent>
    </Modal>
  );
};

export { SearchModal };
