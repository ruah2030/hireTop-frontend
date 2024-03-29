import React, { useEffect, useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link as ChakraLink,
    FormErrorMessage,
    Alert,
    AlertDescription,
    AlertTitle,
    AlertIcon
} from '@chakra-ui/react'
import {
    Outlet,
    Link as ReactRouterLink,
    useNavigate
} from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axiosClient from '../api/api';
import apiRoute from '../api/route';
import { setUser } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
const Login = () => {;
    const [isLoading, setIsLoading] = useState(false);
    const [invalide, setInvalide] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const validateSchema = Yup.object().shape({
        email: Yup.string().email("Veillez entrer un email valide").required("Ce champs est requis"),
        password: Yup.string()
            .required("Ce champs est requis")
            .min(8, "Ce champs doit contenir au minimum 8 caratère")
        //   .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
        //   .matches(/\d/, "Password should contain at least one number")
        //   .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character")
    });
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Se Connecter
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        {/* to enjoy all of our cool features ✌️ */}
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    w={'sm'}>
                    <Formik initialValues={{
                        email: "",
                        password: "",
                    }}
                        validationSchema={validateSchema}
                        onSubmit={(values, actions) => {
                            setIsLoading(true);
                            axiosClient.post(apiRoute().login, values).then((res) => {
                                setIsLoading(false);
                                res.data.data.user['token'] = res.data.data.user.token
                                const user = {
                                    ...res.data.data.user,
                                    token: res.data.data.token
                                }
                                dispatch(setUser(user));
                                navigate('/')
                            }).catch((err) => {
                             
                                if (err.response.status == 403 || err.response.status == 401) {
                                    setInvalide(true)
                                    setIsLoading(false);
                                }
                            })
                        }}
                    >
                        {({ handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            touched,
                            errors,
                            setFieldValue }) => (
                            <Form>
                                {invalide && (<Alert size="md" status="error" mb={4}>
                                    <AlertIcon />
                                    <AlertDescription>
                                        Invalide Crefentials
                                    </AlertDescription>
                                </Alert>)}
                                <Stack spacing={4} >
                                    <FormControl id="email" isRequired isInvalid={errors.email && touched.email}>
                                        <FormLabel>Email address</FormLabel>
                                        <Input type="email" onChange={handleChange('email')} value={values.email} />
                                        {errors.email && touched.email && (
                                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <FormControl id="password" isRequired isInvalid={errors.password && touched.password}>
                                        <FormLabel>Password</FormLabel>
                                        <Input type="password" onChange={handleChange('password')} value={values.password} />
                                        {errors.password && touched.password && (
                                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                                        )}
                                    </FormControl>
                                    <Stack spacing={10}>
                                        <Stack
                                            direction={{ base: 'column', sm: 'row' }}
                                            align={'start'}
                                            justify={'space-between'}>
                                            <Checkbox>Remember me</Checkbox>
                                            <ChakraLink color={'blue.400'} as={ReactRouterLink} to={'/forgot-password'} >
                                                <Text color={'blue.400'}>Forgot password?</Text>
                                            </ChakraLink>

                                        </Stack>
                                        <Button
                                            isLoading={isLoading}
                                            onClick={handleSubmit}
                                            loadingText="Submitting"
                                            bg={'blue.400'}
                                            color={'white'}
                                            _hover={{
                                                bg: 'blue.500',
                                            }}>
                                            Sign in
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                    <Stack pt={6}>
                        <Text align={'center'}>
                            You dn't have any account? <ChakraLink color={'blue.400'} as={ReactRouterLink} to={'/register'}>Register</ChakraLink>
                        </Text>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}

export default Login;
