import React from "react"; // Added React import

import { Button, Center, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const navigateToHostedCheckout = () => {
        navigate("/hosted-checkout");
    };

 

    return (
        <Center h={'100vh'} color='black'>
            <VStack spacing='24px'>
                <Heading>Stripe Payments With React & Java</Heading>
            
                <Button
                    colorScheme={'blue'}
                    onClick={navigateToHostedCheckout}>
                    Hosted Checkout
                </Button>
                {/* <Button
                    colorScheme={'yellow'}
                    onClick={navigateToNewSubscription}>
                    New Subscription
                </Button>
                <Button
                    colorScheme={'purple'}
                    onClick={navigateToCancelSubscription}>
                    Cancel Subscription
                </Button>
                <Button
                    colorScheme={'facebook'}
                    onClick={navigateToSubscriptionWithTrial}>
                    Subscription With Trial
                </Button>
                <Button
                    colorScheme={'pink'}
                    onClick={navigateToViewInvoices}>
                    View Invoices
                </Button> */}
            </VStack>
        </Center>
    );
}

export default Home;
