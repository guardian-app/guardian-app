// import React, { Component } from 'react';
// import { View, StyleSheet, Button,Alert,Animated,Easing } from 'react-native';
// import {Actions, ActionConst} from 'react-native-router-flux';

// import t from 'tcomb-form-native';
// import { ScrollView } from 'react-native-gesture-handler';

// const Form = t.form.Form;

// const Email = t.refinement(t.String, (email) => {
//     const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
//     return reg.test(email);
// });

// const Password = t.refinement(t.String, (password) => {
//     const reg = /^(?=\S+$).{8,}$/;
//     console.log(reg.test(password))
//     return reg.test(password);
// }); 

// const Mobile = t.refinement(t.String, (mobile)=>{
//     const reg = /^\d{10}$/;
//     return reg.test(mobile);
// });


// const User = t.struct({
//    FirstName: t.String,
//   LastName: t.String,
//   email: Email,
//   relationship: t.String,
//   mobile: Mobile,
//   address: t.String,
// });

// const formStyles = {
//   ...Form.stylesheet,
//   formGroup: {
//     normal: {
//       marginBottom: 10
//     },
//   },
//   controlLabel: {
//     normal: {
//       color: 'blue',
//       fontSize: 18,
//       marginBottom: 7,
//       fontWeight: '600'
//     },
//     // the style applied when a validation error occours
//     error: {
//       color: 'red',
//       fontSize: 18,
//       marginBottom: 7,
//       fontWeight: '600'
//     }
//   }
// }

// const options = {
//   fields: {
//     FirstName : {
//         error: 'provide your first name'
//     }  ,
//     LastName : {
//         error: 'provide your last name'
//     }  ,
//     email: {
//       error: 'Without an email address how are you going to reset your password when you forget it?'
//     },
//     mobile: {
//         keyboardType:'numeric',
//         error: 'Please, provide correct phone number',
//     },
//     address: {
//       error: 'Please provide Address'
//     },
//     phoneNumber: {
//         error: 'Please enter valid phone number'
//     },
//     relationship: {
//         error: 'Relationship can not be empty'
//     }
//   },
//   stylesheet: formStyles,
// };

// const _onHome = () =>{

//   setTimeout(() => {
//     Actions.HomeScreen();
//   }, 2300);
// }

// const _onAlert=()=> {
//   setTimeout(() => {
//     //Actions.ChildRegScreen();
//   }, 2300);
// }

// export default class App extends Component { 

//   handleSubmit = () => {
//     const value = this._form.getValue();

//     var token = localStorage.getItem("key");
    
//     ///fetch eka

//     fetch("http://192.168.43.133:3000/users/createContact",{
//       method: "POST",
//       headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//         "Authorization": "Bearer "+token,
//       },
//       body: JSON.stringify({
//         email_address : value.email,
//         first_name: value.FirstName,
//         last_name: value.LastName,
//         address: value.address,
//         phone_number: value.mobile,
//         relationship: value.relationship
//       })

//     })
//     .then(function(response) {
      
//       if(response.status == 201){
//         console.log('done')
//         Alert.alert(
//           "Insertion Success",
//           "Your trusted contact added",
//           [
//             { text: "OK", onPress: _onHome() }
//           ]
//         )
//       }
//       else if(response.status == 409){
//         Alert.alert(
//           "Insertion Failed!",
//           "Email is already used",
//           [
//             { text: "OK",onPress: _onAlert()  }
//           ]
//         )
//       } 
//       else if(response.status == 401){
//         Alert.alert(
//           "Insertion failed Failed!",
//           "Not found",
//           [
//             { text: "OK",onPress: _onAlert()  }
//           ]
//         )
//       }
//       else if(response.status == 403){
//         Alert.alert(
//           "Insertion Failed!",
//           "You are not parent",
//           [
//             { text: "OK",onPress: _onAlert()  }
//           ]
//         )
//       }  
//       else{
//         return response;
//       }

