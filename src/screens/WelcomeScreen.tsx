import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {styled} from "nativewind";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {NavigationProp, useNavigation} from "@react-navigation/native";

type RootStackParamList = {
    Welcome: string | undefined;
    Home: string | undefined;
};

const WelcomeScreen = () => {
    const StyledSafeAreaView = styled(SafeAreaView)
    const StyledView = styled(View)
    const StyledText = styled(Text)
    const StyledImage = styled(Image)
    const StyledTouchableOpacity = styled(TouchableOpacity)

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <StyledSafeAreaView className="flex-1 flex justify-around bg-white">
            <StyledView className="space-y-2">
                <StyledText style={{ fontSize: wp(15) }} className="text-center font-bold text-gray-700">
                    Jarvis
                </StyledText>
                <StyledText style={{ fontSize: wp(5) }} className="text-center tracking-wider text-gray-700 font-semibold">
                    The future is here, powered by AI
                </StyledText>
            </StyledView>
            <StyledView className="flex-row justify-center">
                <StyledImage source={require("../../assets/logo.webp")} style={{ width: wp(70), height: hp(70) }} />
            </StyledView>
            <StyledTouchableOpacity onPress={() => navigation.navigate('Home')} className="bg-blue-400 rounded-2xl p-4 mx-10">
                <StyledText style={{ fontSize: wp(6) }} className="text-center font-bold text-white">
                    Get Started
                </StyledText>
            </StyledTouchableOpacity>
        </StyledSafeAreaView>
    );
}

export default WelcomeScreen;
