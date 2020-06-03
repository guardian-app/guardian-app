import React, {Component} from 'react';
import {Platform,Dimensions, StyleSheet, Text, View,SafeAreaView} from "react-native";
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

    Geocoder.init("AIzaSyAjoHv0BU_FcJgYz2f2dwUG0LogpVKOLuk",{language: "en"});

    if(!token){
        Actions.LoginScreen();
    }

    let child_id = localStorage.getItem("child_id");

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
        console.log("ppp")
        console.log(data);
        console.log('oo')

        setTimeout(()=> this.setState({
            // loading: false,
            // children: data
            latitude: data.latitude,
            longitude: data.longitude,
            timestamp: data.timestamp,
        }), 100)

        Geocoder.from(data.latitude, data.longitude)
        .then(json => {
          console.log("mmmm")
          console.log(json)
          var addressComponent = json.results[0].address_components[0];
          console.log(addressComponent);
          this.setState({
            address: addressComponent
          })
          console.log(addressComponent);
        })
        .catch(error => {
          console.log('pppppccccc')
          console.log(error.origin.results[0])
          console.warn(error)
        });

            console.log(this.state.children);
    }).catch = (e) => {
        console.error('error ',e)
    }

    // navigator.geolocation.getCurrentPosition(position => {
    //   this.setState({
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     error: null
    //   });
    //   console.log(position.timestamp);
    // }, 
    // error => this.setState({error: error.message}),
    // {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
    // );
    
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
  // container: {
  //   ...StyleSheet.absoluteFillObject
  // },
  // map:{
  //   ...StyleSheet.absoluteFillObject
  // }
  container: {
    flex: 1
  },
  map: {
    //flex: 1,
    height: Height,
    width: Width
  }
})