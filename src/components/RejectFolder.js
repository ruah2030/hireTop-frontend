import React, { PureComponent,useState } from 'react';
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
  Textarea,
} from '@chakra-ui/react';
import axiosClient, { fetcher } from '../api/api';
import apiRoute from '../api/route';
import { mutate } from 'swr';
import { FOLDER_REJECTED, FOLDER_STARTED } from '../constant/app_constant';
function RejectFolder({ children, onAction,user_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = React.useRef();
  let [value, setValue] = React.useState('');
  let handleInputChange = e => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleReject = ()=>{
    if (value==="") {
        alert("Remplir motif de rejet")
        return 
    }
    setIsLoading(true)
    axiosClient.post(apiRoute().reject_folder, {
        user_id:user_id,
        object: value
    }).then((res) => {
        setIsLoading(false)
        mutate(`${apiRoute().pendind_folder}/${FOLDER_STARTED}`)
        mutate(`${apiRoute().pendind_folder}/${FOLDER_REJECTED}`)
    })
  }
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
          <AlertDialogHeader>Motifs de Rejet</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Textarea
              value={value}
              onChange={handleInputChange}
              placeholder=""
              size="sm"
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button  colorScheme="red" onClick={handleReject} isLoading={isLoading}>
              Valider
            </Button>
            <Button ml={3} ref={cancelRef} onClick={onClose}>
              Quitter
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default RejectFolder;
