import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import Dimensions from 'dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Alert,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import {Button,ThemeProvider} from 'react-native-elements';
import { connect } from "react-redux";
import 'localstorage-polyfill';

import UserInput from './UserInput';
import usernameImg from '../../image/username.png';
import passwordImg from '../../image/password.png';
import eyeImg from '../../image/eye_black.png';

import spinner from '../../image/loading.gif';
import { createIconSetFromFontello } from 'react-native-vector-icons';

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class Temp extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      showPass: true,
      press: false,
      Username: '',
      Password: "",
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
    this._forgot = this._forgot.bind(this);
    
    this.showPass = this.showPass.bind(this);
  }

  componentDidMount() {
    if(localStorage.getItem("key")){
      setTimeout(() => {
          console.log(this.buttonAnimated.setValue(0))
        Actions.HomeScreen();
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }, 2300);
    }
    else if(localStorage.getItem("key2")){
      setTimeout(() => {
        console.log(this.buttonAnimated.setValue(0))
      Actions.Location2();
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
    }
  }

  showPass() {

    // const {username} = this.state;
    // const {password} = this.state;
    // console.log('fuck');
    // console.log("username: ",this.state.username);
    // console.log("password: ",this.state.password);

    // console.log(this.state.showPass);
    // console.log(this.state.showPass);

    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  _forgot() {
    console.log('call')
    const {Username} = this.state
    //var email_address = this.state.Username;
    console.log(Username)
      console.log('pppppppp');
      // sendEmail(
      //     'pramithvidusara@gmail.com',
      //     'Greeting!',
      //     'I think you are fucked up how many letters you get.',
      //     { cc: 'elon@tesla.com; elon@solarcity.com; elon@stanford.edu' }
      // ).then(() => {
      //     console.log('Our email successful provided to device mail ');
      // });
  }

  _onPress() {

    console.log('fuck');
    console.log("username: ",this.state.Username);
    console.log("password: ",this.state.Password);

    if (this.state.isLoading) return;

    var email_address = this.state.Username;
    var password = this.state.Password;

    const {Username} = this.state;
    const {Password} = this.state;
    //const {Time} = this.state;

    fetch("http://192.168.43.133:3000/users/authenticate",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: Password,
        email_address: Username,
      })

    })

    .then(function(response) {
      
      console.log("ttttttttttttttttttt")
      console.log(response.status);
      
       if(response.status == 404){
        console.log('comeeeeeee')
        Alert.alert(
          "Login Failed",
          "E-mail address is not registered!",
          [
            { text: "OK", onPress: ()=> {Actions.LoginScreen();}  }
          ]
        )
      } 
      if(response.status == 401){
        console.log('failed2')
        Alert.alert(
          "Login Failed",
          "Incorrect password!",
          [
            { text: "OK", onPress: ()=> {Actions.LoginScreen();} }
          ]
        )
      }
      else{
        return response;
      }
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('Request succeeded with JSON response:', json.token);
      console.log('Request succeeded with JSON response:', json.user);

      if(json.user.role == "parent"){
        console.log('pppppppppppppppppppppppppppp')
        localStorage.setItem("key", json.token);
        localStorage.setItem("user_id", json.user.user_id);
        localStorage.setItem("role", json.user.role);
        localStorage.setItem("first_name", json.user.first_name);
        localStorage.setItem("last_name", json.user.last_name);
        localStorage.setItem("username", json.user.email_address);
        localStorage.setItem("address", json.user.address);
        localStorage.setItem("phone_number", json.user.phone_number);
      }
      else{
        localStorage.setItem("key2", json.token);
        localStorage.setItem("user_id", json.user.user_id);
        localStorage.setItem("role", json.user.role);
        localStorage.setItem("first_name", json.user.first_name);
        localStorage.setItem("last_name", json.user.last_name);
        localStorage.setItem("username", json.user.email_address);
        localStorage.setItem("address", json.user.address);
        localStorage.setItem("phone_number", json.user.phone_number);
      }
        //console.log(localStorage.getItem("user"));
        // localStorage.setItem("key", JSON.stringify(json.token))
        let value = localStorage.getItem("key");
        console.log(value);
        try {
          value = JSON.parse(value);
          //this.setState({ [key]: value });
          console.log(value);
        } catch (e) {
          // handle empty string
          //this.setState({ [key]: value });
          console.log(value);
        }
        console.log('key');
        console.log(value);

        Alert.alert(
          "Login Successful",
          "",
          [
            { text: "OK", onPress: ()=> {if(localStorage.getItem("key")){
              Actions.HomeScreen();
            }else{
              Actions.Location2();
            }}  }
          ]
        )

    }).catch(function(error) {
      console.log('Request failed:', error);
    });
  }

  


  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [200 - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" >
        <UserInput
        style={{padding: 100, margin: 10}}
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText = {(Username) => this.setState({Username})}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText = {(Password) => this.setState({Password})}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>

      </KeyboardAvoidingView>
        <View >
            <Animated.View style={{width: changeWidth}}>
            <TouchableOpacity
                style={styles.button1}
                onPress={this._onPress}
                activeOpacity={1}>
                {this.state.isLoading ? (
                <Image source={spinner} style={styles.image1} />
                ) : (
                <Text style={styles.text1}>LOGIN</Text>
                )}
            </TouchableOpacity>
            <Animated.View
                style={[styles.circle1, {transform: [{scale: changeScale}]}]}
            />
            </Animated.View>
        </View>
        <View style={styles.forgot}>
          <ThemeProvider theme={theme}>
          <Button  type="clear" title="Forgot Password?"
            onPress={this._forgot}/>
          </ThemeProvider>
        </View>
      </View>
    );
  }
}

const theme = {
  Button: {
    titleStyle: {
      color: 'white',
    },
  },
};

const styles = StyleSheet.create({
  container1: {
    flex: 2,
    top: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle1: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text1: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image1: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 0.5,
    alignItems: 'center',
    margin: 0,
  },
  btnEye: {
    position: 'absolute',
    top: 86,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  forgot: {
    paddingTop: 80,
  }
});