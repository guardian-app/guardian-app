import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { connect } from 'react-redux';
import {
    Background,
    Logo,
    Header,
    Button,
    TextInput,
    BackButton
} from '../components'
import { theme } from '../styles';
import { Navigation } from '../types';
import {
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
    nameValidator,
    addressValidator,
    phoneValidator
} from '../utils/validators';
import { compose } from 'redux';
import { userCreate } from '../actions';
import { User } from '../types';

export interface OwnProps {
    navigation: Navigation;
}

interface DispatchProps {
    userCreate: (user: User) => void
}

type Props = DispatchProps & OwnProps

const RegisterScene = ({ navigation, userCreate }: Props) => {
    const [emailAddress, setEmailAddress] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
    const [firstName, setFirstName] = useState({ value: '', error: '' });
    const [lastName, setLastName] = useState({ value: '', error: '' })
    const [address, setAddress] = useState({ value: '', error: '' });
    const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });

    const _onSignUpPressed = () => {
        const emailAddressError = emailValidator(emailAddress.value);
        const passwordError = passwordValidator(password.value);
        const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value);
        const firstNameError = nameValidator(firstName.value, 'First');
        const lastNameError = nameValidator(lastName.value, 'Last');
        const addressError = addressValidator(address.value);
        const phoneNumberError = phoneValidator(phoneNumber.value);

        if (emailAddressError || passwordError || confirmPasswordError || firstNameError || lastNameError || addressError || phoneNumberError) {
            setEmailAddress({ ...emailAddress, error: emailAddressError });
            setPassword({ ...password, error: passwordError });
            setConfirmPassword({ ...confirmPassword, error: confirmPasswordError });
            setFirstName({ ...firstName, error: firstNameError });
            setLastName({ ...lastName, error: lastNameError });
            setAddress({ ...address, error: addressError });
            setPhoneNumber({ ...phoneNumber, error: phoneNumberError });

            return;
        }

        userCreate({
            email_address: emailAddress.value,
            password: password.value,
            first_name: firstName.value,
            last_name: lastName.value,
            address: address.value,
            phone_number: phoneNumber.value,
        });

        // Finally,
        // navigation.navigate("Dashboard");
    };

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate("HomeScene")} />

            <HideWithKeyboard>
                <Logo />
            </HideWithKeyboard>

            <Header>Create new account</Header>

            <ScrollView contentContainerStyle={styles.container} style={{width: '100%'}}>
                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={emailAddress.value}
                    onChangeText={text => setEmailAddress({ value: text, error: '' })}
                    error={!!emailAddress.error}
                    errorText={emailAddress.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
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

                <TextInput
                    label="First name"
                    returnKeyType="next"
                    value={firstName.value}
                    onChangeText={text => setFirstName({ value: text, error: '' })}
                    error={!!firstName.error}
                    errorText={firstName.error}
                />

                <TextInput
                    label="Last name"
                    returnKeyType="next"
                    value={lastName.value}
                    onChangeText={text => setLastName({ value: text, error: '' })}
                    error={!!lastName.error}
                    errorText={lastName.error}
                />

                <TextInput
                    label="Last name"
                    returnKeyType="next"
                    value={lastName.value}
                    onChangeText={text => setLastName({ value: text, error: '' })}
                    error={!!lastName.error}
                    errorText={lastName.error}
                />

                <TextInput
                    label="Phone number"
                    returnKeyType="done"
                    value={phoneNumber.value}
                    onChangeText={text => setPhoneNumber({ value: text, error: '' })}
                    error={!!phoneNumber.error}
                    errorText={phoneNumber.error}
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                />
            </ScrollView>

                <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
                    Sign Up
                </Button>

                <View style={styles.row}>
                    <Text style={styles.label}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("LoginScene")}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>

        </Background>
    );
};

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
        paddingBottom: 16
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    container: {
        width: '100%',
        // marginVertical: 12,
        // flex: 1,
        // padding: 20,
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapDispatchToProps = (dispatch: Function) => ({
    userCreate: (user: User) => dispatch(userCreate(user))
});

export default compose(connect(null, mapDispatchToProps))(RegisterScene);