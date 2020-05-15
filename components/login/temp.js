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

import UserInput from './UserInput';
import usernameImg from '../../image/username.png';
import passwordImg from '../../image/password.png';
import eyeImg from '../../image/eye_black.png';

import spinner from '../../image/loading.gif';

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
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
    this.showPass = this.showPass.bind(this);
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

  _onPress() {

    // const {username} = this.state;
    // const {password} = this.state;
    console.log('fuck');
    console.log("username: ",this.state.Username);
    console.log("password: ",this.state.Password);


    if (this.state.isLoading) return;

    console.log(this.state);
    console.log(this.growAnimated);
    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(() => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
        console.log(this.buttonAnimated.setValue(0))
      Actions.HomeScreen();
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
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
      </View>
    );
  }
}

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
});