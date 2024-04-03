import React, { useState } from "react";
import {
  IconButton,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  FormControl,
  Input,
  FormLabel,
  Spinner,
  Button,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormErrorMessage,
  Select,
  Switch,
  SimpleGrid,
  Center,
  useColorModeValue,
  Avatar,
  Heading,
  Text,
  Stack,
  Badge,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import DeleteBtn from "../components/DeleteBtn";
import TpModal from "../components/TpModal";
import * as Yup from "yup";
import RouteForm from "../components/Form/RouteForm";
import { MdAdd } from "react-icons/md";
import useSWR, { mutate } from "swr";
import axiosClient, { fetcher } from "../api/api";
import { Formik, Form } from "formik";
import apiRoute from "../api/route";
import { HiViewGridAdd } from "react-icons/hi";
import Pagination from "../components/Pagination";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FiEye } from "react-icons/fi";
import { capitalizeFirstLetter } from "../utils/helpers";
import { INIT, REJECT } from "../constant/app_constant";
function AdminFolderPage() {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    `${apiRoute().folders}`,
    fetcher
  );
  return isLoading ? (
    <Flex alignItems={"center"} justifyContent={"center"} minH={"70vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  ) : (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr bg={"white"}>
              <Th p={7}>Offre</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data.map((row) => (
              <Tr key={row.id} bg={"white"}>
                <Td>{row.offer.title}</Td>
                <Td>
                  <Tag size="lg" colorScheme="blue" borderRadius="full">
                    <TagLabel>
                      {row.step === INIT
                        ? "En attente"
                        : row.step === REJECT
                        ? "Rejeté"
                        : "Valider"}
                    </TagLabel>
                  </Tag>
                </Td>
                <Td>
                  <HStack spacing="lg" gap={3}>
                    <SubModal users={row?.subscriptions}>
                      <IconButton
                        colorScheme="blue"
                        aria-label="Call Segun"
                        size="lg"
                        icon={<FiEye />}
                      />
                    </SubModal>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
  );
}

function SubModal({ children, users, title = "" }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            w="full"
            maxW="100vw"
            justifyContent={"center"}
          >
            <Box w={"3xl"}>
            
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AdminFolderPage;
