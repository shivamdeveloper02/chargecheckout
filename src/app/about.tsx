import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import React from "react";

const AboutScreen: React.FC = () => {
    return (
        <ScreenProvider header={<CustomHeader title="About" />}>
            <Text>
                AboutScreen
            </Text>
        </ScreenProvider>
    )
}
export default AboutScreen