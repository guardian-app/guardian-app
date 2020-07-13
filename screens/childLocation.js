import React, {Component} from 'react';
import {Platform,Dimensions, StyleSheet, Text, View,SafeAreaView, Button} from "react-native";
import MapView, {Marker, AnimatedRegion} from "react-native-maps";
import PubNubReact from "pubnub-react";
import Axios from "axios";
import Geocoder from 'react-native-geocoding';
import { Actions } from 'react-native-router-flux';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const ASPECT_RATIO = Width / Height;

export default class Location extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      latitude: 0,
      longitude: 0,
      timestamp : 0,
      address: null,
      error: null
    };
  }

  componentDidMount() {

    let token = localStorage.getItem("key");
    if(!token){
        Actions.LoginScreen();
    }
    
    this.interval = setInterval(() => this.onGetLocation(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onGetLocation = () => {
    Geocoder.init("AIzaSyAjoHv0BU_FcJgYz2f2dwUG0LogpVKOLuk",{language: "en"});
    let child_id = localStorage.getItem("child_id");
    let token = localStorage.getItem("key");

    console.log('mount');
    Axios.get('http://192.168.43.133:3000/location/'+child_id,{
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token,
        },
    })
    .then(res => {
        this.setState({loading: true});
        const data = res.data;

        setTimeout(()=> this.setState({
            // loading: false,
            // children: data
            latitude: data.latitude,
            longitude: data.longitude,
            timestamp: data.timestamp,
        }), 5000)

        var la = data.latitude;
        var lo = data.longitude;

        //this.getAddressFromCoordinates({ la, lo })
        Geocoder.init("AIzaSyCByfizTIm7VD9eaxjq30oN_N5Zcjd09Zw");
        Geocoder.from(data.latitude, data.longitude)
        .then(json => {
          var addressComponent = json.results[0].address_components[0];
          this.setState({
            address: addressComponent
          })

        })
        .catch(error => {
          console.warn(error)
        });

    }).catch = (e) => {
        console.error('error ',e)
    }
  }

  

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  render() {
    return(
      <View Style = {styles.container}>
        <MapView
          onPress={e => console.log(e.nativeEvent)}
          style={styles.map}
          provider='google'
          mapType='mutedStandard'
          //camera="region"
          paddingAdjustmentBehavio="GoogleMaps"
          //liteMode={true}
          showsIndoorLevelPicker={true}
          cacheEnabled={true}
          loadingEnabled	={true}
          isAccessibilityElement	= {true}
          showsScale
          showsCompass
          showsPointsOfInterest
          showsBuildings
          showsUserLocation = {true}
          style={styles.map}
          region={{
            latitude: 6.927079,
            longitude: 79.861244,
            latitudeDelta: 2,
            longitudeDelta: 5
          }}
          onLayout={this.onMapLayout}
        >
          { this.state.isMapReady && 
            <Marker coordinate={this.state}/>
          }

        </MapView>  
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    //flex: 1,
    height: Height,
    width: Width
  }
})