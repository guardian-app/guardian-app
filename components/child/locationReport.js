import React, { Component } from 'react';
import { View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
//import {axios} from 'axios';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios, * as others from 'axios';
import Geocoder from 'react-native-geocoding';

export default class tableExample extends Component {
constructor(props) {
    super(props);
    this.state = {
        headerData:  ["username", "age", "sex", "location"],
        tableContents: [
        ["ranjan", "30", "male", "Chennai"],
        ["Ajay", "29", "male", "Mumbai",],
        ["vijay", "29", "male", "Mumbai",],
        ["Suraj", "24", "male", "Kolkata",],
        ["Akash", "27", "male", "Mumbai",],
        ["Alka", "29", "female", "Delhi",] ] }
    }

    getData(){
        Geocoder.init("AIzaSyCByfizTIm7VD9eaxjq30oN_N5Zcjd09Zw");
        //Geocoder.setApiKey("AIzaSyAjoHv0BU_FcJgYz2f2dwUG0LogpVKOLuk");

        Geocoder.from(6.927079, 79.861244)
        .then(json => {
                var addressComponent = json.results[0].address_components[0];
                var addressComponent1 = json.results[0].address_components[1]
                var addressComponent2 = json.results[0].address_components[2]
                var addressComponent3 = json.results[0].address_components[3]
                var addressComponent4 = json.results[0].address_components[4]
                var addressComponent5 = json.results[0].address_components[5]
                var addressComponent6 = json.results[0].address_components[6]
            console.log(addressComponent.long_name);
            console.log(addressComponent1.long_name);
        })
        .catch(error => console.warn(error,"i am error"));

       
    }

    componentDidMount() {

        let token = localStorage.getItem("key");

        if(!localStorage.getItem("key")){
            Actions.LoginScreen();
        }

        this.getData();

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
            console.log('ppppppppppppp')
            this.setState({loading: true});
            const data = res.data;
            console.log(data[10]);
            console.log('till')

            setTimeout(()=> this.setState({
                loading: false,
                children: data
            }), 100)

            console.log(this.state.children);
        }).catch = (e) => {
            console.error('error ',e)
        }
        
    }

    render() {
        const state = this.state;
        return (
            <View style={{marginHorizontal: 10}} >
                <Table>
                    <Row data={state.headerData}/>
                    <Rows data={state.tableContents}/>
                </Table>
            </View>
        )
    }
}