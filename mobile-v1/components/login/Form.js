import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import Dimensions from 'dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import usernameImg from '../../image/username.png';
import passwordImg from '../../image/password.png';
import eyeImg from '../../image/eye_black.png';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      username: '',
      password: "",
    };
    this.showPass = this.showPass.bind(this);
    //this.username = this.username.bind(this);
  }

  showPass() {

    const {username} = this.state;
    const {password} = this.state;
   console.log('fuck');
    console.log("username: ",this.state.username);
    console.log("password: ",this.state.password);

    console.log(this.state.showPass);
    console.log(this.state.showPass);

    this.state.press === false
      ? this.setState({showPass: false, press: true})
      : this.setState({showPass: true, press: false});
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <UserInput
        style={{padding: 100, margin: 10}}
          source={usernameImg}
          placeholder="Username"
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false}
          onChangeText = {username => this.setState({username})}
        />
        <UserInput
          source={passwordImg}
          secureTextEntry={this.state.showPass}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
          onChangeText = {password => this.setState({password})}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass}>
          <Image source={eyeImg} style={styles.iconEye} />
        </TouchableOpacity>

      </KeyboardAvoidingView>
    );
  }
}

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
  },
  btnEye: {
    position: 'absolute',
    top: 63,
    right: 48,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
  
});