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
function AdminOfferPage() {
  const perPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data, error, isLoading, mutate } = useSWR(
    `${apiRoute().offers_paginate}?per_page=${perPage}&page=${currentPage}`,
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
      <TableContainer>
        <Table>
          <Thead>
            <Tr bg={"white"}>
              <Th p={7}>Nom</Th>
              <Th>Crée le</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.data.map((row) => (
              <Tr key={row.id} bg={"white"}>
                <Td>{row.title}</Td>
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
                      header_title={"Modifier"}
                      title={row.title}
                      description={row.description}
                      mode={row.mode}
                      type={row.type}
                      taxonomy={row.taxonomy}
                      active={row.active}
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

function OfferModal({
  children,
  header_title,
  title = "",
  taxonomy = "",
  description = "",
  mode = "",
  type,
  active = true,
  url,
  currentPage,
  perPage,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const validateSchema = Yup.object().shape({
    title: Yup.string().required("Ce champs est requis"),
    taxonomy: Yup.string().required("Ce champs est requis"),
    mode: Yup.string().required("Ce champs est requis"),
    type: Yup.string().required("Ce champs est requis"),
    description: Yup.string().required("Ce champs est requis"),
    active: Yup.boolean().required("Ce champs est requis"),
  });

  const handleActive = (e, setFieldValue) => {
    setFieldValue("active", e.target.checked, true);
  };
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Formik
        initialValues={{
          title: title,
          mode: mode,
          type: type,
          description: description,
          taxonomy: taxonomy,
          active: active,
        }}
        onSubmit={(values, { resetForm }) => {
          setIsLoading(true);
          axiosClient
            .post(url, values)
            .then((res) => {
              setIsLoading(false);
              mutate(
                `${
                  apiRoute().offers_paginate
                }?per_page=${perPage}&page=${currentPage}`
              );
              if (title === "") {
                resetForm();
              }

              onClose();
            })
            .catch((e) => {
              setIsLoading(false);
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
              size={"full"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{header_title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  display={"flex"}
                  w="full"
                  maxW="100vw"
                  justifyContent={"center"}
                >
                  <Box >
                    <FormControl
                      isRequired
                      isInvalid={errors.title && touched.title}
                    >
                      <FormLabel>Titre</FormLabel>
                      <Input
                        placeholder="Titre"
                        isInvalid={errors.title && touched.title}
                        value={values.title}
                        onChange={handleChange("title")}
                      />
                      {errors.title && touched.title && (
                        <FormErrorMessage>{errors.title}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={errors.description && touched.description}
                    >
                      <FormLabel>Description </FormLabel>
                      <ReactQuill
                        theme="snow"
                        value={values.description}
                        onChange={(content, delta, source, editor) => {
                          setFieldValue("description", content, true);
                          setValue(content);
                        }}
                      />
                      {errors.description && touched.description && (
                        <FormErrorMessage>
                          {errors.description}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      id="type"
                      isRequired
                      isInvalid={errors.type && touched.type}
                    >
                      <FormLabel>Type de travail</FormLabel>
                      <Select
                        placeholder="Type de travail"
                        value={values.type}
                        onChange={handleChange("type")}
                      >
                        <option value="fulltime">Plein temps</option>
                        <option value="partial">Temps partiel</option>
                      </Select>
                      {errors.type && touched.type && (
                        <FormErrorMessage>{errors.type}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={errors.mode && touched.mode}
                    >
                      <FormLabel>Mode de travail</FormLabel>
                      <Select
                        placeholder="Mode de travail"
                        value={values.mode}
                        onChange={handleChange("mode")}
                      >
                        <option value="presence">Presentiel</option>
                        <option value="remote">Remote</option>
                      </Select>
                      {errors.mode && touched.mode && (
                        <FormErrorMessage>{errors.mode}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={errors.taxonomy && touched.taxonomy}
                    >
                      <FormLabel>Categorie</FormLabel>
                      <Select
                        placeholder="Categorie"
                        value={values.taxonomy}
                        onChange={handleChange("taxonomy")}
                      >
                        <optgroup label="Secteur primaire">
                          <option value="Agriculture">Agriculture</option>
                          <option value="Pêche">Pêche</option>
                          <option value="Exploitation forestière">
                            Exploitation forestière
                          </option>
                          <option value="Extraction minière">
                            Extraction minière
                          </option>
                        </optgroup>
                        <optgroup label="Secteur secondaire">
                          <option value="Industrie manufacturière">
                            Industrie manufacturière
                          </option>
                          <option value="Construction">Construction</option>
                          <option value="Production d'énergie">
                            Production d'énergie
                          </option>
                        </optgroup>
                        <optgroup label="Secteur tertiaire">
                          <option value="Services financiers">
                            Services financiers
                          </option>
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
                            Technologies de l'information et de la communication
                            (TIC)
                          </option>
                          <option value="Services de conseil">
                            Services de conseil
                          </option>
                        </optgroup>
                      </Select>
                      {errors.taxonomy && touched.taxonomy && (
                        <FormErrorMessage>{errors.taxonomy}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      isRequired
                      isInvalid={errors.active && touched.active}
                    >
                      <FormLabel>Publier</FormLabel>
                      <Switch
                        value={values.active}
                        onChange={(e) => {
                          handleActive(e, setFieldValue);
                        }}
                        isChecked={values.active}
                      />
                    </FormControl>
                  </Box>
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

export default AdminOfferPage;
