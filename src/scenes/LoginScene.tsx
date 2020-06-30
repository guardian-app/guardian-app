import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Keyboard } from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
    Background,
    Logo,
    Header,
    Button,
    TextInput,
    BackButton
} from '../components';
import { theme } from '../styles';
import { emailValidator, passwordValidator } from '../utils/validators';
import { Navigation, User } from '../types';
import { userAuthenticate } from '../actions';

export interface OwnProps {
    navigation: Navigation;
}

interface StateProps {
    authenticateError: string,
    currentUser: User
}

interface DispatchProps {
    userAuthenticate: (user: User) => void
}

type Props = StateProps & DispatchProps & OwnProps

const LoginScene = ({ navigation, userAuthenticate, authenticateError, currentUser }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [errorVisibility, setErrorVisibility] = useState(false);

    useEffect(() => {
        if (currentUser.hasOwnProperty('user_id')) {
            console.warn("Redirect now!");
        };
    });

    const _onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        };

        Keyboard.dismiss();
        setErrorVisibility(true);
        userAuthenticate({ email_address: email.value, password: password.value });
        // navigation.navigate("DashboardScene");
    };

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate("HomeScene")} />

            <HideWithKeyboard>
                <Logo />
            </HideWithKeyboard>

            <Header>Welcome back!</Header>

            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScene")}>
                    <Text style={styles.label}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            {errorVisibility && authenticateError.length && <Text style={styles.errorText}>{authenticateError}</Text>}

            <Button mode="contained" onPress={_onLoginPressed}>
                Login
            </Button>

            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScene")}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    errorText: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 4,
        color: theme.colors.error,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

const mapDispatchToProps = (dispatch: any) => ({
    userAuthenticate: (user: User) => dispatch(userAuthenticate(user))
});

const mapStateToProps = (state: any) => ({
    authenticateError: state.userReducer.authenticateError,
    currentUser: state.userReducer.currentUser
});

export default compose(connect(mapStateToProps, mapDispatchToProps), React.memo)(LoginScene);