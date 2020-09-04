import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToastAndroid, StyleSheet, ScrollView, Platform, Animated, Easing, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import 'localstorage-polyfill';
import Axios from 'axios';

import routes from '../routes';

import Container from '../Container';
import List from "../List/index";
import Tool from '../Toolbars/index';
import Draw from '../Drawer/index';
//import Dialog from '../Dialog/index';
import Radio from '../RadioButton/index';
import ButtonPress from '../components/home/index';
import Dialog from '../components/home/dialog';
import Data from '../components/contact/viewContact';

// components
import {
    ActionButton,
    Avatar,
    ListItem,
    Toolbar,
    BottomNavigation,
    Icon,
    Subheader,
    // Button, 
} from 'react-native-material-ui/src';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import {Actions, ActionConst} from 'react-native-router-flux';

const UP = 1;
const DOWN = -1;

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class ViewTrustedContactScreen extends Component {
    constructor(props) {
        super(props);

        this.offset = 0;
        this.scrollDirection = 0;

        this.state = {
            selected: [],
            children: [],
            searchText: '',
            active: 'people',
            moveAnimated: new Animated.Value(0),
            loading: false,
            
        };
    }
    
    async componentDidMount(){

        this.setState({ active: 'emergency' });

        let token = localStorage.getItem("key");
        
        if(!localStorage.getItem("key")){
            Actions.LoginScreen();
        }
    }

    onAvatarPressed = (value) => {

        const { selected } = this.state;
        console.log(selected);
        const index = selected.indexOf(value);

        if (index >= 0) {
            // remove item
            selected.splice(index, 1);
        } else {
            // add item
            selected.push(value);
        }

        this.setState({ selected });
    }
    onScroll = (ev) => {
        const currentOffset = ev.nativeEvent.contentOffset.y;

        const sub = this.offset - currentOffset;

        // don't care about very small moves
        if (sub > -2 && sub < 2) {
            return;
        }

        this.offset = ev.nativeEvent.contentOffset.y;

        const currentDirection = sub > 0 ? UP : DOWN;

        if (this.scrollDirection !== currentDirection) {
            this.scrollDirection = currentDirection;

            this.setState({
                bottomHidden: currentDirection === DOWN,
            });
        }
    }
    show = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    hide = () => {
        Animated.timing(this.state.moveAnimated, {
            toValue: 56, // because the bottom navigation bar has height set to 56
            duration: 195,
            easing: Easing.bezier(0.4, 0.0, 0.6, 1),
            useNativeDriver: Platform.OS === 'android',
        }).start();
    }
    renderToolbar = () => {
        if (this.state.selected.length > 0) {
            return (
                <Toolbar
                    key="toolbar"
                    leftElement="clear"
                    onLeftElementPress={() => this.setState({ selected: [] })}
                    centerElement={this.state.selected.length.toString()}
                    rightElement={['delete']}
                    style={{
                        container: { backgroundColor: 'white' },
                        titleText: { color: 'rgba(0,0,0,.87)' },
                        leftElement: { color: 'rgba(0,0,0,.54)' },
                        rightElement: { color: 'rgba(0,0,0,.54)' },
                    }}
                />
            );
        }

        return (
            <Toolbar
                key="toolbar"
                leftElement="arrow-back"
                onLeftElementPress={() => {Actions.HomeScreen()}}
                //onLeftElementPress={() => {}}
                centerElement="Your Trusted Contact"
            />
        );
    }
    renderItem = (title, route) => {
        const searchText = this.state.searchText.toLowerCase();

        if (searchText.length > 0 && title.toLowerCase().indexOf(searchText) < 0) {
            return null;
        }

        return (
            <ListItem
                
            />
        );
    }
    render() {

        const run = () => {
            this.setState({ active: 'Logout' })
            localStorage.setItem("key", "");
            localStorage.setItem("role","")
            localStorage.setItem("id","");
            console.log(localStorage.getItem("key"));
            Actions.LoginScreen();
        }

        const onPressProfile = () => {
            this.setState({ active: 'profile' })
        }

        const onPressLogout =() => {
            this.setState({ active: 'Logout' })
            Alert.alert(
                'Confirmed',
                'Are you sure to logout?',
                [
                
                    {text: 'Cancel', onPress: () => {Actions.HomeScreen()},  style: 'cancel'},
                    {text: 'Logout', onPress: () => {run()}},
                   
                
                ]
            )
        } 

        const onPressEmergency = () => {
            this.setState({ active: 'emergency' });
        }

        const  onPressLocation = () => {
            this.setState({ active: 'location' })
            Actions.Location1();
        }

        return (
            <Container >
                
                {this.renderToolbar()}
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="interactive"
                    onScroll={this.onScroll}
                    
                >
                    
                    <Data/>
                    
                </ScrollView>

                <BottomNavigation
                    active={this.state.active}
                    hidden={this.state.bottomHidden}
                    style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0 } }}
                >
                    <BottomNavigation.Action
                        key="location"
                        //icon={<Icon name="today" />}
                        icon="place"
                        label="My Location"
                        onPress={onPressLocation}
                    />
                    <BottomNavigation.Action
                        key="profile"
                        icon="people"
                        label="Profile"
                        onPress={onPressProfile}
                    />
                    <BottomNavigation.Action
                        key="emergency"
                        icon="call"
                        label="Emergency Contact"
                        onPress={onPressEmergency}
                    />
                    <BottomNavigation.Action
                        key="Logout"
                        icon="stop"
                        label="Logout"
                        onPress={onPressLogout}
                    />
                </BottomNavigation>
            </Container>
            

        );
    }
}

Home.propTypes = propTypes;

const styles = StyleSheet.create({
    baseText: {
        fontFamily: "Cochin",
        backgroundColor: "red",
        width: 250,
        marginLeft: 55,
        marginHorizontal: 100,
      },
      titleText: {
        paddingLeft: 50,
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 10,
        marginHorizontal: 10,
        paddingTop: 50,
      }
})

export default ViewTrustedContactScreen;
