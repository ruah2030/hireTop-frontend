import { Button, ButtonGroup, Text, HStack, VStack } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = page => {
    onPageChange(page);
  };

  return (
    <HStack spacing="2" justify="center" mt="4">
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Précedent
      </Button>
      <HStack spacing="2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            colorScheme={currentPage === index + 1 ? 'teal' : 'gray'}
          >
            {index + 1}
          </Button>
        ))}
      </HStack>
      <Button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Suivant
      </Button>
    </HStack>
  );
};

export default Pagination;
