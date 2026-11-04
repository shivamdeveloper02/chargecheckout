import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import React from "react";

const PrivacyPolicyScreen: React.FC = () => {
    return (
        <ScreenProvider header={<CustomHeader title="Privacy Policy" />}>
            <Text>
                PrivacyPolicyScreen
            </Text>
        </ScreenProvider>
    )
}
export default PrivacyPolicyScreen