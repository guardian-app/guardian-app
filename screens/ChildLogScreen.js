import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/login/Logo';
import Form from '../components/login/Form';
import Wallpaper from '../components/login/Wallpaper';
import ButtonSubmit from '../components/login/ButtonSubmit';
import SignupSection from '../components/login/SignupSection';
import Temp from '../components/login/temp2';
import { connect } from "redux";
 
export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <Logo />
        <Temp/>
      </Wallpaper>
    );
  }
}