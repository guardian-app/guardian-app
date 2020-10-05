import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import Dimensions from 'dimensions';
import {StyleSheet, ImageBackground} from 'react-native';

//import bgSrc from '../../image/wall.jpg';
import bgSrc from '../../image/child1.jpg';

export default class Wallpaper extends Component {
  render() {
    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex:1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: 'rgba(0,0, 0, 0.5)',
    
  },
});