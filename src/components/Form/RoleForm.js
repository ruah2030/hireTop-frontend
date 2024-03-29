import React from 'react'
import Select  from 'react-select';
import {

    FormControl,
    Input,
    FormLabel
} from '@chakra-ui/react'

export default function RoleForm() {
    const initialRef = React.useRef(null)
    const [selectedOption, setSelectedOption] = React.useState(null);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'strawberry1', label: 'Strawberry2' },
        { value: 'vanilla3', label: 'Vanilla4' },
        { value: 'vanillaf', label: 'Vaniflla' },
        { value: 'vaniflla', label: 'Vanilela' },
    ];
    return (
        <>
            <FormControl>
                <FormLabel>Nom</FormLabel>
                <Input ref={initialRef} placeholder='Ajouter la route' />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>permissions</FormLabel>
                <Select
                    isMulti
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                />
            </FormControl>
        </>
    )
}
