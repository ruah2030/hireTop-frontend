"use client";

import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  Input,
  InputGroup,
  InputRightElement,
  Select
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function OfferPage() {
  return (
    <Container maxW={"7xl"} maxH={"100vh"}>
      {/* <SearchField /> */}
      <SearchOptions/>
      <OfferItems />
    </Container>
  );
}

const SearchField = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Faites quelque chose avec le terme de recherche, comme passer à un gestionnaire parent
    onSearch(searchTerm);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box  p="4">
      <InputGroup>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          variant="filled"
          //   color="blue.800" // Changer la couleur du texte à bleu (modifier 800 selon votre besoin)
          //   _placeholder={{ color: 'blue.500' }} // Changer la couleur du placeholder à bleu (modifier 500 selon votre besoin)
        />
        <InputRightElement>
          <Button onClick={handleSearch} variant="ghost">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

function OfferItems() {
  return (
    <Stack p="4" boxShadow="lg" m="4" borderRadius="sm">
      <Stack direction="row" alignItems="center">
        <Text fontWeight="semibold">Your Privacy</Text>
        {/* <FcLock /> */}
      </Stack>

      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Text fontSize={{ base: "sm" }} textAlign={"left"} maxW={"4xl"}>
          We use cookies and similar technologies to help personalise content,
          tailor and measure ads, and provide a better experience. By clicking
          OK or turning an option on in Cookie Preferences, you agree to this,
          as outlined in our Cookie Policy. To change preferences or withdraw
          consent, please update your Cookie Preferences.
        </Text>
        <Stack direction={{ base: "column", md: "row" }}>
          <Button variant="outline" colorScheme="blue">
            Cookie Preferences
          </Button>
          <Button colorScheme="blue">OK</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

const SearchOptions = ({ onSearch }) => {
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
  
    const handleSearch = () => {
      // Faites quelque chose avec les options de recherche, comme passer à un gestionnaire parent
      onSearch(option1, option2, option3);
    };
  
    return (
      <Flex align="center" justify="center" p={4}>
        <Select
          placeholder="Option 1"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          mr={2}
          variant="filled"
        >
          <option value="option1_value1">Option 1 - Value 1</option>
          <option value="option1_value2">Option 1 - Value 2</option>
          <option value="option1_value3">Option 1 - Value 3</option>
        </Select>
        <Select
          placeholder="Option 2"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          mr={2}
          variant="filled"
      
        >
          <option value="option2_value1">Option 2 - Value 1</option>
          <option value="option2_value2">Option 2 - Value 2</option>
          <option value="option2_value3">Option 2 - Value 3</option>
        </Select>
      </Flex>
    );
  };
  