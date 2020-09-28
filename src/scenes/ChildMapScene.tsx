import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useSelector } from 'react-redux';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import MapView from 'react-native-maps';
import { Text, Dimensions } from 'react-native';
import { Marker, LatLng } from 'react-native-maps';
import { colors, theme } from '../styles';
import {
    PlainBackground,
    TextInput,
    Button
} from '../components';
import { User, Navigation } from '../types';

type Props = {
    navigation: Navigation;
    route: any
};

type Coords = {
    coordinate: {
        latitude: number,
        longitude: number
    },
    title: string,
    description: string
    id: number
}

type DateSelection = "real-time" | Date;

const ChildMap = ({ route, navigation }: Props) => {
    const { user_id } = route.params;
    const child = useSelector((state: any) => state.childReducer.children.find((child: any) => child.user_id === user_id));

    const [dateSelection, setDateSelection] = useState<DateSelection>("real-time");
    const [markers, setMarkers] = useState<Coords[]>([]);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    useEffect(() => {
        (async () => {
            if (dateSelection === "real-time") {
                try {
                    const token = await SecureStore.getItemAsync("token");
                    const request = fetch(
                        `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/location/${user_id}`,
                        {
                            method: "GET",
                            headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
                        }
                    );

                    const response = await request;
                    if (response.ok) {
                        const object = await response.json();
                        setMarkers([{
                            coordinate: {
                                latitude: parseFloat(object.latitude),
                                longitude: parseFloat(object.longitude)
                            },
                            title: new Date(object.timestamp).toDateString(),
                            description: new Date(object.timestamp).toTimeString(),
                            id: object.timestamp + object.longitude + object.latitude
                        }]);
                    } else {
                        setMarkers([]);
                        setSnackbarVisible(true);
                    };
                } catch (err) {
                    setMarkers([]);
                    console.warn(err);
                };
            } else {
                try {
                    const token = await SecureStore.getItemAsync("token");
                    const request = fetch(
                        `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/location/${user_id}/history/${dateSelection.toISOString().split('T')[0]}`,
                        {
                            method: "GET",
                            headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
                        }
                    );

                    const response = await request;
                    if (response.ok) {
                        const data: any[] = await response.json();
                        setMarkers(data.map((object: any) => {
                            return {
                                coordinate: {
                                    latitude: parseFloat(object.latitude),
                                    longitude: parseFloat(object.longitude)
                                },
                                title: new Date(object.timestamp).toDateString(),
                                description: new Date(object.timestamp).toTimeString(),
                                id: object.timestamp
                            }
                        }));
                    } else {
                        setMarkers([]);
                        setSnackbarVisible(true);
                    };
                } catch (err) {
                    setMarkers([]);
                    console.warn(err);
                };
            }
        })();
    }, [dateSelection]);

    const _handleMore = () => console.log('Shown more');

    const dateSelectionMenuItems = [];

    const todayDate = new Date();
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        currentDate.setDate(todayDate.getDate() - i);

        dateSelectionMenuItems.push(
            <Menu.Item
                onPress={() => {
                    setDateSelection(currentDate);
                    setMenuVisible(false);
                }}
                title={
                    i === 0
                        ? `Today (${currentDate.toDateString()})`
                        : i === 1
                            ? `Yesterday (${currentDate.toDateString()})`
                            : `${currentDate.toDateString()}`
                }
                key={currentDate.toString()}
            />
        );
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={`${child.first_name} ${child.last_name}`} />
                <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
            </Appbar.Header>

            <PlainBackground>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: 7.2906,
                        longitude: 80.6337,
                        latitudeDelta: 2.5,
                        longitudeDelta: 2.5,
                    }}>
                    {markers.map((marker: any) => {
                        return (
                            <Marker
                                key={marker.id}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                            />
                        )
                    })}
                </MapView>

                <Appbar style={styles.bottom}>
                    <Appbar.Content
                        title={dateSelection === "real-time"
                            ? "Real-time"
                            : dateSelection.getUTCDate() === (new Date()).getUTCDate()
                                ? "Today"
                                : dateSelection.getUTCDate() == (new Date(Date.now() - 864e5)).getUTCDate()
                                    ? "Yesterday"
                                    : dateSelection.toISOString().split('T')[0]}
                        subtitle={'Last seen 1 hour ago'}
                    />

                    <Menu
                        visible={menuVisible}
                        onDismiss={closeMenu}
                        anchor={<Button onPress={openMenu}>Show menu</Button>}>
                        <Menu.Item onPress={() => {
                            setDateSelection("real-time");
                            setMenuVisible(false);
                        }} title="Real-time" />
                        <Divider />
                        {dateSelectionMenuItems}
                    </Menu>

                    <Appbar.Action icon="dots-vertical" onPress={openMenu} />
                </Appbar>

                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    action={{
                        label: 'OK',
                        onPress: () => setSnackbarVisible(false)
                    }}>
                    {"No location data available at the moment. Make sure you setup the Guardian application on your child's mobile device."}
                </Snackbar>
            </PlainBackground>
            <StatusBar style="light" />
        </>
    );
};


const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 48,
        right: 0,
        bottom: 0,
        backgroundColor: colors.light
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default ChildMap;