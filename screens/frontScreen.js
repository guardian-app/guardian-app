import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/front/Logo';
import Wallpaper from '../components/front/Wallpaper';
import ButtonSubmit from '../components/front/ButtonSubmit';
import {View} from 'react-native';


export default class FrontScreen extends Component {

  parent1(){
    console.log('kvoeikoivemrv')
    this.props.navigation.navigate('LoginScreen');
  }

  render() {

    console.log(this.props.navigation);
    // const parent1 = () => {
    //   this.props.navigation.navigate('LoginScreen')
    // }

    return (
      <Wallpaper>
        <Logo />
        <ButtonSubmit />
      </Wallpaper>
    );
  }
}

// const FrontScreen =() => {
//       return (
//       <View>
//         <Wallpaper>
//         <Logo />
//         <ButtonSubmit />
//       </Wallpaper>
//       </View>
//     );
// }

// export default FrontScreen