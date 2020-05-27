import React, {Component, useState} from 'react';
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
} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import 'localstorage-polyfill';

import spinner from '../../image/loading.gif';
import App from '../../App';
import FrontScreen from '../../screens/frontScreen';

// const DEVICE_WIDTH = Dimensions.get('window').width;
// const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };


    object = new FrontScreen();

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
    this.child = this.child.bind(this);
  }

  child() {

    if(localStorage.getItem("key2")){
      Actions.Location2();
    }

    console.log('fuck');
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
      Actions.ChildLogScreen();
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

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

    if(localStorage.getItem("key")){
      setTimeout(() => {
          console.log(this.buttonAnimated.setValue(0))
        Actions.HomeScreen();
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }, 2300);
    }
    else{
      setTimeout(() => {
          console.log(this.buttonAnimated.setValue(0))
        Actions.LoginScreen();
        this.setState({isLoading: false});
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      }, 2300);
    }

    
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {

    console.log(this.props.navigation);
    //console.log(this.props.parent.bind(this));

    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [200 - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    const parent = () => {
      console.log('ppppppppppppppp')
      //this.props.navigation.navigate('LoginScreen')
      object.parent1();
    }

    const child = ({navigation})=> {
      console.log('ccccccccccccccccccccccccccc');
    }


    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth, margin: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            //onPress={parent}
            //onPress={() => this.props.navigation.navigate('LoginScreen')}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>PARENT</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            //onPress={this._onPress}
            onPress={this.child}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>CHILD</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -95,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
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
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});

