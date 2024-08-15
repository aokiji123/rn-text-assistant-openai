import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import {styled} from "nativewind";

export default function App() {
    const StyledView = styled(View)
    const StyledText = styled(Text)

    return (
        <StyledView className="bg-black flex-1">
            <StyledText>Open up App.tsx to start working on your app!</StyledText>
            <StatusBar style="auto" />
        </StyledView>
    );
}
