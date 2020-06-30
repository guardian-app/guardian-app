import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    HomeScene,
    LoginScene,
    RegisterScene,
    ForgotPasswordScene,
    DashboardScene
} from './scenes';

const Stack = createStackNavigator();
const AppContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" headerMode="none">
                <Stack.Screen name="HomeScene" component={HomeScene} />
                <Stack.Screen name="LoginScene" component={LoginScene} />
                <Stack.Screen name="RegisterScene" component={RegisterScene} />
                <Stack.Screen name="ForgotPasswordScene" component={ForgotPasswordScene} />
                <Stack.Screen name="DashboardScene" component={DashboardScene} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppContainer;