import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';



import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import SecondScreen from './screens/secondScreen';
import FrontScreen from './screens/frontScreen';
import RegistrationScreen from './screens/registrationScreen';
import ChildRegScreen from './screens/childRegisterScreen';
import ChildLogScreen from './screens/ChildLogScreen';
import ProfileScreen from './screens/profileScreen';
import RestScreen from './screens/resetScreen';
import ChildRecordScreen from './screens/childRecordScreen';


import Location1 from './screens/location1';
import Location2 from './screens/location2';
import ChildLocation from './screens/childLocation';
import All from './screens/all';

const Stack = createStackNavigator();


export default function App() {
  return (
    // <View style={styles.screen}>
      
    //   <NavigationContainer>
    //     <Stack.Navigator>

    //       <Stack.Screen
    //         name= "FrontScreen"
    //         component= {FrontScreen}
    //         options={{ title: '',
    //          headerStyle: {
    //            height: 0,
    //           backgroundColor: "#4CBBB9",
    //         },
    //         headerTintColor: "black",
    //         headerTitleStyle: {
    //           fontWeight: "bold",
    //           fontSize: 30,
    //         },
    //         headerTitleAlign: "center",
    //       }}
    //       /> 

    //        <Stack.Screen
    //         name= "LoginScreen"
    //         component= {LoginScreen}
    //         options={{ title: '',
    //          headerStyle: {
    //            height: 0,
    //           backgroundColor: "#4CBBB9",
    //         },
    //         headerTintColor: "black",
    //         headerTitleStyle: {
    //           fontWeight: "bold",
    //           fontSize: 30,
    //         },
    //         headerTitleAlign: "center",
    //       }}
    //       /> 

    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </View>


    <Router>
	      <Scene key="root">
        <Scene key="FrontScreen"
	          component={FrontScreen}
	          animation='fade'
            hideNavBar={true}
            initial={true}
	        />
	        <Scene key="LoginScreen"
	          component={LoginScreen}
	        	animation='fade'
	          hideNavBar={true}
	          
	        />
	        <Scene key="HomeScreen"
	          component={HomeScreen}
	          animation='fade'
	          hideNavBar={true}
	        />
          <Scene key="RegistrationScreen"
	          component={RegistrationScreen}
	          animation='fade'
	          hideNavBar={true}
	        />

          <Scene key="Location1"
	          component={Location1}
	          animation='fade'
	          hideNavBar={true}
	        />
          
          <Scene key="Location2"
	          component={Location2}
	          animation='fade'
	          hideNavBar={true}
	        />

          <Scene key="All"
	          component={All}
	          animation='fade'
	          hideNavBar={true}
	        />

          <Scene key="ChildRegScreen"
	          component={ChildRegScreen}
	        	animation='fade'
	          hideNavBar={true}
	          
	        />

          <Scene key="ChildLogScreen"
	          component={ChildLogScreen}
	        	animation='fade'
	          hideNavBar={true}
	        />

          <Scene key="ProfileScreen"
	          component={ProfileScreen}
	        	animation='fade'
	          hideNavBar={true}
	          
	        />

          <Scene key="ChildLocation"
	          component={ChildLocation}
	        	animation='fade'
	          hideNavBar={true}
	          
	        />

          <Scene key="ResetScreen"
	          component={RestScreen}
	        	animation='fade'
	          hideNavBar={true}
	          
	        />

          <Scene key="ChildRecordScreen"
	          component={ChildRecordScreen}
	        	animation='fade'
	          hideNavBar={true}
	          
	        />

	      </Scene>
	    </Router>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    //backgroundColor: '#708160',
    backgroundColor: 'red',
    
  },
  title: {
    color: 'red',
    fontSize: 20,
    marginVertical: 10,
    alignItems: 'center'
  }
});
