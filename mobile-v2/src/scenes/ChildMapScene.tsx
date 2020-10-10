import React, { useState, useEffect, useRef, createRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux';
import { Appbar, Menu, Divider, Dialog, Paragraph, Portal, Snackbar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native';
import MapView, { Marker, Polyline, LatLng, EdgePadding } from 'react-native-maps';
import * as timeago from 'timeago.js';
import {
    PlainBackground,
    TextInput,
    Button
} from '../components';
import { formatDate } from '../utils/formatters';
import { User, Navigation } from '../types';
import { childDelete } from '../actions';
import { colors, theme } from '../styles';

type Props = {
    navigation: Navigation;
    route: any
};

type MarkerType = {
    coordinate: Coords
    title: string,
    description: string
    id: string
};

type Coords = {
    latitude: number,
    longitude: number
};

type DateSelection = "real-time" | Date;

const ChildMap = ({ route, navigation }: Props) => {
    const { user_id } = route.params;
    const child = useSelector((state: any) => state.childReducer.children.find((child: User) => child.user_id === user_id));

    const [dateSelection, setDateSelection] = useState<DateSelection>("real-time");
    const [lastSeen, setLastSeen] = useState("unavailable");
    const [markers, setMarkers] = useState<MarkerType[]>([]);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const [dateMenuVisible, setDateMenuVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

    const mapRef = useRef<MapView>(null);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    const openDateMenu = () => setDateMenuVisible(true);
    const closeDateMenu = () => setDateMenuVisible(false);
    const showDialog = () => setDeleteDialogVisible(true);
    const hideDialog = () => setDeleteDialogVisible(false);

    const dispatch = useDispatch()
    const _childDelete = (child: User) => dispatch(childDelete(child));

    useEffect(() => {
        if (mapRef.current) {
            // list of _id's must same that has been provided to the identifier props of the Marker
            mapRef.current.fitToSuppliedMarkers(markers.map(({ id }) => id), {
                edgePadding: {
                    top: 600,
                    bottom: 600,
                    left: 600,
                    right: 600
                }
            });
        }
    }, [markers]);

    useEffect(() => {
        (async () => {
            const token = await SecureStore.getItemAsync("token");

            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') return setErrorMessage('Permission to access location was denied');

            if (dateSelection === "real-time") {
                try {
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

                        const objectDate = new Date(object.timestamp);
                        const objectLocation: Coords = {
                            latitude: parseFloat(object.latitude),
                            longitude: parseFloat(object.longitude)
                        };
                        const objectAddress = await Location.reverseGeocodeAsync(objectLocation);

                        setLastSeen(timeago.format(objectDate));
                        setMarkers([{
                            coordinate: objectLocation,
                            title: `${objectAddress[0].name}, ${objectAddress[0].street}, ${objectAddress[0].city} (${timeago.format(objectDate)})`,
                            description: `${objectDate.toDateString()} at ${objectDate.toLocaleTimeString()}`,
                            id: object.timestamp + object.longitude + object.latitude
                        }]);
                    } else {
                        setMarkers([]);
                        setErrorMessage("No location data available at the moment. Make sure you setup the Guardian application on your child's mobile device.");
                        setErrorVisible(true);
                    };
                } catch (err) {
                    setMarkers([]);
                    console.warn(err);
                };
            } else {
                try {
                    const request = fetch(
                        `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/location/${user_id}/history/${formatDate(dateSelection)}`,
                        {
                            method: "GET",
                            headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: `Bearer ${token}` },
                        }
                    );

                    const response = await request;
                    if (response.ok) {
                        const data: any[] = await response.json();

                        setMarkers(data.map((object: any) => {
                            const objectDate = new Date(object.timestamp);
                            return {
                                coordinate: {
                                    latitude: parseFloat(object.latitude),
                                    longitude: parseFloat(object.longitude)
                                },
                                title: objectDate.toDateString(),
                                description: `${objectDate.toLocaleTimeString()} (${timeago.format(objectDate)})`,
                                id: object.timestamp + object.longitude + object.latitude
                            };
                        }));
                    } else {
                        setMarkers([]);
                        setErrorMessage("No location data available for the selected date. Make sure you setup the Guardian application on your child's mobile device.");
                        setErrorVisible(true);
                    };
                } catch (err) {
                    setMarkers([]);
                    console.warn(err);
                };
            }
        })();
    }, [dateSelection]);

    const _handleMore = () => console.log('Shown more');

    const todayDate = new Date();
    const dateSelectionMenuItems = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date();
        currentDate.setDate(todayDate.getDate() - i);

        dateSelectionMenuItems.push(
            <Menu.Item
                onPress={() => {
                    setDateSelection(currentDate);
                    setDateMenuVisible(false);
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
            <Portal>
                <Dialog visible={deleteDialogVisible} onDismiss={hideDialog}>
                    <Dialog.Title>Confirmation</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Do you really want to remove this child? All location data will be deleted permanently.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            _childDelete(child);
                            hideDialog();
                            navigation.goBack();
                        }}>Delete</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title={`${child && child.first_name || ''} ${child && child.last_name || ''}`} />
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="dots-vertical" color="white" onPress={openMenu} />
                    }>
                    <Menu.Item onPress={() => {
                        closeMenu();
                    }} title="Edit" />
                    <Menu.Item onPress={() => {
                        showDialog();
                        closeMenu();
                    }} title="Remove" />
                </Menu>
            </Appbar.Header>

            <PlainBackground>
                <MapView
                    ref={mapRef}
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
                                identifier={marker.id}
                                coordinate={marker.coordinate}
                                title={marker.title}
                                description={marker.description}
                            />
                        )
                    })}

                    <Polyline
                        coordinates={
                            markers.map((marker: any) => ({
                                latitude: marker.coordinate.latitude,
                                longitude: marker.coordinate.longitude
                            }))
                        }
                        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                        strokeColors={[
                            '#7F0000',
                            '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                            '#B24112',
                            '#E5845C',
                            '#238C23',
                            '#7F0000'
                        ]}
                        strokeWidth={6}
                    />
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
                        subtitle={`Last seen ${lastSeen}`}
                    />

                    <Menu
                        visible={dateMenuVisible}
                        onDismiss={closeDateMenu}
                        anchor={<Button onPress={openDateMenu}>Show menu</Button>}>
                        <Menu.Item onPress={() => {
                            setDateSelection("real-time");
                            setDateMenuVisible(false);
                        }} title="Real-time" />
                        <Divider />
                        {dateSelectionMenuItems}
                    </Menu>

                    <Appbar.Action icon="clock" onPress={openDateMenu} />
                </Appbar>

                <Snackbar
                    visible={errorVisible}
                    onDismiss={() => setErrorVisible(false)}
                    action={{
                        label: 'OK',
                        onPress: () => setErrorVisible(false)
                    }}>
                    {errorMessage}
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