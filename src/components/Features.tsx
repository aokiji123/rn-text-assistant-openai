import {Text, View, Image} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {styled} from "nativewind";

const featuresData = [
    {
        title: "ChatGPT",
        description: "ChatGPT can provide you with instant and knowledge responses, assist you with your creative ideas on a wide range of topics.",
        image: require('../../assets/chatgpt-icon.webp'),
        backgroundColor: "bg-emerald-200"
    },
    {
        title: "DALL-E",
        description: "DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.",
        image: require('../../assets/dall-e-icon.png'),
        backgroundColor: "bg-purple-200"
    },
    {
        title: "Smart AI",
        description: "A powerful voice assistant with the abilities of ChatGPT and DALL-E combined, providing you the best of both worlds.",
        image: require('../../assets/smart-ai-icon.png'),
        backgroundColor: "bg-cyan-200"
    }
]

const Features = () => {
    const StyledView = styled(View)
    const StyledText = styled(Text)
    const StyledImage = styled(Image)

    return (
        <StyledView style={{ height: hp(60) }} className="space-y-4">
            <StyledText style={{ fontSize: wp(6.5) }} className="font-semibold text-gray-700">
                Features
            </StyledText>
            {featuresData.map((feature, index) => (
                <StyledView className={`${feature.backgroundColor} p-4 rounded-xl space-y-2`} key={index}>
                    <StyledView className="flex-row items-center space-x-1">
                        <StyledImage source={feature.image} style={{ width: wp(6), height: wp(6) }} />
                        <StyledText style={{ fontSize: wp(4.8) }} className="text-gray-700 font-semibold">{feature.title}</StyledText>
                    </StyledView>
                    <StyledText className="text-gray-700">
                        {feature.description}
                    </StyledText>
                </StyledView>
            ))}
        </StyledView>
    )
}

export default Features;
