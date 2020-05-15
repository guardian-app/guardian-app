import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import t from 'tcomb-form-native';
import { ScrollView } from 'react-native-gesture-handler';

const Form = t.form.Form;

const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const Password = t.refinement(t.String, (password) => {
    const reg = /^(?=\S+$).{8,}$/;
    return reg.test(password);
});

const confPassword = t.refinement(t.String, (confpassword,password) => {
    if(confpassword === password){
        return true;
    }
    else{
        return false
    }
    //return reg.test(confpassword);
});  

const Mobile = t.refinement(t.String, (mobile)=>{
    // if(mobile.length != 10){
    //     return false;
    // }
    // else{
    //     return true;
    // }
    const reg = /^\d{10}$/;
    return reg.test(mobile);
});

const nic = t.refinement(t.String, (NIC)=>{
    if(NIC.length == 10 || NIC.length == 12){
        return true;
    }
    else{
        return false;
    }
})

const User = t.struct({
  "First Name": t.String,
  "Last Name": t.String,
  username: t.maybe(t.String),
  username: Email,
  password: Password,
  "Confirm Password":confPassword ,
  mobile: Mobile,
  NIC: nic,
  terms: t.Boolean
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
    "First Name" : {
        error: 'provide your first name'
    }  ,
    "Last Name" : {
        error: 'provide your last name'
    }  ,
    username: {
      error: 'Without an email address how are you going to reset your password when you forget it?'
    },
    password: {
      password: true,
      secureTextEntry: true,
      error: 'Choose something you use on a dozen other sites or something you won\'t remember'
    },
    "Confirm Password" : {
        error: 'Password confirmation failed'
    }  ,
    NIC :{
        error: "Enter correct NIC number"
    },
    terms: {
      label: 'Agree to Terms',
    },
    mobile: {
        keyboardType:'numeric',
        error: 'Please, provide correct phone number',
    }
  },
  stylesheet: formStyles,
};

export default class App extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
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
