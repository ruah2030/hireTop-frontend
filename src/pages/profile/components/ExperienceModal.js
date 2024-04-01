import React, { useState } from "react";
import {
  FormControl,
  Input,
  FormLabel,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormErrorMessage,
  Textarea
} from "@chakra-ui/react";
import * as Yup from "yup";

import { mutate } from "swr";
import axiosClient from "../../../api/api";
import { Formik, Form } from "formik";
import apiRoute from "../../../api/route";

import { useSelector } from "react-redux";

export default function ExperienceModal({
  children,
  title,
  name = "",
  desc = "",
  start_at = "",
  finished_at = "",
  url,
  currentPage,
  perPage,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  const validateSchema = Yup.object().shape({
    name: Yup.string().required("Ce champs est requis"),
    desc: Yup.string().required("Ce champs est requis"),
    finished_at: Yup.string().required("Ce champs est requis"),
    start_at: Yup.string().required("Ce champs est requis"),
  });

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Formik
        initialValues={{
          name: name,
          desc: desc,
          start_at: start_at,
          finished_at: finished_at,
        }}
        onSubmit={(values, { resetForm }) => {
          setIsLoading(true);

          axiosClient
            .post(`${url}`, values)
            .then((res) => {
              mutate(
                `${
                  apiRoute().experiences_paginate
                }?per_page=${perPage}&page=${currentPage}`
              );
              if(name===''){
                resetForm()
              }
              setIsLoading(false);
              onClose();
            })
            .catch((err) => {
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
          resetForm,
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
                      placeholder="Nom"
                      isInvalid={errors.name && touched.name}
                      value={values.name}
                      onChange={handleChange("name")}
                    />
                    {errors.name && touched.name && (
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={errors.desc && touched.desc}
                  >
                    <FormLabel>Description </FormLabel>
                    <Textarea
                      placeholder="Description"
                      isInvalid={errors.desc && touched.desc}
                      value={values.desc}
                      onChange={handleChange("desc")}
                    />
                    {errors.desc && touched.desc && (
                      <FormErrorMessage>{errors.desc}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={errors.start_at && touched.start_at}
                  >
                    <FormLabel>De</FormLabel>
                    <Input
                      type="date"
                      placeholder="Quantité"
                      isInvalid={errors.start_at && touched.start_at}
                      value={values.start_at}
                      onChange={handleChange("start_at")}
                    />
                    {errors.start_at && touched.start_at && (
                      <FormErrorMessage>{errors.start_at}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={errors.start_at && touched.start_at}
                  >
                    <FormLabel>A</FormLabel>
                    <Input
                      type="date"
                      value={values.finished_at}
                      isInvalid={errors.finished_at && touched.finished_at}
                      onChange={handleChange("finished_at")}
                    />
                    {errors.finished_at && touched.finished_at && (
                      <FormErrorMessage>{errors.finished_at}</FormErrorMessage>
                    )}
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                      onClose();
                      resetForm();
                    }}
                  >
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
