
import React, { Component,useState, useEffect } from 'react';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
///////////////////////
// import React, {Component} from 'react';
import {Alert,Platform,Dimensions, StyleSheet, Text, View,SafeAreaView, AppState} from "react-native";
import MapView, {Marker, AnimatedRegion} from "react-native-maps";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const ASPECT_RATIO = Width / Height;

// TaskManager.defineTask(YOUR_TASK_NAME, ({ data: { eventType, region }, error }) => {
//   if (error) {
//     // check `error.message` for more details.
//     return;
//   }
//   if (eventType === Location.GeofencingEventType.Enter) {
//     console.log("You've entered region:", region);
//   } else if (eventType === Location.GeofencingEventType.Exit) {
//     console.log("You've left region:", region);
//   }
// });

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

  

  componentDidMount() {

    
    AppState.addEventListener('change', this._handleAppStateChange);
    

    var lati;
    var long;

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null
      });
      console.log('location pppqqqqqq');
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      
    }, 
    error => this.setState({error: error.message}),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
    );
    
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  

  _handleAppStateChange = nextAppState => {
    console.log('done')
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App State: ' + 'App has come to the foreground!');
      alert('App State: ' + 'App has come to the foreground!');
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
      }

    }
    console.log('App State: ' + nextAppState);
    //alert('App State: ' + nextAppState);
    this.setState({ appState: nextAppState });
    console.log('awaqq')
    // navigator.geolocation.getCurrentPosition(position => {
    //   console.log('awa')
    //   this.setState({
    //     latitude: position.coords.latitude,
    //     longitude: position.coords.longitude,
    //     error: null
    //   });
    //   console.log('location pppqqqqqq');
    //   console.log(position.coords.latitude);
    //   console.log(position.coords.longitude);
      
    // }, 
    // error => this.setState({error: error.message}),
    // {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000}
    // );
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
          //style={styles.map}
          //onPress={e => console.log(e.nativeEvent)}
          //style={styles.map}
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
          region={
            {
            latitude: 6.927079,
            longitude: 79.861244,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
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