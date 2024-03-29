import React from 'react'
import {
  
    FormControl,
    Input,
    FormLabel
} from '@chakra-ui/react'

export default function PermissionForm() {
    const initialRef = React.useRef(null)

    return (
        <>
            <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input ref={initialRef} placeholder='Ajouter la route' />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Route</FormLabel>
                <Input placeholder='' />
            </FormControl>
        </>
    )
}
