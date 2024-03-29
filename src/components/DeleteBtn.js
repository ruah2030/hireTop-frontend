import React, { PureComponent } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
function DeleteBtn({ children, onAction}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Alert</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Etes vous sûre de vouloir effectuer cette action ?.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Non
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                onAction(setIsLoading);
              }}
              isLoading={isLoading}
            >
              Oui
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteBtn;
