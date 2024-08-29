import * as React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import { HomeScreen, WelcomeScreen } from "./src/screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import { apiCall, ApiResponse } from "./src/api/openai";

type RootStackParamList = {
    Home: undefined;
    Welcome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): React.ReactElement {
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const makeApiCall = async () => {
            try {
                setIsLoading(true);
                const result = await apiCall('Generate image of a cat');
                setApiResponse(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };
        makeApiCall();
    }, []);

    const renderApiResponse = (): React.ReactElement | null => {
        if (isLoading) {
            return <Text>Loading...</Text>;
        }
        if (error) {
            return <Text>Error: {error}</Text>;
        }
        if (apiResponse) {
            if (apiResponse.type === 'image') {
                return <Image source={{ uri: apiResponse.data }} style={styles.image} />;
            } else {
                return <Text>{apiResponse.data.content}</Text>;
            }
        }
        return null;
    };

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Welcome">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
            </Stack.Navigator>
            <View style={styles.apiResponseContainer}>
                {renderApiResponse()}
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    apiResponseContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
});
