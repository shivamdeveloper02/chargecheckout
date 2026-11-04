import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import React from "react";

const FAQScreen: React.FC = () => {
    return (
        <ScreenProvider header={<CustomHeader title="FAQ" />}>
            <Text>
                FAQScreen
            </Text>
        </ScreenProvider>
    )
}
export default FAQScreen