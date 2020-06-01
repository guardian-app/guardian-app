
import React, { Component,useState, useEffect } from 'react';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
///////////////////////
// import React, {Component} from 'react';
import {Alert,Platform,Dimensions, StyleSheet, Text, View,SafeAreaView, AppState, Button} from "react-native";
import MapView, {Marker, AnimatedRegion} from "react-native-maps";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import Constants from 'expo-constants'
import ActionButton from 'react-native-material-ui/src'
import {Actions, ActionConst} from 'react-native-router-flux';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const ASPECT_RATIO = Width / Height;

export default class Location2 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      latitude: 0,
      longitude: 0,
      isLoading: true,
      location: [],
      error: null,
      appState: AppState.currentState,
    };
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  _sendLocation(lati,long,time){
    fetch=()=>{

      const token = localStorage.getItem("key2");

      fetch("http://192.168.43.133:3000/users/authenticate",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token,
      },
      body: JSON.stringify({
        longitude: long,
        latitude: lati,
        timestamp: time,
      })

    })

    .then(function(response) {
      
      console.log("ttttttttttttttttttt")
      console.log(response.status);
      
       if(response.status == 404){
        console.log('comeeeeeee')
        
      } 
      if(response.status == 401){
        console.log('failed2')
        
      }
      else{
        return response;
      }
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('Request succeeded with JSON response:', json);       
        try {
          console.log('try')
        } catch (e) {

          console.log("catch");
        }
        console.log('key');
        
    }).catch(function(error) {
      console.log('Request failed:', error);
    });
    }
  }

  _activeLocation(){
    navigator.geolocation.getCurrentPosition(position => {
      console.log('tui')
      console.log('tuitui')
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
        console.log('location pppqqqqqq');
        console.log(position.timestamp);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        console.log(position.coords.timestamp);

        setTimeout(function(){
          console.log('vdqq')
        },1000);
    }, 
    error => this.setState({error: error.message}),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
    );
  }

  _backgroundLocation(){
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    });
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      console.log('fffffffffffff')
      console.log(location.latitude);
      console.log(location.timestamp);
      this.setState({
        latitude: location.latitude,
        longitude: location.longitude,
        error: null
      });
    }

  }

  componentDidMount() {
    
    AppState.addEventListener('change', this._handleAppStateChange);
    
    var lati;
    var long;

    let time = 0

    console.log('we');
      console.log(this.state.appState);
      console.log('ppcscs');

      this._activeLocation();
    
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  

  _handleAppStateChange = nextAppState => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    console.log('done')
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App State: ' + 'App has come to the foreground!');
      alert('App State: ' + 'App has come to the foreground!');
      
      this._backgroundLocation();
      
    }
    console.log('App State: ' + nextAppState);
    //alert('App State: ' + nextAppState);
    this.setState({ appState: nextAppState });
    console.log('awaqq')
  };

  onMapLayout = () => {
    this.setState({ isMapReady: true });
    console.log('location ppp')
    console.log(this.state)
  }

  

  render() {

    return(
      <View Style = {styles.container}>
                
        <MapView
          onPress={e => console.log(e.nativeEvent)}
          provider='google'
          mapType='mutedStandard'
          paddingAdjustmentBehavio="GoogleMaps"
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
          region={
            {
            latitude: 6.927079,
            longitude: 79.861244,
            latitudeDelta: 0.2,
            longitudeDelta: 5
          }
        }
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



// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Act } from 'react-native';
// import * as Location from 'expo-location';
// import { Actions } from 'react-native-router-flux';


// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   console.log('ssssssssssss')
//   console.log(localStorage.getItem('key2'));

//   // if(!localStorage.getItem('key2')){
//   //   Actions.ChildLogScreen();
//   // }

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   });

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//     console.log('fffffffffffff')
//     console.log(location.latitude);
//   }

//   //Actions.Location1();

//   return (
//      <View style={styles.container}>
//        <Text  style = {{paddingTop: 100, marginHorizontal:10}} >{text}</Text>
//      </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });