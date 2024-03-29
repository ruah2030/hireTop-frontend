import React from 'react'
import {
  
    FormControl,
    Input,
    FormLabel
} from '@chakra-ui/react'

export default function RouteForm() {
    const initialRef = React.useRef(null)

    return (
        <>
            <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input ref={initialRef} placeholder='Ajouter utilisateur' />
            </FormControl>
        </>
    )
}
