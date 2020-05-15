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
  Linking
} from 'react-native';
import {Button,ThemeProvider} from 'react-native-elements';
import {Actions, ActionConst} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sendEmail} from '../forgotPassword/sendEmail';

export default class SignupSection extends Component {

  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  _mail(){
    console.log('pppppppp');
    sendEmail(
        'pramithvidusara@gmail.com',
        'Greeting!',
        'I think you are fucked up how many letters you get.',
        { cc: 'elon@tesla.com; elon@solarcity.com; elon@stanford.edu' }
    ).then(() => {
        console.log('Our email successful provided to device mail ');
    });
  }

  // sendEmail('pramithvidusara@gmail.com','Greeting!','I think you are fucked up how many letters you get.').then(() => {
  //   console.log('Our email successful provided to device mail ');
  // });

  

  _onPress() {
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
      Actions.RegistrationScreen();
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
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
        <Button type="clear" title="Create Account"
            onPress={this._onPress}
            />
            <Button  type="clear" title="Forgot Password?"
            onPress={this._mail}/>
        </ThemeProvider>
        {/* <Text style={styles.text}>Forgot Password?</Text> */}
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

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 80,
    width: -50, 
    //width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
    ///
    marginTop: -10,
    height: "20%",
    alignItems: 'center',

  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    //padding: 20,
    marginTop: 5,
    height: "20%",
    alignItems: 'center'
  },
  text1: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});