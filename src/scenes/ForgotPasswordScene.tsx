import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { emailValidator } from '../utils/validators';
import {
    Button,
    TextInput,
    Header,
    Logo,
    BackButton,
    Background
} from '../components';
import { theme } from '../styles';
import { Navigation } from '../types';

type Props = {
    navigation: Navigation;
};

const ForgotPasswordScene = ({ navigation }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });

    const _onSendPressed = () => {
        const emailError = emailValidator(email.value);

        if (emailError) {
            setEmail({ ...email, error: emailError });
            return;
        }

        navigation.navigate("LoginScene");
    };

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate("LoginScene")} />

            <HideWithKeyboard>
                <Logo />
            </HideWithKeyboard>

            <Header>Restore Password</Header>

            <TextInput
                label="E-mail address"
                returnKeyType="done"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
                Send Reset Instructions
            </Button>

            <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.navigate("LoginScene")}
            >
                <Text style={styles.label}>← Back to login</Text>
            </TouchableOpacity>
        </Background>
    );
};

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
});

export default memo(ForgotPasswordScene);