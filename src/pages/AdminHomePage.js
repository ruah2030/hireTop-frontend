import React from 'react';
import { Container, Text, SimpleGrid, Box } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';
import axiosClient, { fetcher } from '../api/api';
import { Formik, Form } from 'formik';
import apiRoute from '../api/route';
function AdminHomePage() {
  const statData = [
    {
      id: 1,
      label: 'Total post reactions',
      score: '1,730',
    },
    {
      id: 2,
      label: 'Total post views',
      score: '31,573',
    },
    {
      id: 3,
      label: 'Listings created',
      score: '5',
    },
  ];
 
  return (
    
    <Container maxW="7xl" p={{ base: 5, md: 10 }}>
     
    </Container>
  );
}

export default AdminHomePage;
