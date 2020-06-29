import React, { Component } from 'react';
import { View, StyleSheet, Button,Alert,Animated,Easing } from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import t from 'tcomb-form-native';
import { ScrollView } from 'react-native-gesture-handler';

const Form = t.form.Form;

const Email = t.refinement(t.String, (email) => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    return reg.test(email);
});

const Password = t.refinement(t.String, (password) => {
    const reg = /^(?=\S+$).{8,}$/;
    console.log(reg.test(password))
    return reg.test(password);
}); 

const Mobile = t.refinement(t.String, (mobile)=>{
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
  FirstName: t.String,
  LastName: t.String,
  email: Email,
  mobile: Mobile,
  address: t.String,
  OldPassword: Password,
  NewPassword: Password,
  ConfirmPassword: Password,


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

var values = {
  FirstName: localStorage.getItem("first_name"),
  LastName: localStorage.getItem("last_name"),
  email: localStorage.getItem("username"),
  mobile: localStorage.getItem("phone_number"),
  address: localStorage.getItem("address"),

};

const options = {
  fields: {
    FirstName : {
        error: 'provide your first name'
    }  ,
    LastName : {
        error: 'provide your last name'
    }  ,
    email: {
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
    },
    address: {
      error: 'Please provide Address'
    }
  },
  stylesheet: formStyles,
};

const _onHome = () =>{

  setTimeout(() => {
    Actions.HomeScreen();
  }, 2300);
}

const _onAlert=()=> {
  setTimeout(() => {
    Actions.ChildRegScreen();
  }, 2300);
}

export default class App extends Component { 

  state = {
    first_name: localStorage.getItem("first_name"),
    last_name: localStorage.getItem("last_name"),
    user_id: localStorage.getItem("user_id"),
    phone_number: localStorage.getItem("phone_number"),
    username: localStorage.getItem("username"),
    address: localStorage.getItem("address"),
  }

  componentDidMount(){
    this.setState({
      first_name: localStorage.getItem("first_name"),
      last_name: localStorage.getItem("last_name"),
      user_id: localStorage.getItem("user_id"),
      phone_number: localStorage.getItem("phone_number"),
      username: localStorage.getItem("username"),
      address: localStorage.getItem("address"),
    })
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);

    var token = localStorage.getItem("key");
    console.log(token)
    
    ///fetch eka

    fetch("http://192.168.43.133:3000/children/create",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token,
      },
      body: JSON.stringify({
        email_address : value.email,
        first_name: value.FirstName,
        last_name: value.LastName,
        address: value.address,
        phone_number: value.mobile,
        old_password: value.password,
        new_password: value.NewPassword,
        confirm_password: value.ConfirmPassword,
      })

    })
    .then(function(response) {
      
      console.log("ttttttttttttttttttt")
      console.log(response.status);
      if(response.status == 201){
        console.log('done')
        Alert.alert(
          "Registration Success",
          "Your child is now member of guardian",
          [
            { text: "OK", onPress: _onHome() }
          ]
        )
      }
      else if(response.status == 409){
        Alert.alert(
          "Registration Failed!",
          "Email is already used",
          [
            { text: "OK",onPress: _onAlert()  }
          ]
        )
      } 
      else if(response.status == 401){
        Alert.alert(
          "Registration Failed!",
          "Not found",
          [
            { text: "OK",onPress: _onAlert()  }
          ]
        )
      }
      else if(response.status == 403){
        Alert.alert(
          "Registration Failed!",
          "You are not parent",
          [
            { text: "OK",onPress: _onAlert()  }
          ]
        )
      }  
      else{
        return response;
      }

      // if (response.ok) {
      //   console.log("ok",response.ok,"ok")
      //   return response;
      // }
      
      // throw Error(response.statusText);
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
        <ScrollView  style = {{paddingTop: 20}}>
            <Form 
            ref={c => this._form = c}
            type={User} 
            options={options}
            value ={values}
            />

            <View style = {{paddingTop: 20}}>
              <Button
              
              color="#0020C2"
              title="OK"
              onPress={()=> {Actions.HomeScreen()}}
              />
            </View>

            <View style = {{paddingTop: 20, paddingBottom: 40}}>
              <Button
              color="#800080"
              title="UPDATE"
              //onPress={this.handleSubmit}
              />
            </View>

            
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
