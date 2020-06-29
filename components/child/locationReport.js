import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
//import {axios} from 'axios';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios, * as others from 'axios';
import Geocoder from 'react-native-geocoding';
//import { Table, TableWrapper, Row } from 'react-native-table-component';

export default class tableExample extends Component {
constructor(props) {
    super(props);
    this.state = {
        loading: false,
        headerData:  ["Time Stamp","Latitude", "Longitude"],
        tableContents: [
        ["ranjan", "30", "male", "Chennai"],
        ["Ajay", "29", "male", "Mumbai",],
        ["vijay", "29", "male", "Mumbai",],
        ["Suraj", "24", "male", "Kolkata",],
        ["Akash", "27", "male", "Mumbai",],
        ["Alka", "29", "female", "Delhi",] ],
        locationData: [],
        address: "",
        widthArr: [150, 100, 150],




    
    }
    }

    getData(la,lo){
        Geocoder.init("AIzaSyCByfizTIm7VD9eaxjq30oN_N5Zcjd09Zw");
       
        Geocoder.from(la, lo)
        .then(json => {
                
                var addressComponent = json.results[0].formatted_address;
                var addressComponent1 = json.results[0].address_components[1]
                var addressComponent2 = json.results[0].address_components[2]
                var addressComponent3 = json.results[0].address_components[3]
                var addressComponent4 = json.results[0].address_components[4]
                var addressComponent5 = json.results[0].address_components[5]
                var addressComponent6 = json.results[0].address_components[6]
            console.log(addressComponent);
            alert(addressComponent)
            this.setState({
                address:addressComponent.long_name
            })
        })
        .catch(error => console.warn(error,"i am error"))
    }

    async componentDidMount() {

        let token = localStorage.getItem("key");

        if(!localStorage.getItem("key")){
            Actions.LoginScreen();
        }

        let child_id = localStorage.getItem("child_id");
        console.log('oadpvdknvne')
        console.log(child_id);

        axios.get('http://192.168.43.133:3000/location/'+child_id+'/history',{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token,
            },
        })
        .then(res => {
            console.log('response come');
            this.setState({loading: true});
            const data = res.data;

            const result = Object.keys(data).map((key) => data[key]);
            console.log(result[0])

            var myArr = []

            for(let i = 0; i< data.length; i++){

                 myArr.push([data[i].timestamp,data[i].latitude,data[i].longitude]);
            }

            console.log(this.state.address)
            console.log('l');

            for(let x of myArr){
                console.log(x);
            }
            
            setTimeout(()=> this.setState({
                loading: false,
                locationData: myArr,
            }), 1000)

        }).catch = (e) => {
            console.error('error ',e)
        }
        
        
    }

    render() {
        const state = this.state;
        return (
            <View style={{marginHorizontal: 10}} >
                <View style = {styles.container}>
                            <ScrollView horizontal = {true} style  ={{flex: 1, marginTop: 10}} >
                                <View>
                                    <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                        <Row data={state.headerData} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
                                    </Table>
                                    <ScrollView horizontal = {false} style={styles.dataWrapper}>
                                        <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                            {this.state.locationData.map((appoints, i) => (
                                                <TouchableOpacity onPress = {()  => this.getData(this.state.locationData[i][1],this.state.locationData[i][2])} >
                                                    <Text></Text>
                                                    <Row 
                                                        key = {i}  
                                                        data = {appoints}
                                                        widthArr={this.state.widthArr}
                                                        style={[styles.row, i%2 && {backgroundColor: '#F7F6E7'}]}
                                                        textStyle={styles.text}
                                                    />
                                                </TouchableOpacity>
                                            ))}
                                        </Table>
                                    </ScrollView>
                                </View>
                            </ScrollView>
                    </View>        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' 
    },
    header: { 
        height: 50, backgroundColor: '#537791' 
    },
    text: { 
        textAlign: 'center', fontWeight: '100' 
    },
    dataWrapper: { 
        marginTop: -1 
    },
    row: { 
        height: 40, backgroundColor: '#E7E6E1' 
    }
})