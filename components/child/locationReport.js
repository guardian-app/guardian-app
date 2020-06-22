import React, { Component } from 'react';
import { View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
//import {axios} from 'axios';
import {Actions, ActionConst} from 'react-native-router-flux';
import axios, * as others from 'axios';
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

    componentDidMount() {

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
            console.log('pp')
            this.setState({loading: true});
            const data = res.data;

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