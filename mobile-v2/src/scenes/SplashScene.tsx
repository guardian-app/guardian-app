import React, { memo } from 'react';
import {
    Background,
    Logo,
    Header,
    Paragraph
} from '../components';
import { ActivityIndicator } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { colors } from '../styles';

const SplashScene = () => {
    return (
        <Background>
            <Logo />
            <Header>Guardian</Header>

            <Paragraph>
                Child Safety Solution
            </Paragraph>

            <View style={{ marginTop: 64 }}>
                <ActivityIndicator animating={true} size="large" color={colors.primary} />
            </View>

            <StatusBar style="light" />
        </Background>
    );
};

export default memo(SplashScene);