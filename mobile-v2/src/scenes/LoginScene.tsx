import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Keyboard
} from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import {
    Background,
    Logo,
    Header,
    Button,
    TextInput,
    BackButton
} from '../components';
import { emailValidator, passwordValidator } from '../utils/validators';
import { User, Navigation } from '../types';
import { userAuthenticate } from '../actions';
import { theme } from '../styles';

export interface OwnProps {
    navigation: Navigation;
};

interface StateProps {
    authenticateError: string,
    createMessage: string,
    resetMessage: string,
    currentUser: User
};

interface DispatchProps {
    userAuthenticate: (user: User) => void
};

type Props = StateProps & DispatchProps & OwnProps;

const LoginScene = ({ navigation, userAuthenticate, authenticateError, currentUser, createMessage, resetMessage }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [submitted, setSubmitted] = useState(false);
    const [visible, setVisible] = React.useState(!!createMessage || !!resetMessage);

    useEffect(() => {
        if (!!createMessage || !!resetMessage) setVisible(true);
    }, [submitted, currentUser, createMessage, resetMessage]);

    const _onLoginPressed = () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        };

        Keyboard.dismiss();
        setSubmitted(true);
        userAuthenticate({ email_address: email.value, password: password.value });
    };

    return (
        <View style={styles.container}>
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

                {(submitted && authenticateError.length) ? <Text style={styles.errorText}>{authenticateError}</Text> : null}

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

            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                action={{
                    label: 'OK',
                    onPress: () => setVisible(false)
                }}>
                {resetMessage || createMessage}
            </Snackbar>
        </View>
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
    container: {
        flex: 1,
        justifyContent: 'space-between',
    }
});

const mapDispatchToProps = (dispatch: any) => ({
    userAuthenticate: (user: User) => dispatch(userAuthenticate(user))
});

const mapStateToProps = (state: any) => ({
    authenticateError: state.userReducer.authenticateError,
    createMessage: state.userReducer.createMessage,
    resetMessage: state.userReducer.resetMessage,
    currentUser: state.userReducer.currentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScene);