import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

import {Actions, ActionConst} from 'react-native-router-flux';
import axios, * as others from 'axios';

export default class tableViewContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            locationData: [],
        }
    }

    async componentDidMount() {

        let token = localStorage.getItem("key");

        if(!localStorage.getItem("key")){
            Actions.LoginScreen();
        }
        axios.get('http://192.168.43.133:3000/',{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token,
            },
        })
        .then(res => {
            console.log('cncncnc')
            this.setState({loading: true});
            const data = res.data;

            if(res.status == 404){
                console.log('fsdff')
                Alert.alert('you child not login today')
                Actions.HomeScreen();
            }

            const result = Object.keys(data).map((key) => data[key]);

            var myArr = []

            for(let i = 0; i< data.length; i++){

                 myArr.push([data[i].timestamp,data[i].latitude,data[i].longitude]);
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
                                        {/* <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
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
                                        </Table> */}
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