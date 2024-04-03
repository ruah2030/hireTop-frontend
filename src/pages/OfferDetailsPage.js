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
  useToast,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import apiRoute from "../api/route";
import axiosClient, { fetcher } from "../api/api";
import useSWR from "swr";
import { capitalizeFirstLetter, truncateWithEllipsis } from "../utils/helpers";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function OfferDetailsPage() {
  const perPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const { data, error, isLoading, mutate } = useSWR(
    `${apiRoute().offers}/${location.state.id}`,
    fetcher
  );
  return (
    <Container maxW={"7xl"}>
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
        <OfferDetailsComponent data={data?.data} user={user} />
      )}
    </Container>
  );
}

function OfferDetailsComponent({ data, user }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}
    >
      <Stack spacing={{ base: 6, md: 10 }}>
        <Box as={"header"}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
          >
            {capitalizeFirstLetter(data?.title)}
          </Heading>
        </Box>

        <Stack
          spacing={{ base: 4, sm: 6 }}
          direction={"column"}
          divider={
            <StackDivider
              borderColor={useColorModeValue("gray.200", "gray.600")}
            />
          }
        >
          <VStack spacing={{ base: 4, sm: 6 }}>
            <Text
              fontSize={"lg"}
              dangerouslySetInnerHTML={{
                __html: data?.description,
              }}
            ></Text>
          </VStack>
          <Box>
            <Text
              fontSize={{ base: "16px", lg: "18px" }}
              color={useColorModeValue("blue.500", "blue.300")}
              fontWeight={"500"}
              textTransform={"uppercase"}
              mb={"4"}
            >
              Details
            </Text>

            <List spacing={2}>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Type:
                </Text>{" "}
                {data?.type === "fulltime" ? "Plein temps" : "Temps Partiel"}
              </ListItem>
              <ListItem>
                <Text as={"span"} fontWeight={"bold"}>
                  Mode :
                </Text>{" "}
                {data?.type === "remote" ? "A distance" : "En presentiel"}
              </ListItem>
            </List>
          </Box>
        </Stack>

        <Button
          rounded={"none"}
          w={"full"}
          mt={8}
          size={"lg"}
          py={"7"}
          bg={useColorModeValue("gray.900", "gray.50")}
          color={useColorModeValue("white", "gray.900")}
          textTransform={"uppercase"}
          _hover={{
            transform: "translateY(2px)",
            boxShadow: "lg",
          }}
          isLoading={isLoading}
          onClick={(e) => {
            if (user.token == null) {
              toast({
                title: "Erreur",
                description: "Vous devez être connecté.",
                status: "warning",
                duration: 9000,
                isClosable: true,
                position: "top ",
              });
              return;
            }
            setIsLoading(true);
            axiosClient
              .post(apiRoute().subscriptions, {
                offer_id: data?.id,
              })
              .then((e) => {
                setIsLoading(false);
                toast({
                  title: "Success",
                  description: "Votre Canditure a été prise en compte.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                  position: "top ",
                });
              })
              .catch((err) => {
                if (err.response.status === 403) {
                  toast({
                    title: "Erreur",
                    description: "Vous avez deja postulez.",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top ",
                  });
                  setIsLoading(false);
                }
              });
          }}
        >
          Postuler
        </Button>
      </Stack>
    </SimpleGrid>
  );
}
