import React, { Component } from 'react'
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'

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
      firstnameError: '',
      lastnameError: '',
      emailError: "",
      mobileError: "",
      relationshipError: "",
      addressError: '',
      }

  }

  // updateInputVal = (val, prop) => {
  //   const state = this.state;
  //   state[prop] = val;
  //   this.setState(state);
  // }

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

  firstnameValidator(){
    if(this.state.firstname == ''){
      this.setState({firstnameError: "Fill the first name field"})
    }
    else{
      this.setState({firstnameError: ''})
    }
  }

  lastnameValidator(){
    if(this.state.lastname == ''){
      this.setState({lastnameError: "Fill the last name field"})
    }
    else{
      this.setState({lastnameError: ''})
    }
  }

  addressValidator(){
    if(this.state.address == ''){
      this.setState({addressError: "Fill the address field"})
    }
    else{
      this.setState({addressError: ''})
    }
  }

  relationshipValidator(){
    if(this.state.relationship == ''){
      this.setState({relationshipError: "Fill the relationship field"})
    }
    else{
      this.setState({relationshipError: ''})
    }
  }

  mobileValidator(){
    if(this.state.mobile == ""){
      this.setState({mobileError: "Fill the mobile field"})
    }
    else if(this.state.mobile.length != 10){
      this.setState({mobileError: "Mobile number is not valid"})
    }
    else{
      this.setState({mobileError: ""})
    }
  }

  emailValidator(){
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    if(this.state.email== ""){
      this.setState({emailError: "Fill the email field"})
    }
    else if( ! expression.test(String(this.state.email).toLowerCase())){
      this.setState({emailError: "Please insert a valid email"});
    }
    else{
      this.setState({emailError: ""});
    }
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
              onBlur={()=>this.firstnameValidator()}
              // onChangeText={(val) => this.updateInputVal(val, 'firstname')}
              onChangeText={(text) => {this.setState({firstname: text})}}
            />
            <Text style={{ color:"red"}}>{this.state.firstnameError}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Last Name</Text>
            <TextInput
              placeholder="  last name"
              value={this.state.lastname}
              onBlur={()=>this.lastnameValidator()}
              // onChangeText={(val) => this.updateInputVal(val,'lastname')}
              onChangeText={(text) => {this.setState({lastname: text})}}
            />
            <Text style={{ color:"red"}}>{this.state.lastnameError}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Email Address</Text>
            <TextInput
              placeholder="  email"
              value={this.state.email}
              onBlur={()=> this.emailValidator()}
              // onChangeText={(val) => this.updateInputVal(val, 'email')}
              onChangeText={(text) => {this.setState({email: text})}}
            />
            <Text style={{ color:"red"}}>{this.state.emailError}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Mobile Number</Text>
            <TextInput
              placeholder="  mobile number"
              value={this.state.mobile}
              keyboardType="numeric"
              maxLength={10}
              onBlur={()=>this.mobileValidator()}
              // onChangeText={(val) => this.updateInputVal(val, 'mobile')}
              onChangeText={(text) => {this.setState({mobile: text})}}
            />
            <Text style={{ color:"red"}}>{this.state.mobileError}</Text>           
          </View>
          <View style={styles.textContainer}>
            <Text>Relationship</Text>
            <TextInput
              placeholder="  relationship"
              value={this.state.relationship}
              onBlur={()=>this.relationshipValidator()}
              // onChangeText ={(val) => this.updateInputVal(val, 'relationship')}
              onChangeText={(text) => {this.setState({relationship: text})}}
            />
            <Text style={{ color:"red"}}>{this.state.relationshipError}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text>Address</Text>
            <TextInput
              placeholder="  address"
              value={this.state.address}
              onBlur={()=>this.addressValidator()}
              // onChangeText ={(val) => this.updateInputVal(val, 'address')}
              onChangeText={(text) => {this.setState({address: text})}}
            />
            <Text style={{ color:"red"}}>{this.state.addressError}</Text>
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
