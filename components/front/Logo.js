import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image} from 'react-native';

//import logoImg from '../../image/logo.png';
//import logoImg from "../../logo/gl.png";
import logoImg from "../../logo/header1.png"

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
        <Text style={styles.text}>GUARDIAN</Text>
        <Text style={styles.text2} >Child Safety Solution</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:0,
  },
  image: {
    width: 160,
    height:160,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 10,
    fontSize: 40,
  },
  text2: {
    color: 'yellow',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 10,
    fontSize: 20,
  },
});