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
  const [type, setType] = useState("");
  const { data, error, isLoading, mutate } = useSWR(
    `${apiRoute().offers}?per_page=${perPage}&page=${currentPage}&type=${type}`,
    fetcher
  );
  return (
    <Container maxW={"7xl"} minH={"100vh"} position={"relative"}>
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
            value={type}
            onChange={(e) => setType(e.target.value)}
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
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
            }}
          >
            {data?.data?.data.map((item) => (
              <OfferItems item={item} />
            ))}
          </SimpleGrid>
          <Box
            height={{
              base: 70,
              md: 90,
            }}
          />
          <Box position={"absolute"} bottom={0} left={10} right={10} mb={3}>
            {data?.data?.total > perPage && (
              <Pagination
                currentPage={data?.data?.current_page}
                totalPages={data?.data?.last_page}
                onPageChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            )}
          </Box>
        </>
      )}
    </Container>
  );
}

function OfferItems({ item }) {
  const navigate = useNavigate();
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">{capitalizeFirstLetter(item.title)}</Text>
      </Stack>

      <Stack
        direction={{ base: "column", md: "column" }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
          <div
            dangerouslySetInnerHTML={{
              __html: truncateWithEllipsis(item.description, 300),
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
