import React, { Component } from 'react';
import { View, StyleSheet, Button,Alert,Animated,Easing } from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import t from 'tcomb-form-native';
import { ScrollView } from 'react-native-gesture-handler';

const Form = t.form.Form;

const Mobile = t.refinement(t.String, (mobile)=>{
    //const reg = /^\d{}$/;
    if(mobile.length > 0 ){
        console.log('true aaaaaaaaaaaaaaaa');
        if(isNaN(mobile))
            return true;
        return false;
    }
    else{
        return false;
    }
    // return reg.test(mobile);
});


const User = t.struct({
  radius: Mobile,
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
    
    radius: {
        keyboardType:'numeric',
        error: 'Please, provide valid radius',
    },
    
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
    //Actions.ChildRegScreen();
  }, 2300);
}

export default class App extends Component { 

  handleSubmit = () => {
    const value = this._form.getValue();

    var token = localStorage.getItem("key");
    
    ///fetch eka

    fetch("http://192.168.43.133:3000/",{
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token,
      },
      body: JSON.stringify({
        radius: value.radius,
      })

    })
    .then(function(response) {
      
      if(response.status == 201){
        console.log('done')
        Alert.alert(
          "Insertion Success",
          "Your radius added",
          [
            { text: "OK", onPress: _onHome() }
          ]
        )
      }
      else if(response.status == 409){
        Alert.alert(
          "Insertion Failed!",
          "Email is already used",
          [
            { text: "OK",onPress: _onAlert()  }
          ]
        )
      } 
      else if(response.status == 401){
        Alert.alert(
          "Insertion failed Failed!",
          "Not found",
          [
            { text: "OK",onPress: _onAlert()  }
          ]
        )
      }
      else if(response.status == 403){
        Alert.alert(
          "Insertion Failed!",
          "You are not parent",
          [
            { text: "OK",onPress: _onAlert()  }
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
            title="Add Radius"
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
