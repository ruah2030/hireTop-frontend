import React, { useState, useEffect } from "react";
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
  Textarea,
} from "@chakra-ui/react";
import { BsPencilSquare } from "react-icons/bs";
import DeleteBtn from "../../../components/DeleteBtn";
import * as Yup from "yup";
import { MdAdd } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import useSWR, { mutate } from "swr";
import axiosClient, { fetcher } from "../../../api/api";
import { Formik, Form } from "formik";
import apiRoute from "../../../api/route";
import Pagination from "../../../components/Pagination";
import axios from "axios";
import { useSelector } from "react-redux";
import envConfig from "../../../config/env";
import { AiOutlineEye } from "react-icons/ai";
import ExperienceModal from "./ExperienceModal";
import AbiliyModal from "./CompetenceModal";
function Abiliy({callback}) {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    `${
      apiRoute().abilities_paginate
    }?per_page=${perPage}&page=${currentPage}`,
    fetcher
  );
  return !isLoading ? (
    <>
      <Box mb={4}>
        <AbiliyModal
          url={apiRoute().abilities}
          currentPage={currentPage}
          perPage={perPage}
        >
          <Button rightIcon={<MdAdd />} colorScheme="teal" variant="solid">
            Nouveau
          </Button>
        </AbiliyModal>
      </Box>
      <TableContainer>
        <Table>
          <Thead>
            <Tr bg={"white"}>
              <Th p={7}>Nom</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data.data.map((row) => (
              <Tr key={row.id} bg={"white"}>
                <Td>{row.name}</Td>
                <Td>
                  <HStack spacing="lg" gap={3}>
                    <DeleteBtn
                      onAction={(setIsLoading) => {
                        setIsLoading(true);
                        axiosClient
                          .delete(`${apiRoute().abilities}/${row.id}`)
                          .then((res) => {
                            mutate();
                            setIsLoading(false);
                          });
                      }}
                    >
                      <IconButton
                        colorScheme="red"
                        aria-label="Call Segun"
                        size="lg"
                        icon={<BiTrash />}
                      />
                    </DeleteBtn>
                    <AbiliyModal
                      url={`${apiRoute().abilities}/${row.id}`}
                      title={"Modifier"}
                      name={row.name}
                      desc={row.desc}
                      start_at={row.start_at}
                      finished_at={row.finished_at}
                      currentPage={currentPage}
                      perPage={perPage}
                    >
                      <IconButton
                        colorScheme="blue"
                        aria-label="Call Segun"
                        size="lg"
                        icon={<BsPencilSquare />}
                      />
                    </AbiliyModal>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {data.data?.total > perPage && (
        <Pagination
          currentPage={data.data?.current_page}
          totalPages={data.data?.last_page}
          onPageChange={(page) => {
            setCurrentPage(page);
          }}
        />
      )}
    </>
  ) : (
    <Flex alignItems={"center"} justifyContent={"center"} minH={"70vh"}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
}

export default Abiliy;
