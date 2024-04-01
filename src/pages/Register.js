import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  Link as ChakraLink,
  Select,
} from "@chakra-ui/react";
import {
  Outlet,
  Navigate,
  Link as ReactRouterLink,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axiosClient from "../api/api";
import apiRoute from "../api/route";
export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailAlreadyTaken, setEmailAlreadyTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const validateSchema = Yup.object().shape({
    first_name: Yup.string().required("Ce champs est requis"),
    last_name: Yup.string().required("Ce champs est requis"),
    type: Yup.string().required("Ce champs est requis"),
    occupation: Yup.string().when("type", (type, field) => {
      if (type[0] === "normal") {
        return field.required("Veuillez renseigner votre poste actuel");
      }
    }),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Ce champs est requis"),
    password: Yup.string()
      .required("Ce champs est requis")
      .min(8, "Ce champs doit contenir au minimum 8 caratère"),
    password_confirmation: Yup.string().when("password", (password, field) => {
      if (password) {
        return field
          .required("Ce champs doit être identique au mot de passe")
          .oneOf(
            [Yup.ref("password")],
            "Ce champs doit être identique au mot de passe"
          );
      }
    }),
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            S' Inscrire
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {/* to enjoy all of our cool features ✌️ */}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w={"sm"}
        >
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              password_confirmation: "",
              type: "",
              occupation: "",
            }}
            onSubmit={(values, actions) => {
              setIsLoading(true);
              axiosClient
                .post(apiRoute().register, values)
                .then((res) => {
                  setIsLoading(false);

                  navigate("/login");
                })
                .catch((err) => {
                  if (err.response.status == 403) {
                    setIsLoading(false);
                    setEmailAlreadyTaken(true);
                  }
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
              <Form onSubmit={(values) => {}}>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <FormControl
                        id="first_name"
                        isRequired
                        isInvalid={errors.first_name && touched.first_name}
                      >
                        <FormLabel>Nom</FormLabel>
                        <Input
                          type="text"
                          onChange={handleChange("first_name")}
                          value={values.first_name}
                        />
                        {errors.first_name && touched.first_name && (
                          <FormErrorMessage>
                            {errors.first_name}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl
                        id="last_name"
                        isRequired
                        isInvalid={errors.last_name && touched.last_name}
                      >
                        <FormLabel>Prénom</FormLabel>
                        <Input
                          type="text"
                          onChange={handleChange("last_name")}
                          value={values.last_name}
                        />
                        {errors.last_name && touched.last_name && (
                          <FormErrorMessage>
                            {errors.last_name}
                          </FormErrorMessage>
                        )}
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl
                    id="email"
                    isRequired
                    isInvalid={
                      (errors.email && touched.email) || emailAlreadyTaken
                    }
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      onChange={(e) => {
                        handleChange(e, "email");
                        if (emailAlreadyTaken) {
                          setEmailAlreadyTaken(false);
                        }
                      }}
                      value={values.email}
                    />
                    {((errors.email && touched.email) || emailAlreadyTaken) && (
                      <FormErrorMessage>
                        {errors.email || "Ce email est de pris"}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    id="type"
                    isRequired
                    isInvalid={errors.type && touched.type}
                  >
                    <FormLabel>Type Utilisateur</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={values.type}
                      onChange={handleChange("type")}
                    >
                      <option value="normal">Utilsateur</option>
                      <option value="special">Entreprise</option>
                    </Select>
                    {errors.type && touched.type && (
                      <FormErrorMessage>{errors.type}</FormErrorMessage>
                    )}
                  </FormControl>
                  {values.type === "normal" && (
                    <FormControl
                      id="occupation"
                      isRequired
                      isInvalid={errors.occupation && touched.occupation}
                    >
                      <FormLabel>Poste Actuel</FormLabel>
                      <Input
                        type="text"
                        onChange={handleChange("occupation")}
                        value={values.occupation}
                      />
                      {errors.occupation && touched.occupation && (
                        <FormErrorMessage>{errors.occupation}</FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                  <FormControl
                    id="password"
                    isRequired
                    isInvalid={errors.password && touched.password}
                  >
                    <FormLabel>Mot de passe</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange("password")}
                        value={values.password}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                          }
                        >
                          {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && touched.password && (
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    id="confimPassword"
                    isRequired
                    isInvalid={
                      errors.password_confirmation &&
                      touched.password_confirmation
                    }
                  >
                    <FormLabel>Confirmer Mot de Passe</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        onChange={handleChange("password_confirmation")}
                        value={values.password_confirmation}
                      />
                      <InputRightElement h={"full"}>
                        <Button
                          variant={"ghost"}
                          onClick={() =>
                            setShowConfirmPassword(
                              (showConfirmPassword) => !showConfirmPassword
                            )
                          }
                        >
                          {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {errors.password_confirmation &&
                      touched.password_confirmation && (
                        <FormErrorMessage>
                          {errors.password_confirmation}
                        </FormErrorMessage>
                      )}
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      isLoading={isLoading}
                      onClick={handleSubmit}
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      S'Inscrire
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Vous avez deja un compte?{" "}
                      <ChakraLink
                        color={"blue.400"}
                        as={ReactRouterLink}
                        to={"/login"}
                      >
                        Se Connecter
                      </ChakraLink>
                    </Text>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