//     }).then(function(response) {
//       return response.json();
//     }).then(function(json) {
//       console.log('Request succeeded with JSON response:', json);
//     }).catch(function(error) {
//       console.log('Request failed:', error);
//     });

//   }
  
//   render() {
//     return (
//       <View style={styles.container}>
//         <ScrollView>
//             <Form 
//             ref={c => this._form = c}
//             type={User} 
//             options={options}
//             />
//             <Button
//             color="#0020C2"
//             title="Add Contact"
//             onPress={this.handleSubmit}
//             />
//         </ScrollView>
        
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     marginTop: 50,
//     padding: 20,
//     backgroundColor: '#ffffff',
//   },
// });


//////////////////////////
// import React, { Component } from "react"
// import { View, Button } from "react-native"

// import TextField from "./textfield"
// import validation from "validation"
// import validate from "./validation_wrapper"

// export default class Form extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       email: "",
//       emailError: "",
//       // password: "",
//       // passwordError: "",
//       firstname: '',
//       firstnameError: '',
//       lastname: "",
//       lastnameError: "",
//       mobile: "",
//       mobileError: "",
//       relationship: "",
//       relationshipError: "",
//     }
//   }

//   validateRegister() {
//     const emailError = validate("email", this.state.email)
//     // const passwordError = validate("password", this.state.password)
//     const firstnameError = validate("firstname", this.state.firstname)
//     const lastnameError = validate("lastname", this.state.lastname)
//     const mobileError = validate("mobile", this.state.mobile)
//     const relationshipError = validate("relationship", this.state.relationship)

//     this.setState({
//       emailError: emailError,
//       firstnameError: firstnameError,
//       lastnameError: lastnameError,
//       mobileError: mobileError,
//       relationshipError: relationshipError
//       // passwordError: passwordError,
//     })

//     if (!emailError && !firstnameError && !lastnameError && !mobileError && !relationshipError) {
//       alert("Details are valid!")
//     }
//   }

//   render() {
//     return (
//       <View>
//         <TextField
//           onChangeText={(value) => this.setState({ email: value.trim() })}
//           onBlur={() => {
//             this.setState({
//               emailError: validate("email", this.state.email)
//             })
//           }}
//           error={this.state.emailError}
//         />

//         {/* <TextField
//           onChangeText={(value) => this.setState({ password: value.trim() })}
//           onBlur={() => {
//             this.setState({
//               passwordError: validate("password", this.state.password)
//             })
//           }}
//           error={this.state.passwordError}
//           secureTextEntry={true}
//         /> */}

//         <TextField
//           onChangeText={(value) => this.setState({ firstname: value.trim() })}
//           onBlur={() => {
//             this.setState({
//               firstnameError: validate("firstname", this.state.firstname)
//             })
//           }}
//           error={this.state.firstnameError}
//         />

//         <TextField
//           onChangeText={(value) => this.setState({ lastname: value.trim() })}
//           onBlur={() => {
//             this.setState({
//               lastnameError: validate("lastname", this.state.lastname)
//             })
//           }}
//           error={this.state.lastnameError}
//         />

//         <TextField
//           onChangeText={(value) => this.setState({ mobile: value.trim() })}
//           onBlur={() => {
//             this.setState({
//               mobileError: validate("mobile", this.state.mobile)
//             })
//           }}
//           error={this.state.mobileError}
//         />

//         <TextField
//           onChangeText={(value) => this.setState({ relationship: value.trim() })}
//           onBlur={() => {
//             this.setState({
//               relationshipError: validate("email", this.state.relationship)
//             })
//           }}
//           error={this.state.relationshipError}
//         />

//         <Button title="Register" onPress={this.validateRegister} />
//       </View>
//     )
//   }
// }


import React, { Component } from 'react'
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native'
import {Actions, ActionConst} from 'react-native-router-flux'

export default class addContact extends Component {

  state = {
    firstname: '',
    lastname: '',
    email: "",
    mobile: "",
    relationship: "",
    address: '',
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
