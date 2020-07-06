import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useSelector } from 'react-redux';
import { Appbar } from 'react-native-paper';
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

const ChildMap = ({ route, navigation }: Props) => {
    const { user_id } = route.params;
    const child = useSelector((state: any) => state.childReducer.children.find((child: any) => child.user_id === user_id));

    const [markers, setMarkers] = useState<Coords[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        (async () => {
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
                        id: object.timestamp
                    }]);
                } else {
                    setVisible(true);
                };
            } catch (err) {
                console.warn(err);
            };
        })();
    }, []);

    const _handleMore = () => console.log('Shown more');

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

                <Snackbar
                    visible={visible}
                    onDismiss={() => setVisible(false)}
                    action={{
                        label: 'OK',
                        onPress: () => setVisible(false)
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
});

export default ChildMap;