import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Button,
  Flex,
  useColorModeValue,
  Text,
  Container,
  Box,
  FormControl,
  Input,
  FormLabel,
  VStack,
  useToast,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react';
import Select from 'react-select';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { SmallCloseIcon } from '@chakra-ui/icons';
import useSWR from 'swr';
import axiosClient, { fetcher } from '../api/api';
import { Formik, Form } from 'formik';
import apiRoute from '../api/route';
import { useEffect } from 'react';
import * as Yup from 'yup';
export default function SettingsPage() {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [defaultValue, setDefaultValue] = React.useState(null);
  const { data, error, isLoading, mutate } = useSWR(apiRoute().users, fetcher);
  const settings = useSWR(apiRoute().tpe_settings, fetcher);
  const [isLoadingOn, setIsLoadingOn] = useState(false);
  const validateSchema = Yup.object().shape({
    intermediary: Yup.number()
      .integer()
      .required('Ce champs est requis')
      .min(5),
    staff: Yup.number('Must be a number')
      .integer()
      .required('Ce champs est requis')
      .min(5),
    company: Yup.number().integer().required('Ce champs est requis').min(5),
    tpe: Yup.number().integer().required('Ce champs est requis').min(5),
    period: Yup.date().required('Ce champs est requis'),
  });
  const toast = useToast();
  useEffect(() => {
    if (!isLoading) {
      setDefaultValue(
        data.data.map(el => ({ value: el.id, label: `${el.email}` }))
      );
    }
  }, [isLoading]);

  return (
    <Box bg={'white'}>
      <Accordion allowMultiple width="100%" maxW="100%" rounded="lg">
        <AccordionItem>
          <AccordionButton
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
          >
            <Text fontSize="md"># ?</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Text color="gray.600"></Text>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
          >
            <Text fontSize="md">Parametre Tpe</Text>
            <ChevronDownIcon fontSize="24px" />
          </AccordionButton>
          <AccordionPanel pb={4} mx="auto" minHeight={'80vh'}>
            <Box justifyContent="center" alignItems={'center'} display={'flex'} minHeight={'50vh'}>
              {isLoading ? (
                <Spinner
                  alignSelf={'center'}
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              ) : (
                <Box width={'100%'}>
                  <Formik
                    initialValues={{
                      intermediary:
                        settings.data?.data?.intermediary.meta_value,
                      staff: settings.data?.data?.staff.meta_value,
                      company: settings.data?.data?.company.meta_value,
                      tpe: settings.data?.data?.tpe.meta_value,
                      period: settings.data?.data?.period.meta_value,
                    }}
                    onSubmit={(values, { resetForm }) => {
                      setIsLoadingOn(true);
                      axiosClient
                        .post(`${apiRoute().tpe_settings}`, values)
                        .then(res => {
                          setIsLoadingOn(false);
                          localStorage.setItem(
                            'intermediary',
                            values.intermediary
                          );
                          localStorage.setItem('staff', values.staff);
                          localStorage.setItem('period', values.period);
                          localStorage.setItem('tpe', values.tpe);
                          localStorage.setItem('company', values.company);
                          toast({
                            title: 'Parametre gestion de stock',
                            description: 'Operation effectué avec succès.',
                            status: 'success',
                            duration: 9000,
                            isClosable: true,
                            position: 'top ',
                          });
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
                        <FormControl
                          isRequired
                          isInvalid={
                            errors.intermediary && touched.intermediary
                          }
                        >
                          <FormLabel>Apporteur d'affaire</FormLabel>
                          <Input
                            placeholder="30000 "
                            isInvalid={
                              errors.intermediary && touched.intermediary
                            }
                            value={values.intermediary}
                            onChange={handleChange('intermediary')}
                          />
                          {errors.intermediary && touched.intermediary && (
                            <FormErrorMessage>
                              {errors.intermediary}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={errors.staff && touched.staff}
                        >
                          <FormLabel>Personnel ELG</FormLabel>
                          <Input
                            placeholder="40000"
                            isInvalid={errors.staff && touched.staff}
                            value={values.staff}
                            onChange={handleChange('staff')}
                          />
                          {errors.staff && touched.staff && (
                            <FormErrorMessage>{errors.staff}</FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={errors.company && touched.company}
                        >
                          <FormLabel>ELG</FormLabel>
                          <Input
                            placeholder="50000"
                            isInvalid={errors.company && touched.company}
                            value={values.company}
                            onChange={handleChange('company')}
                          />
                          {errors.company && touched.company && (
                            <FormErrorMessage>
                              {errors.company}
                            </FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={errors.tpe && touched.tpe}
                        >
                          <FormLabel>Tpe</FormLabel>
                          <Input
                            placeholder="200000"
                            isInvalid={errors.tpe && touched.tpe}
                            value={values.tpe}
                            onChange={handleChange('tpe')}
                          />
                          {errors.tpe && touched.tpe && (
                            <FormErrorMessage>{errors.tpe}</FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl
                          isRequired
                          isInvalid={errors.period && touched.period}
                        >
                          <FormLabel>Date de Validité</FormLabel>
                          <Input
                            isInvalid={errors.period && touched.period}
                            value={values.period}
                            onChange={handleChange('period')}
                            type="date"
                          />
                          {errors.period && touched.period && (
                            <FormErrorMessage>{errors.period}</FormErrorMessage>
                          )}
                        </FormControl>
                        <FormControl mt={5}>
                          <Button
                            colorScheme="teal"
                            variant="solid"
                            onClick={handleSubmit}
                            isLoading={isLoadingOn}
                          >
                            Valider
                          </Button>
                        </FormControl>
                      </Form>
                    )}
                  </Formik>
                </Box>
              )}
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
