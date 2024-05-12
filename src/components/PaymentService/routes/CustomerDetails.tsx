// import React, { useState } from "react";
// import { Button, Input, VStack } from "@chakra-ui/react";

// interface ItemData {
//     name: string;
//     id: string;
// }

// interface CustomerDetailsProps {
//     data: ItemData[];
//     endpoint: string;
// }

// function CustomerDetails(props: CustomerDetailsProps) {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");

//     const onCustomerNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
//         setName(ev.target.value);
//     };

//     const onCustomerEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
//         setEmail(ev.target.value);
//     };
//     const key = "http://localhost:8090";

//     const initiatePayment = () => {
//         fetch(`${key}${props.endpoint}`, {
//             method: "POST",
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 items: props.data.map(elem => ({ name: elem.name, id: elem.id })),
//                 customerName: name,
//                 customerEmail: email,
//             })
//         })
//             .then(r => r.text())
//             .then(r => {
//                 window.location.href = r;
//             });
//     };

//     return (
//         <VStack spacing={3} width={'xl'}>
//             <Input variant='filled' placeholder='Customer Name' onChange={onCustomerNameChange} value={name} />
//             <Input variant='filled' placeholder='Customer Email' onChange={onCustomerEmailChange} value={email} />
//             <Button onClick={initiatePayment} colorScheme='green'>Checkout</Button>
//         </VStack>
//     );
// }

// export default CustomerDetails;


import React, { useState } from "react";
import { Button, Input, FormControl, FormGroup, FormLabel, Box } from "@mui/material";

interface ItemData {
    name: string;
    id: string;
}

interface CustomerDetailsProps {
    data: ItemData[];
    endpoint: string;
}

function CustomerDetails(props: CustomerDetailsProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const onCustomerNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setName(ev.target.value);
    };

    const onCustomerEmailChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.target.value);
    };
    const key = "http://localhost:8090";

    const initiatePayment = () => {
        fetch(`${key}${props.endpoint}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: props.data.map(elem => ({ name: elem.name, id: elem.id })),
                customerName: name,
                customerEmail: email,
            })
        })
            .then(r => r.text())
            .then(r => {
                window.location.href = r;
            });
    };

    return (
        <Box width="300px" padding="20px" borderRadius="10px" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)">
            <FormControl fullWidth>
                <FormLabel>Customer Name</FormLabel>
                <Input variant='filled' placeholder='Customer Name' onChange={onCustomerNameChange} value={name} />
            </FormControl>
            <FormControl fullWidth>
                <FormLabel>Customer Email</FormLabel>
                <Input variant='filled' placeholder='Customer Email' onChange={onCustomerEmailChange} value={email} />
            </FormControl>
            <Button variant="contained" onClick={initiatePayment} color="primary" style={{ marginTop: '20px' }}>Checkout</Button>
        </Box>
    );
}

export default CustomerDetails;
