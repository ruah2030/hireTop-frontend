import React from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,

} from '@chakra-ui/react'
export default function TpModal({ children ,title,entity,body}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {body}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fermer
            </Button>
            <Button variant='ghost'>Valider</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
