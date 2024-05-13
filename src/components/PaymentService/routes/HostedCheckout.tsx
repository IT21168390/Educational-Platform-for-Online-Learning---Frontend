import React, { useState } from "react";
import { Center, Heading, VStack } from "@chakra-ui/react";
import CartItem, { ItemData } from "./CartItem.js";
import CustomerDetails from "./CustomerDetails.js";
import { Products } from '../data.ts';

function HostedCheckout() {
    const [items] = useState<ItemData[]>(Products);

    return (
        <>
            <Center h={'100vh'} color='black'>
                <VStack spacing='24px'>
                    <Heading>Course Checkout</Heading>
                    {items.map(elem => (
                        <CartItem key={elem.id} data={elem} mode={'checkout'} />
                    ))}
                    
                    <CustomerDetails data={items} endpoint={"/checkout/hosted"} />
                </VStack>
            </Center>
        </>
    );
}

export default HostedCheckout;
