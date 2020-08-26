import React, { Component } from 'react'
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'

import validatejs from './validate'

export default class addContact extends Component {

  constructor(props){
    super(props)

    this.state = {
      firstname: '',
      lastname: '',
      email: "",
      mobile: "",
      relationship: "",
      address: '',
  
      inputs: {
        firstname: {
          type: "generic",
          value: ""
        },
        lastname: {
          type: "generic",
          value: ""
        },
        email: {
          type: "email",
          value: ""
        },
        address: {
          type: "generic",
          value: ""
        },
  
        mobile: {
          type: "mobile",
          value: ""
        },
  
      }
  
    }

    this.onInputChange = validationService.onInputChange.bind(this);
  }

  validateInput({ type, value }) {
    const result = validatejs(
      {
        [type]: value
      },
      {
        [type]: validationDictionary[type]
      }
    );
  
    if (result) {
      return result[type][0];
    }
  
    return null;
  }

  getInputValidationState({ input, value }) {
    return {
      ...input,
      value,
      errorLabel: input.optional
        ? null
        : validateInput({ type: input.type, value })
    };
  }

  onInputChange({ id, value, cb = () => {} }) {
    const { inputs } = this.state;
    this.setState(
      {
        inputs: {
          ...inputs,
          [id]: getInputValidationState({
            input: inputs[id],
            value
          })
        }
      },
      cb
    );
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  onSubmit = ()  => {

    var token = localStorage.getItem("key");

    const {firstname, lastname, email, mobile, relationship, address}= this.state;

    console.log(firstname)
    
    if(firstname && lastname && email && mobile && relationship && address){
      //fetch

      fetch("http://192.168.43.133:3000/users/createContact",{
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer "+token,
        },
        body: JSON.stringify({
          email_address : email,
          first_name: firstname,
          last_name: lastname,
          address: address,
          phone_number: mobile,
          relationship: relationship
        })

      })
      .then(function(response) {
        
        if(response.status == 201){
          console.log('done')
          Alert.alert(
            "Insertion Success",
            "Your trusted contact added",
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
    else{
      Alert.alert(
        "Fill all fields"
      )
    }

  }

_onHome = () =>{

  setTimeout(() => {
    Actions.HomeScreen();
  }, 2300);
}

_onAlert=()=> {
  setTimeout(() => {
    //Actions.ChildRegScreen();
  }, 2300);
}

  render() {
    return (
      <View style= {styles.container}>
        <View style={styles.dataForm}>
          <View style={styles.textContainer} >
            <Text>First Name</Text>
            <TextInput
              placeholder="  first name"
              value={this.state.firstname}
              onChangeText={(val) => this.updateInputVal(val, 'firstname')}
            />
          </View>
          <View style={styles.textContainer}>
            <Text>Last Name</Text>
            <TextInput
              placeholder="  last name"
              value={this.state.lastname}
              onChangeText={(val) => this.updateInputVal(val,'lastname')}
            />
          </View>
          <View style={styles.textContainer}>
            <Text>Email Address</Text>
            <TextInput
              placeholder="  email"
              value={this.state.email}
              onChangeText={(val) => this.updateInputVal(val, 'email')}
            />
          </View>
          <View style={styles.textContainer}>
            <Text>Mobile Number</Text>
            <TextInput
              placeholder="  mobile number"
              value={this.state.mobile}
              onChangeText={(val) => this.updateInputVal(val, 'mobile')}
            />
          </View>
          <View style={styles.textContainer}>
            <Text>Relationship</Text>
            <TextInput
              placeholder="  relationship"
              value={this.state.relationship}
              onChangeText ={(val) => this.updateInputVal(val, 'relationship')}
            />
          </View>
          <View style={styles.textContainer}>
            <Text>Address</Text>
            <TextInput
              placeholder="  address"
              value={this.state.address}
              onChangeText ={(val) => this.updateInputVal(val, 'address')}
            />
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button title="Add Relation" onPress = {this.onSubmit} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  dataForm: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width:'80%',
    justifyContent: "center",
    marginHorizontal: 20,
    paddingTop: 20,
    marginLeft: 30,
  },
  textContainer: {
    marginHorizontal: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  }
})
