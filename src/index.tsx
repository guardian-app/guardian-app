import 'react-native-gesture-handler';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    HomeScene,
    LoginScene,
    RegisterScene,
    ForgotPasswordScene,
    ChildDashboardScene,
    ParentDashboardScene,
    SplashScene
} from './scenes';
import { userValidateToken as _userValidateToken } from './actions';

const Stack = createStackNavigator();

const AppContainer = () => {
    const tokenValidated = useSelector((state: any) => state.userReducer.tokenValidated);
    const loggedIn = useSelector((state: any) => state.userReducer.loggedIn);
    const currentUser = useSelector((state: any) => state.userReducer.currentUser);

    const dispatch = useDispatch();
    const userValidateToken: any = () => dispatch(_userValidateToken());

    if (tokenValidated) {
        if (loggedIn && currentUser) {
            if (currentUser.role === "parent") {
                return (
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="ParentDashboardScene" headerMode="none">
                            <Stack.Screen name="ParentDashboardScene" component={ParentDashboardScene} />
                        </Stack.Navigator>
                    </NavigationContainer>
                );
            } else if (currentUser.role === "child") {
                return (
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="ChildDashboardScene" headerMode="none">
                            <Stack.Screen name="ChildDashboardScene" component={ChildDashboardScene} />
                        </Stack.Navigator>
                    </NavigationContainer>
                );
            } else {
                return (
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="SplashScene" headerMode="none">
                            <Stack.Screen name="SplashScene" component={SplashScene} />
                        </Stack.Navigator>
                    </NavigationContainer>
                );
            };
        } else {
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home" headerMode="none">
                        <Stack.Screen name="HomeScene" component={HomeScene} />
                        <Stack.Screen name="LoginScene" component={LoginScene} />
                        <Stack.Screen name="RegisterScene" component={RegisterScene} />
                        <Stack.Screen name="ForgotPasswordScene" component={ForgotPasswordScene} />
                    </Stack.Navigator>
                </NavigationContainer>
            );
        };
    } else {
        userValidateToken();
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScene" headerMode="none">
                    <Stack.Screen name="SplashScene" component={SplashScene} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    };
};

export default AppContainer;