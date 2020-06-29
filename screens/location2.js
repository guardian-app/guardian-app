
import React, { Component,useState, useEffect } from 'react';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
///////////////////////
// import React, {Component} from 'react';
import {Alert,Dimensions, StyleSheet, Text, View,RefreshControl, AppState, Button} from "react-native";
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
      time: Date.now(),
      error: null,
      appState: AppState.currentState,
      
    };

    this._backgroundLocation = this._backgroundLocation.bind(this);
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  _sendLocation(lati,long,time){
      console.log('tilanga')
      const child_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("key2");

      fetch("http://192.168.43.133:3000/location/"+child_id,{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token,
      },
      body: JSON.stringify({
        longitude: long,
        latitude: lati,
        //timestamp: time,
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
      if(response.status == 200){
        console.log('done')
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
        console.log(position.coords.altitude);
        console.log(position.coords.accuracy);

        this._sendLocation(position.coords.latitude,position.coords.longitude,position.timestamp)

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
      console.log(location.latitudeDelta);

      this.setState({
        latitude: location.latitude,
        longitude: location.longitude,
        error: null
      });

      this._sendLocation(location.latitude, location.longitude, location.timestamp);
    }

  }

  componentDidMount() {

    if(localStorage.getItem("key2") == ""){
      Actions.LoginScreen();
    }
    
    AppState.addEventListener('change', this._handleAppStateChange);

    
    
    var lati;
    var long;

    let time = 0

    console.log('we');
      console.log(this.state.appState);
      console.log('ppcscs');

      //setTimeout(this._activeLocation(),15000)

      if(this.state.appState == "active"){
        console.log('acacacactive')
        this.interval = setInterval(() => this._activeLocation(), 15000);
      }else{
        this.interval = setInterval(() => this._backgroundLocation(), 15000);
      }

  }

  componentWillUnmount() {
    if(localStorage.getItem("key2") == ""){
      Actions.LoginScreen();
    }
    AppState.removeEventListener('change', this._handleAppStateChange);
    clearInterval(this.interval);
  }

  _handleAppStateChange = nextAppState => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    console.log('done')
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App State: ' + 'App has come to the foreground!');
      alert('App State: ' + 'App has come to the foreground!');
      

      setTimeout(this._backgroundLocation(), 15000);

      //this._backgroundLocation();
      
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

  onPressLogout =() => {
    console.log('till')
    localStorage.setItem("key2", "");
    localStorage.setItem("role","")
    localStorage.setItem("id","");
    console.log(localStorage.getItem("key"));
    this.setState({ appState: "background" });
    Actions.LoginScreen();
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
        {/* <Button title="back" onPress={() => Actions.FrontScreen() } /> */}
        <Button title="Logout" onPress={this.onPressLogout } />
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
    height: Height-70,
    width: Width
  }
})