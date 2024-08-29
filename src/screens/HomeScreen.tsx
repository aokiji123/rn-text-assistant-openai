import {useState} from "react";
import {Features} from "../components";
import {SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity, TextInput} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {styled} from "nativewind";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

enum Role {
    USER = 'user',
    ASSISTANT = 'assistant'
}

const messagesData = [
    {
        role: Role.USER,
        content: 'How are you?'
    },
    {
        role: Role.ASSISTANT,
        content: 'I am fine. How may I help you today?'
    },
    {
        role: Role.USER,
        content: 'Create an image of a dog playing with cat.'
    },
    {
        role: Role.ASSISTANT,
        content: 'https://www.shutterstock.com/image-photo/heartwarming-moment-between-dog-cat-600nw-2432338827.jpg'
    }
]

const HomeScreen = () => {
    const [messages, setMessages] = useState(messagesData)
    const [value, setValue] = useState('')

    const StyledSafeAreaView = styled(SafeAreaView)
    const StyledView = styled(View)
    const StyledText = styled(Text)
    const StyledImage = styled(Image)
    const StyledScrollView = styled(ScrollView)
    const StyledTouchableOpacity = styled(TouchableOpacity)
    const StyledTextInput = styled(TextInput)

    const clear = () => {
        setMessages([])
    }

    return (
        <StyledView className="flex-1 bg-white">
            <StyledSafeAreaView className="flex-1 flex mx-5">
                <StyledView className="flex-row justify-center">
                    <StyledImage source={require("../../assets/logo.webp")} style={{ width: wp(20), height: hp(20) }} />
                </StyledView>

                {/*  features and messages  */}
                {
                    messages.length > 0 ? (
                        <StyledView className="space-y-2 flex-1">
                            <StyledView className="flex flex-row items-center justify-between">
                                <StyledText style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">
                                    Assistant
                                </StyledText>
                                <StyledTouchableOpacity>
                                    <StyledText style={{ fontSize: wp(4) }} className="flex-1 ml-1" onPress={clear}>
                                        <FontAwesomeIcon icon={faXmark} size={30} />
                                    </StyledText>
                                </StyledTouchableOpacity>
                            </StyledView>
                            <StyledView style={{ height: hp(55) }} className="bg-neutral-200 rounded-3xl p-4">
                                <StyledScrollView
                                    bounces={false}
                                    className="space-y-4"
                                    showsVerticalScrollIndicator={false}
                                >
                                    {messages.map((message, index) => {
                                        if (message.role === Role.ASSISTANT) {
                                            if (message.content.includes('https')) {
                                                return (
                                                    <StyledView key={index} className="flex-row justify-start">
                                                        <StyledView className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                                                            <StyledImage
                                                                source={{ uri: message.content }}
                                                                className="rounded-2xl"
                                                                resizeMode="contain"
                                                                style={{ width: wp(60), height: wp(60) }}
                                                            />
                                                        </StyledView>
                                                    </StyledView>
                                                )
                                            } else {
                                                return (
                                                    <StyledView
                                                        key={index}
                                                        style={{ width: wp(70) }}
                                                        className="bg-emerald-100 rounded-xl rounded-tl-none p-2"
                                                    >
                                                        <StyledText>
                                                            {message.content}
                                                        </StyledText>
                                                    </StyledView>
                                                )
                                            }
                                        } else {
                                            return (
                                                <StyledView key={index} className="flex-row justify-end">
                                                    <StyledView style={{ width: wp(70) }} className="bg-white rounded-xl rounded-tr-none p-2">
                                                        <StyledText>
                                                            {message.content}
                                                        </StyledText>
                                                    </StyledView>
                                                </StyledView>
                                            )
                                        }
                                    })}
                                </StyledScrollView>
                            </StyledView>
                        </StyledView>
                    ) : (
                        <Features />
                    )
                }
                <StyledView className="flex flex-row justify-center items-center w-full my-4 p-5">
                    <StyledTextInput
                        value={value}
                        className="h-14 w-[90%] border border-gray-300 rounded-lg px-4"
                        placeholder="Type a message..."
                        onChange={(e) => setValue(e.nativeEvent.text)}
                    />
                    <StyledTouchableOpacity className="bg-blue-400 rounded-lg p-4 ml-2">
                        <FontAwesomeIcon icon={faPaperPlane} size={20} color={"white"} />
                    </StyledTouchableOpacity>
                </StyledView>
            </StyledSafeAreaView>
        </StyledView>
    );
}

export default HomeScreen;
