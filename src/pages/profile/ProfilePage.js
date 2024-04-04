import React, { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  FormErrorMessage,
  Box,
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import axiosClient, { fetcher } from "../../api/api";
import { Formik, Form } from "formik";
import apiRoute from "../../api/route";
import { useEffect } from "react";
import { BusinessSchema, SecuritySchema, UpdateUserSchema } from "../../schema";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { getUserMeta } from "../../utils/helpers";
import Experience from "./components/Experience";
import Abiliy from "./components/Ability";
export default function ProfilePage() {
  const [isLoadingOn, setIsLoadingOn] = useState(false);
  const [isUpdateLoading, setUpdatetIsLoading] = useState(false);
  const org_meta = useSWR(apiRoute().get_user_org_meta, fetcher);
  const toast = useToast();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
   
  });
  return (
    <Flex bg="white">
      <Tabs width={"100%"}>
        <TabList>
          {user.is_organisation === 1 && <Tab>Entreprise</Tab>}
          {user.is_organisation === 0 && <Tab>Compétences</Tab>}
          {user.is_organisation === 0 && <Tab>Experiences</Tab>}
          <Tab>Profile</Tab>
          <Tab>Sécurité</Tab>
        </TabList>
        <TabPanels>
          {user.is_organisation === 0 && (
            <TabPanel w={"full"}  maxW={"100vw"}>
              <Abiliy/>
            </TabPanel>
          )}
          {user.is_organisation === 0 && (
            <TabPanel w={"full"} maxW={"100vw"}>
              <Experience/>
            </TabPanel>
          )}
          {user.is_organisation === 1 && (
            <TabPanel w={"full"} maxW={"lg"}>
              {org_meta.isLoading ? (
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  w={"full"}
                  height={"100vh"}
                >
                  <Spinner
                    alignSelf={"center"}
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Box>
              ) : (
                <Box width={"100%"}>
                  <Formik
                    initialValues={{
                      overview: getUserMeta(org_meta?.data?.data, "overview"),
                      history: getUserMeta(org_meta?.data?.data, "history"),
                      culture:
                        getUserMeta(org_meta?.data?.data, "culture") || "",
                      org_name:
                        getUserMeta(org_meta?.data?.data, "org_name") || "",
                    }}
                    onSubmit={(values, { resetForm }) => {
                      setUpdatetIsLoading(true);
                      axiosClient
                        .post(`${apiRoute().user_org_meta}`, values)
                        .then((res) => {
                          setUpdatetIsLoading(false);
                          toast({
                            title: "Modification",
                            description: "Information mise a jour",
                            isClosable:true
                          });
                        })
                        .catch((err) => {
                          setUpdatetIsLoading(false);
                          if (
                            err.response.status === 403 ||
                            err.response.status === 401
                          ) {
                          }
                        });
                    }}
                    validationSchema={BusinessSchema}
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
                        <FormControl
                          isRequired
                          isInvalid={errors.org_name && touched.org_name}
                        >
                          <FormLabel>Nom</FormLabel>
                          <Input
                            placeholder=""
                            isInvalid={errors.org_name && touched.org_name}
                            value={values.org_name}
                            onChange={handleChange("org_name")}
                          />
                          {errors.org_name && touched.org_name && (
                            <FormErrorMessage>
                              {errors.org_name}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={errors.overview && touched.overview}
                        >
                          <FormLabel>Presentation</FormLabel>
                          <Textarea
                            placeholder=""
                            isInvalid={errors.overview && touched.overview}
                            value={values.overview}
                            onChange={handleChange("overview")}
                          />
                          {errors.overview && touched.overview && (
                            <FormErrorMessage>
                              {errors.overview}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={errors.history && touched.history}
                        >
                          <FormLabel>Histoire</FormLabel>
                          <Textarea
                            placeholder=""
                            isInvalid={errors.history && touched.history}
                            value={values.history}
                            onChange={handleChange("history")}
                          />
                          {errors.history && touched.history && (
                            <FormErrorMessage>
                              {errors.history}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={errors.culture && touched.culture}
                        >
                          <FormLabel>culture</FormLabel>
                          <Textarea
                            placeholder=""
                            isInvalid={errors.culture && touched.culture}
                            value={values.culture}
                            onChange={handleChange("culture")}
                          />
                          {errors.culture && touched.culture && (
                            <FormErrorMessage>
                              {errors.culture}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl mt={5}>
                          <Button
                            colorScheme="teal"
                            variant="solid"
                            onClick={handleSubmit}
                            isLoading={isUpdateLoading}
                          >
                            Valider
                          </Button>
                        </FormControl>
                      </Form>
                    )}
                  </Formik>
                </Box>
              )}
            </TabPanel>
          )}

          <TabPanel w={"full"} maxW={"lg"}>
            <Formik
              initialValues={{
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                occupation: user.occupation || "",
              }}
              onSubmit={(values, { resetForm }) => {
                setUpdatetIsLoading(true);
                axiosClient
                  .post(`${apiRoute().user_partial_update}`, values)
                  .then((res) => {
                    setUpdatetIsLoading(false);
                    dispatch(
                      setUser({
                        ...res.data.data,
                        token: user.token,
                      })
                    );
                    toast({
                      title: "Modification",
                      description: "Information mise a jour",
                      isClosable:true
                    });
                  })
                  .catch((err) => {
                    setUpdatetIsLoading(false);
                    if (
                      err.response.status === 403 ||
                      err.response.status === 401
                    ) {
                    }
                  });
              }}
              validationSchema={UpdateUserSchema}
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
                  {/* <FormControl id="userorg_name">
                    <FormLabel>Image</FormLabel>
                    <Stack direction={["column", "row"]} spacing={6}>
                      <Center>
                        <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                          <AvatarBadge
                            as={IconButton}
                            size="sm"
                            rounded="full"
                            top="-10px"
                            colorScheme="red"
                            aria-label="remove Image"
                            icon={<SmallCloseIcon />}
                          />
                        </Avatar>
                      </Center>
                      <Center w="full">
                        <Button w="full">Change Icon</Button>
                      </Center>
                    </Stack>
                  </FormControl> */}
                  <FormControl
                    isRequired
                    isInvalid={errors.first_name && touched.first_name}
                  >
                    <FormLabel>Nom</FormLabel>
                    <Input
                      placeholder=""
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      value={values.first_name}
                      onChange={handleChange("first_name")}
                    />
                    {errors.first_name && touched.first_name && (
                      <FormErrorMessage>{errors.first_name}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={errors.last_name && touched.last_name}
                  >
                    <FormLabel>Prenom</FormLabel>
                    <Input
                      placeholder=""
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      value={values.last_name}
                      onChange={handleChange("last_name")}
                    />
                    {errors.last_name && touched.first_name && (
                      <FormErrorMessage>{errors.last_name}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={errors.email && touched.email}
                  >
                    <FormLabel>Email </FormLabel>
                    <Input
                      placeholder="your-email@example.com"
                      _placeholder={{ color: "gray.500" }}
                      type="email"
                      value={values.email}
                      onChange={handleChange("email")}
                    />
                    {errors.email && touched.email && (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={errors.occupation && touched.occupation}
                  >
                    <FormLabel>Poste actuel</FormLabel>
                    <Input
                      placeholder=""
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      value={values.occupation}
                      onChange={handleChange("occupation")}
                    />
                    {errors.occupation && touched.occupation && (
                      <FormErrorMessage>{errors.occupation}</FormErrorMessage>
                    )}
                  </FormControl>
                  <Stack spacing={6} direction={["column", "row"]} mt={5}>
                    <Button
                      isLoading={isUpdateLoading}
                      onClick={handleSubmit}
                      bg={"teal.500"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Valider
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </TabPanel>
          <TabPanel w={"full"} maxW={"lg"}>
            <Formik
              initialValues={{
                old_password: "",
                password_confirmation: "",
                new_password: "",
              }}
              onSubmit={(values, { resetForm }) => {
                setUpdatetIsLoading(true);
                axiosClient
                  .post(`${apiRoute().change_password}`, values)
                  .then((res) => {
                    setUpdatetIsLoading(false);
                    resetForm();
                    toast({
                      title: "Modification",
                      description: "Information mise a jour",
                      isClosable:true
                    });
                  })
                  .catch((err) => {
                    setUpdatetIsLoading(false);
                    if (
                      err.response.status === 403 ||
                      err.response.status === 401
                    ) {
                    }
                  });
              }}
              validationSchema={SecuritySchema}
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
                  <FormControl
                    isRequired
                    isInvalid={errors.old_password && touched.old_password}
                  >
                    <FormLabel>Ancien Mot de Passe</FormLabel>
                    <Input
                      placeholder=""
                      _placeholder={{ color: "gray.500" }}
                      type="password"
                      value={values.old_password}
                      onChange={handleChange("old_password")}
                    />
                    {errors.old_password && touched.old_password && (
                      <FormErrorMessage>{errors.old_password}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={errors.new_password && touched.new_password}
                  >
                    <FormLabel>Nouveau Mot de Passe</FormLabel>
                    <Input
                      placeholder=""
                      _placeholder={{ color: "gray.500" }}
                      type="password"
                      value={values.new_password}
                      onChange={handleChange("new_password")}
                    />
                    {errors.new_password && touched.new_password && (
                      <FormErrorMessage>{errors.new_password}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    isRequired
                    isInvalid={
                      errors.password_confirmation &&
                      touched.password_confirmation
                    }
                  >
                    <FormLabel>Confirmer Mot de Passe</FormLabel>
                    <Input
                      placeholder=""
                      _placeholder={{ color: "gray.500" }}
                      type="password"
                      value={values.password_confirmation}
                      onChange={handleChange("password_confirmation")}
                    />
                    {errors.password_confirmation &&
                      touched.password_confirmation && (
                        <FormErrorMessage>
                          {errors.password_confirmation}
                        </FormErrorMessage>
                      )}
                  </FormControl>

                  <Stack spacing={6} direction={["column", "row"]} mt={5}>
                    <Button
                      isLoading={isUpdateLoading}
                      onClick={handleSubmit}
                      bg={"teal.500"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Valider
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
