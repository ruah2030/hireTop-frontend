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
function AdminSubscriptionPage() {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    `${apiRoute().subscriptions_paginate}?per_page=${perPage}&page=${currentPage}`,
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
              <Th>Nombres de Candidatures</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.data.map((row) => (
              <Tr key={row.id} bg={"white"}>
                <Td>{row.title}</Td>
                <Td>{row?.users?.length}</Td>
                <Td>
                  <HStack spacing="lg" gap={3}>
                    <IconButton
                      colorScheme="blue"
                      aria-label="Call Segun"
                      size="lg"
                      icon={<BsPencilSquare />}
                    />
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

export default AdminSubscriptionPage;
