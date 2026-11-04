import { CustomHeader, ScreenProvider, Text } from "@/components/Reusable";
import React from "react";

const ReferAndEarnScreen: React.FC = () => {
    return (
        <ScreenProvider header={<CustomHeader title="Refer and Earn" />}>
            <Text>
                ReferAndEarnScreen
            </Text>
        </ScreenProvider>
    )
}
export default ReferAndEarnScreen