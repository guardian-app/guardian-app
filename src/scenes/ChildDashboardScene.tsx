import React, { useCallback, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import { useDispatch, useSelector } from 'react-redux';
import {
    Logo,
    Header,
    Paragraph,
    Button,
    Background
} from '../components';
import { Navigation } from '../types';
import { userLogout } from '../actions';

type Props = {
    navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
    const currentUser = useSelector((state: any) => state.userReducer.currentUser);
    const dispatch = useDispatch();
    const _userLogout = useCallback(
        () => dispatch(userLogout()), [dispatch]
    );

    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const token = await SecureStore.getItemAsync("token");
                const user = await JSON.parse(await SecureStore.getItemAsync("user") || '');
                
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') setErrorMsg('Permission to access location was denied');

                let location = await Location.getCurrentPositionAsync({});
                await fetch(
                    `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/location/${user.user_id}`,
                    {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
                        body: JSON.stringify(location.coords)
                    }
                );
            } catch (err) {
                console.warn(err);
            };
        })();
    }, []);

    return (
        <Background>
            <Logo />
            <Header>{`${currentUser.first_name} ${currentUser.last_name}`}</Header>
            <Paragraph>
                Your location is being transmitted in the background.
                {errorMsg}
            </Paragraph>
            <Button mode="outlined" onPress={_userLogout}>
                Logout
            </Button>
        </Background>
    );
};

export default Dashboard;