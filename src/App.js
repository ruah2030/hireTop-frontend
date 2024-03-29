import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import AppRouter from './routes/router';

function App() {
  return (
    <ChakraProvider theme={theme}>
       <AppRouter/>
    </ChakraProvider>
  );
}

export default App;
