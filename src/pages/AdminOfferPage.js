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
function AdminRoute() {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    `${apiRoute().offers_paginate}?per_page=${perPage}&page=${currentPage}`,
    fetcher
  );
  return false ? (
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
      <Box mb={4}>
        <OfferModal
          url={apiRoute().offers}
          currentPage={currentPage}
          perPage={perPage}
        >
          <Button rightIcon={<MdAdd />} colorScheme="teal" variant="solid">
            Nouveau
          </Button>
        </OfferModal>
      </Box>
      {/* <TableContainer>
        <Table>
          <Thead>
            <Tr bg={"white"}>
              <Th p={7}>Nom</Th>
              <Th>Crée le</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data?.data.map((row) => (
              <Tr key={row.id} bg={"white"}>
                <Td>{row.name}</Td>
                <Td>{row.created_at}</Td>
                <Td>
                  <HStack spacing="lg" gap={3}>
                    <DeleteBtn
                      onAction={(setIsLoading) => {
                        setIsLoading(true);
                        axiosClient
                          .delete(`${apiRoute().offers}/${row.id}`)
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
                    <OfferModal
                      currentPage={currentPage}
                      perPage={perPage}
                      url={`${apiRoute().offers}/${row.id}`}
                      title={"Modifier"}
                      name={row.name}
                    >
                      <IconButton
                        colorScheme="blue"
                        aria-label="Call Segun"
                        size="lg"
                        icon={<BsPencilSquare />}
                      />
                    </OfferModal>
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
      )} */}
    </>
  );
}

function OfferModal({ children, title, name = "", url, currentPage, perPage }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const validateSchema = Yup.object().shape({
    name: Yup.string().required("Ce champs est requis"),
  });
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Formik
        initialValues={{
          name: name,
        }}
        onSubmit={(values, { resetForm }) => {
          setIsLoading(true);
          axiosClient.post(url, values).then((res) => {
            setIsLoading(false);
            mutate(
              `${
                apiRoute().offers_paginate
              }?per_page=${perPage}&page=${currentPage}`
            );
            resetForm();

            onClose();
          });
        }}
        validationSchema={validateSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          setFieldValue,
        }) => (
          <Form>
            <Modal
              isCentered
              onClose={onClose}
              isOpen={isOpen}
              motionPreset="slideInBottom"
              size={"xl"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl
                    isRequired
                    isInvalid={errors.name && touched.name}
                  >
                    <FormLabel>Nom</FormLabel>
                    <Input
                      placeholder="Ajouter utilisateur"
                      isInvalid={errors.name && touched.name}
                      value={values.name}
                      onChange={handleChange("name")}
                    />
                    {errors.name && touched.name && (
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    )}
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Fermer
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                  >
                    Valider
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AdminRoute;
