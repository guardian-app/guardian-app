import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/login/Logo';
import Form from '../components/login/Form';
import Wallpaper from '../components/login/Wallpaper';
import ButtonSubmit from '../components/login/ButtonSubmit';
import SignupSection from '../components/login/SignupSection';
import Temp from '../components/login/temp';

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <Logo />
        

        <Temp/>
        <SignupSection/>
        {/* <Form />
        <SignupSection />
        <ButtonSubmit /> */}
      </Wallpaper>
    );
  }
}