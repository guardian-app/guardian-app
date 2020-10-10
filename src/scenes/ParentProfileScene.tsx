import React, { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Appbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import {
    Logo,
    Header,
    Paragraph,
    Button,
    Background,
    PlainBackground
} from '../components';
import { Navigation } from '../types';
import { userLogout } from '../actions';

const ParentProfile = (props: { navigation: Navigation }) => {
    const currentUser = useSelector((state: any) => state.userReducer.currentUser);
    const dispatch = useDispatch();
    const logout = useCallback(
        () => dispatch(userLogout()),
        [dispatch]
    );

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Profile" />
            </Appbar.Header>
            <Background>
                <Logo />
                <Header>{currentUser.first_name} {currentUser.last_name}</Header>
                <Paragraph>
                    {currentUser.email_address}
                </Paragraph>
                <Button mode="outlined" onPress={logout}>
                    Logout
            </Button>
            </Background>
        </>
    );
};

export default memo(ParentProfile);