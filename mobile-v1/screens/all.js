import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToastAndroid, ScrollView, Platform, Animated, Easing } from 'react-native';
import { connect } from 'react-redux';
import 'localstorage-polyfill';
import {Actions, ActionConst} from 'react-native-router-flux';

import routes from '../routes';

import Container from '../Container';
import List from "../List/index";
// components
import {
    ActionButton,
    Avatar,
    ListItem,
    Toolbar,
    BottomNavigation,
    Icon,
} from 'react-native-material-ui/src';
import { createIconSetFromFontello } from 'react-native-vector-icons';

const UP = 1;
const DOWN = -1;

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.offset = 0;
        this.scrollDirection = 0;

        this.state = {
            selected: [],
            searchText: '',
            active: 'people',
            moveAnimated: new Animated.Value(0),
        };
    }

    componentDidMount(){
        console.log('eeeeeeeeeeeeeeeeee');
        console.log(localStorage.getItem("key"));
        

        if(!localStorage.getItem("key")){
            Actions.LoginScreen();
        }

        
        var url = 'http://192.168.43.133:3000/users/me';
        var token = localStorage.getItem("key");
        console.log('nnn');
        console.log(token);
        console.log('mmm')


        fetch(url,{
            method: "GET",
            headers: {
                // "Accept": "application/json",
                // "Content-Type": "application/json",
                "Authorization": "Bearer "+token,
                
            },
            })
            .then(function(response) {
            
            console.log("ttttttttttttttttttt")
            console.log(response.status);
            if(response.status == 409){
                Alert.alert(
                "Registration Failed!",
                "Email is already used",
                [
                    { text: "OK",onPress: _onAlert()  }
                ]
                )
            } 
            else if(response.status == 401){

            }
            else if(response.status == 403){

            }
            else{
                return response;
            }

            // if (response.ok) {
            //   console.log("ok",response.ok,"ok")
            //   return response;
            // }
            
            // throw Error(response.statusText);
            }).then(function(response) {
            return response.json();
            }).then(function(json) {
            console.log('Request succeeded with JSON response:', json);
            }).catch(function(error) {
            console.log('Request failed:', error);
            });

    }

    

    onAvatarPressed = (value) => {
        console.log('Avatar');
        console.log('Avatarqqqqqqqqqq');
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
                leftElement="menu"
                onLeftElementPress={() => this.props.navigation.FrontScreen()}
                centerElement="Home"
                searchable={{
                    autoFocus: true,
                    placeholder: 'Search',
                    onChangeText: value => this.setState({ searchText: value }),
                    onSearchClosed: () => this.setState({ searchText: '' }),
                }}
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
                divider
                leftElement={<Avatar text={title[0]} />}
                onLeftElementPress={() => this.onAvatarPressed(title)}
                centerElement={title}
                onPress={() => this.props.navigation.navigate(route)}
            />

        );
    }
    render() {

        const run =() =>{
            console.log("run")
        }

        return (
            <Container>
                {this.renderToolbar()}
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="interactive"
                    onScroll={this.onScroll}
                    onPress={run()}
                >
                    {this.renderItem('Action button', 'actionButton') }
                    {this.renderItem('Avatars', 'avatar')}
                    {this.renderItem('Badge', 'badge')}
                    {this.renderItem('Bottom navigation', 'bottomNavigation')}
                    {this.renderItem('Buttons', 'button')}
                    {this.renderItem('Cards', 'card')}
                    {this.renderItem('Checkbox', 'checkbox')}
                    {this.renderItem('Dialog', 'dialog')}
                    {this.renderItem('Drawer', 'drawer')}
                    {this.renderItem('Icon toggles', 'iconToggle')}
                    {this.renderItem('List items', 'list')}
                    
                </ScrollView>
                <ActionButton
                    actions={[
                        { icon: 'email', label: 'Email' },
                        { icon: 'phone', label: 'Phone' },
                        { icon: 'sms', label: 'Text' },
                        { icon: 'favorite', label: 'Favorite' },
                    ]}
                    hidden={this.state.bottomHidden}
                    icon="share"
                    transition="speedDial"
                    onPress={(action) => {
                        if (Platform.OS === 'android') {
                            ToastAndroid.show(action, ToastAndroid.SHORT);
                        }
                    }}
                    style={{
                        positionContainer: { bottom: 76 },
                    }}
                />
                <BottomNavigation
                    active={this.state.active}
                    hidden={this.state.bottomHidden}
                    style={{ container: { position: 'absolute', bottom: 0, left: 0, right: 0 } }}
                >
                    <BottomNavigation.Action
                        key="today"
                        icon={<Icon name="today" />}
                        label="Today"
                        onPress={() => this.setState({ active: 'today' })}
                    />
                    <BottomNavigation.Action
                        key="profile"
                        icon="profile"
                        label="Profile"
                        onPress={() => this.setState({ active: 'profile' })}
                    />
                    <BottomNavigation.Action
                        key="bookmark-border"
                        icon="bookmark-border"
                        label="Bookmark"
                        onPress={() => this.setState({ active: 'bookmark-border' })}
                    />
                    <BottomNavigation.Action
                        key="settings"
                        icon="settings"
                        label="Settings"
                        onPress={() => this.setState({ active: 'settings' })}
                    />
                </BottomNavigation>
            </Container>


        );
    }
}

Home.propTypes = propTypes;

export default Home;
