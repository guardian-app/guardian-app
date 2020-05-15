import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  SafeAreaView
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import PubNubReact from "pubnub-react";
import PubNub from 'pubnub';
//var PubNubReact = require('pubnub-react');

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 6.927079;
const LONGITUDE = 79.861244;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        coordinate: new AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: 0,
          longitudeDelta: 0
        })
      };
  
      this.pubnub = new PubNubReact({
        publishKey: "pub-c-9c038ebd-8985-4c8e-8c27-c7c27bfa57d6",
        subscribeKey: "sub-c-13b8892e-951e-11ea-9dd4-caf89c7998a9",
        
      });
      this.pubnub.init(this);
    }
  
    componentDidMount() {
      this.watchLocation();
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (this.props.latitude !== prevState.latitude) {
        this.pubnub.publish({
          message: {
            latitude: this.state.latitude,
            longitude: this.state.longitude
          },
          channel: "location"
        });
      }
    }

    
  
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
  
    watchLocation = () => {
      const { coordinate } = this.state;
  
      this.watchID = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
  
          const newCoordinate = {
            latitude,
            longitude
          };
  
          if (Platform.OS === "android") {
            if (this.marker) {
              this.marker._component.animateMarkerToCoordinate(
                newCoordinate,
                500 // 500 is the duration to animate the marker
              );
            }
          } else {
            coordinate.timing(newCoordinate).start();
          }
  
          this.setState({
            latitude,
            longitude
          });
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10
        }
      );
    };
  
    getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    });
  
    render() {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <MapView
              style={styles.map}
              showUserLocation
              followUserLocation
              loadingEnabled
              region={this.getMapRegion()}
            >
              <Marker.Animated
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={this.state.coordinate}
              />
            </MapView>
          </View>
        </SafeAreaView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "flex-end",
      alignItems: "center"
    },
    map: {
      ...StyleSheet.absoluteFillObject
    }
  });