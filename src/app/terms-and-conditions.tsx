import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import React from "react";

const TermsAndConditionsScreen: React.FC = () => {
    return (
        <ScreenProvider header={<CustomHeader title="Terms & Conditions" />}>
            <Text>
                TermsAndConditionsScreen
            </Text>
        </ScreenProvider>
    )
}
export default TermsAndConditionsScreen