import React from 'react';

import { Box, Heading, Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, blue.400, blue.600)"
        backgroundClip="text">
        404
      </Heading>                                             
      <Text fontSize="18px" mt={3} mb={2}>
        Page non trouvée
      </Text>
      <Text color={'gray.500'} mb={6}>
        La page que vous chechez n'esiste pas
      </Text>

      <Button
        colorScheme="blue"
        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
        color="white"
        variant="solid"  
        onClick={()=>{
          navigate('/');
        }}
        >
        Allez à l'acceuil
      </Button>
    </Box>
  )
}
