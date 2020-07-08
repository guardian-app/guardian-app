import React, { Component } from 'react';
import { View, StyleSheet, Button,Alert,Animated,Easing } from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

import t from 'tcomb-form-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends Component { 

 
  
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
