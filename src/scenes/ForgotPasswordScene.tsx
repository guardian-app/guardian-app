import React, { useState, useEffect } from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { Snackbar } from 'react-native-paper';
import {
    emailValidator,
    resetCodeValidator,
    passwordValidator,
    confirmPasswordValidator
} from '../utils/validators';
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
import { connect } from 'react-redux';
import {
    userResetPassword,
    userResetPasswordRequest
} from '../actions';

export interface OwnProps {
    navigation: Navigation;
};

interface StateProps {
    resetRequestMessage: string
    resetMessage: string
    resetRequestError: string,
    resetError: string,
};

interface DispatchProps {
    userResetPasswordRequest: (emailAddress: string) => void,
    userResetPassword: (emailAddress: string, resetCode: string, password: string) => void
};

type Props = StateProps & DispatchProps & OwnProps;

const ForgotPasswordScene = ({ navigation, userResetPassword, userResetPasswordRequest, resetRequestMessage, resetMessage, resetRequestError, resetError }: Props) => {
    const [email, setEmail] = useState({ value: '', error: '' });
    const [resetCode, setResetCode] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
    const [requested, setRequested] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        if (requested && !resetRequestError.length && !submitted) setVisible(true);
        if (submitted && resetMessage.length) navigation.navigate("LoginScene");
    }, [requested, submitted, resetRequestError, resetError, resetRequestMessage, resetMessage]);

    const _onSendPressed = () => {
        const emailError = emailValidator(email.value);
        const resetCodeError = resetCodeValidator(resetCode.value);
        const passwordError = passwordValidator(password.value);
        const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value);

        if (!requested) {
            if (emailError) {
                setEmail({ ...email, error: emailError });
                return;
            };

            setRequested(true);
            userResetPasswordRequest(email.value);
        } else {
            if (emailError || resetCodeError || passwordError || confirmPasswordError) {
                setEmail({ ...email, error: emailError });
                setResetCode({ ...resetCode, error: resetCodeError });
                setPassword({ ...password, error: passwordError });
                setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
                return;
            };

            setSubmitted(true);
            userResetPassword(email.value, resetCode.value, password.value);
        };
    };

    return (
        <View style={styles.container}>
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

                {!requested
                    ? null
                    : <ScrollView style={{ width: '100%' }}>
                        {requested &&
                            <View>
                                <TextInput
                                    label="Reset code"
                                    returnKeyType="done"
                                    value={resetCode.value}
                                    onChangeText={text => setResetCode({ value: text, error: '' })}
                                    error={!!resetCode.error}
                                    errorText={resetCode.error}
                                    autoCapitalize="none"
                                    textContentType="none"
                                />

                                <TextInput
                                    label="Password"
                                    returnKeyType="next"
                                    value={password.value}
                                    onChangeText={text => setPassword({ value: text, error: '' })}
                                    error={!!password.error}
                                    errorText={password.error}
                                    secureTextEntry
                                />

                                <TextInput
                                    label="Confirm password"
                                    returnKeyType="next"
                                    value={confirmPassword.value}
                                    onChangeText={text => setConfirmPassword({ value: text, error: '' })}
                                    error={!!confirmPassword.error}
                                    errorText={confirmPassword.error}
                                    secureTextEntry
                                />
                            </View>
                        }
                    </ScrollView>
                }

                {(requested && !submitted && resetRequestError.length) ? <Text style={styles.errorText}>{resetRequestError}</Text> : null}
                {(submitted && requested && resetError.length) ? <Text style={styles.errorText}>{resetError}</Text> : null}

                <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
                    {requested ? "Reset password" : "Send Reset Instructions"}
                </Button>

                <TouchableOpacity
                    style={styles.back}
                    onPress={() => navigation.navigate("LoginScene")}
                >
                    <Text style={styles.label}>← Back to login</Text>
                </TouchableOpacity>
            </Background>
            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                action={{
                    label: 'OK',
                    onPress: () => setVisible(false)
                }}>
                {resetRequestMessage}
            </Snackbar>
        </View>
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
    errorText: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 4,
        color: theme.colors.error,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollContainer: {
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapDispatchToProps = (dispatch: any) => ({
    userResetPasswordRequest: (emailAddress: string) => dispatch(userResetPasswordRequest(emailAddress)),
    userResetPassword: (emailAddress: string, resetCode: string, password: string) => dispatch(userResetPassword(emailAddress, resetCode, password))
});

const mapStateToProps = (state: any) => ({
    resetRequestError: state.userReducer.resetRequestError,
    resetError: state.userReducer.resetError,
    resetRequestMessage: state.userReducer.resetRequestMessage,
    resetMessage: state.userReducer.resetMessage
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScene);