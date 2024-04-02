"use client";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Spinner,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import apiRoute from "../api/route";
import { fetcher } from "../api/api";
import useSWR from "swr";
import { capitalizeFirstLetter, truncateWithEllipsis } from "../utils/helpers";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

export default function OfferPage() {
  const perPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    `${apiRoute().offers}?per_page=${perPage}&page=${currentPage}`,
    fetcher
  );
  return (
    <Container maxW={"7xl"} minH={"100vh"}>
      {/* <SearchField /> */}
      {isLoading ? (
        <Box
          width={"100%"}
          height={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <>
          <Select
            placeholder="Type d'offre"
            value={""}
            onChange={(e) => ""}
            p={4}
            variant="filled"
          >
            <optgroup label="Secteur primaire">
              <option value="Agriculture">Agriculture</option>
              <option value="Pêche">Pêche</option>
              <option value="Exploitation forestière">
                Exploitation forestière
              </option>
              <option value="Extraction minière">Extraction minière</option>
            </optgroup>
            <optgroup label="Secteur secondaire">
              <option value="Industrie manufacturière">
                Industrie manufacturière
              </option>
              <option value="Construction">Construction</option>
              <option value="Production d'énergie">Production d'énergie</option>
            </optgroup>
            <optgroup label="Secteur tertiaire">
              <option value="Services financiers">Services financiers</option>
              <option value="Éducation">Éducation</option>
              <option value="Santé">Santé</option>
              <option value="Services aux entreprises">
                Services aux entreprises
              </option>
              <option value="Commerce de détail et de gros">
                Commerce de détail et de gros
              </option>
              <option value="Hôtellerie et restauration">
                Hôtellerie et restauration
              </option>
              <option value="Technologies de l'information et de la communication (TIC)">
                Technologies de l'information et de la communication (TIC)
              </option>
              <option value="Services de conseil">Services de conseil</option>
            </optgroup>
          </Select>
          <SimpleGrid columns={2}>
            {data?.data?.data.map((item) => (
              <OfferItems item={item} />
            ))}
          </SimpleGrid>
          {data?.data?.total > perPage && (
            <Pagination
              currentPage={data?.data?.current_page}
              totalPages={data?.data?.last_page}
              onPageChange={(page) => {
                setCurrentPage(page);
              }}
            />
          )}
        </>
      )}
    </Container>
  );
}

const SearchField = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Faites quelque chose avec le terme de recherche, comme passer à un gestionnaire parent
    onSearch(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box p="4">
      <InputGroup>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          variant="filled"
          //   color="blue.800" // Changer la couleur du texte à bleu (modifier 800 selon votre besoin)
          //   _placeholder={{ color: 'blue.500' }} // Changer la couleur du placeholder à bleu (modifier 500 selon votre besoin)
        />
        <InputRightElement>
          <Button onClick={handleSearch} variant="ghost">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

function OfferItems({ item }) {
  const navigate = useNavigate();
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">{capitalizeFirstLetter(item.title)}</Text>
        {/* <FcLock /> */}
      </Stack>

      <Stack
        direction={{ base: "column", md: "column" }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
          <div
            dangerouslySetInnerHTML={{
              __html: truncateWithEllipsis(item.description),
            }}
          ></div>
        </Text>
        <Stack direction={{ base: "column", md: "row" }}>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => {
              navigate(`/offers/${item.id}`, {
                state: item,
              });
            }}
          >
            Plus de Details
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

const SearchOptions = ({ onSearch }) => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");

  const handleSearch = () => {
    // Faites quelque chose avec les options de recherche, comme passer à un gestionnaire parent
    onSearch(option1, option2, option3);
  };

  return (
    <Flex align="center" justify="center" p={4}>
      <Select
        placeholder="Option 1"
        value={option1}
        onChange={(e) => setOption1(e.target.value)}
        mr={2}
        variant="filled"
      >
        <option value="option1_value1">Option 1 - Value 1</option>
        <option value="option1_value2">Option 1 - Value 2</option>
        <option value="option1_value3">Option 1 - Value 3</option>
      </Select>
      <Select
        placeholder="Option 2"
        value={option2}
        onChange={(e) => setOption2(e.target.value)}
        mr={2}
        variant="filled"
      >
        <option value="option2_value1">Option 2 - Value 1</option>
        <option value="option2_value2">Option 2 - Value 2</option>
        <option value="option2_value3">Option 2 - Value 3</option>
      </Select>
    </Flex>
  );
};
