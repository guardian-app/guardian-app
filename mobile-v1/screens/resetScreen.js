import React, { Component } from 'react';
import { View, StyleSheet, Button,Alert,Animated,Easing } from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import t from 'tcomb-form-native';
import { ScrollView } from 'react-native-gesture-handler';

const Form = t.form.Form;
 
global.pass = "";

const Email = t.refinement(t.String, (email) => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const Password = t.refinement(t.String, (password) => {
  
    global.pass = password;
    const reg = /^(?=\S+$).{8,}$/;
    
    return reg.test(password);
}); 

const Confirm = t.refinement(t.String, (conPassword)=>{
  
  if(conPassword != global.pass){
    return false;
  }
  else{
    return true;
  }
})

const User = t.struct({
  username: Email,
  KeyCode: t.String,
  NewPassword: Password,
  ConfirmPassword: Confirm,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    KeyCode: {
        error: 'Without an key code cannot reset password'
    },  
    username: {
      email: true,
      error: 'Without an email address cannot reset password'
    },
    NewPassword: {
      password: true,
      secureTextEntry: true,
      error: 'Choose something you use on a dozen other sites or something you won\'t remember'
    },
    ConfirmPassword : {
      password: true,
      secureTextEntry: true,
      error: 'Password confirmation failed'
    },
  },
  stylesheet: formStyles,
};

const _onLogin = () =>{

  setTimeout(() => {
    Actions.LoginScreen();
  }, 2300);
}

const _onAlert=()=> {
  setTimeout(() => {
    Actions.RegistrationScreen();
  }, 2300);
}

export default class App extends Component {

  handleSubmit = () => {
    const value = this._form.getValue();
    
    ///fetch eka

    fetch("http://192.168.43.133:3000/users/reset",{
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address : value.username,
        reset_key: value.KeyCode,
        password: value.NewPassword,
      })

    })
    .then(function(response) {
      
      if(response.status == 200){
        console.log('done')
        Alert.alert(
          "Password Reset Successful",
          "Use application",
          [
            { text: "OK", onPress: _onLogin() }
          ]
        )
      }
      else if(response.status == 409){
        Alert.alert(
          "Registration Failed!",
          "Email is already used",
          [
            { text: "OK",onPress: {}  }
          ]
        )
      } 
      else if(response.status == 404){
        Alert.alert(
          "Password reset failed",
          "Verification key is expired!",
          [
            { text: "OK",onPress: {}  }
          ]
        )
      } 
      else{
        return response;
      }

    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('Request succeeded with JSON response:', json);
    }).catch(function(error) {
      console.log('Request failed:', error);
    });

  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
            <Form 
            ref={c => this._form = c}
            type={User} 
            options={options}
            />
            <Button
            color="#0020C2"
            title="Sign Up!"
            onPress={this.handleSubmit}
            />
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
