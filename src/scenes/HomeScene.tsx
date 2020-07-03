import React from 'react';
import {
    Background,
    Logo,
    Header,
    Paragraph,
    Button
} from '../components';
import { Navigation } from '../types';

type Props = {
    navigation: Navigation;
};

const LoginScene = ({ navigation }: Props) => {
    return (
        <Background>
            <Logo />
            <Header>Guardian</Header>

            <Paragraph>
                Child Safety Solution
            </Paragraph>
            <Button mode="contained" onPress={() => navigation.navigate("LoginScene")}>
                Login
            </Button>
            <Button mode="outlined" onPress={() => navigation.navigate("RegisterScene")} >
                Sign Up
            </Button>
        </Background>
    );
};

export default LoginScene;