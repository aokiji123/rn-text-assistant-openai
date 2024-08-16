import {useEffect, useState} from "react";
import {Features} from "../components";
import {SafeAreaView, Text, View, Image, ScrollView, TouchableOpacity} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {styled} from "nativewind";
import Voice, {SpeechErrorEvent, SpeechResultsEvent} from "@react-native-voice/voice";

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
    const [recording, setRecording] = useState(false)
    const [speaking, setSpeaking] = useState(true)

    const StyledSafeAreaView = styled(SafeAreaView)
    const StyledView = styled(View)
    const StyledText = styled(Text)
    const StyledImage = styled(Image)
    const StyledScrollView = styled(ScrollView)
    const StyledTouchableOpacity = styled(TouchableOpacity)

    const clear = () => {
        setMessages([])
    }

    const stopSpeaking = () => {
        setSpeaking(false)
    }

    const speechStartHandler = () => {
        console.log('Speech start handler')
    }

    const speechEndHandler = () => {
        console.log('Speech end handler')
    }

    const speechResultsHandler = (event: SpeechResultsEvent) => {
        console.log('Speech results handler', event)
    }

    const speechErrorHandler = (event: SpeechErrorEvent) => {
        console.log('Speech error handler', event)
    }

    useEffect(() => {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        Voice.onSpeechError = speechErrorHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

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
                            <StyledText style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">
                                Assistant
                            </StyledText>
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
                <StyledView className="flex justify-center items-center">
                    {
                        recording ? (
                            <StyledTouchableOpacity className="bg-red-400 p-2 rounded-full transition">
                                <StyledView className="bg-red-700 p-2 rounded-full transition">
                                    <StyledImage
                                        className="rounded-full"
                                        source={require('../../assets/recording-icon.png')}
                                        style={{ width: wp(10), height: wp(10) }}
                                    />
                                </StyledView>
                            </StyledTouchableOpacity>
                        ) : (
                            <StyledTouchableOpacity className="bg-emerald-400 p-2 rounded-full transition">
                                <StyledView className="bg-emerald-700 p-2 rounded-full transition">
                                    <StyledImage
                                        className="rounded-full"
                                        source={require('../../assets/recording-icon.png')}
                                        style={{ width: wp(10), height: wp(10) }}
                                    />
                                </StyledView>
                            </StyledTouchableOpacity>
                        )
                    }

                    {
                         speaking && (
                            <StyledTouchableOpacity onPress={stopSpeaking} className="bg-red-400 rounded-3xl p-2 absolute left-10">
                                <StyledText className="text-white font-semibold">
                                    Stop
                                </StyledText>
                            </StyledTouchableOpacity>
                        )
                    }

                    {
                        messages.length > 0 && (
                            <StyledTouchableOpacity onPress={clear} className="bg-neutral-400 rounded-3xl p-2 absolute right-10">
                                <StyledText className="text-white font-semibold">
                                    Clear
                                </StyledText>
                            </StyledTouchableOpacity>
                        )
                    }
                </StyledView>
            </StyledSafeAreaView>
        </StyledView>
    );
}

export default HomeScreen;
