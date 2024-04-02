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

export default function OfferDetailsPage() {
  const perPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
 
  return (
    <Container maxW={"7xl"} minH={"100vh"}>
     
      <Text>
        Salut les gars
      </Text>
    </Container>
  );
}


