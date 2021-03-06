import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToastAndroid, StyleSheet,Image, ScrollView, Platform, Animated, Easing, Text, View, Alert, TouchableOpacity, Button,ListView} from 'react-native';
import 'localstorage-polyfill';
import Axios from 'axios';
import { Content, Header, Form, Input, Item,ListItem,Icon,  Label, List} from 'native-base'; 

import routes from '../routes';

import Container from '../Container';
// import List from "../List/index";
// import Tool from '../Toolbars/index';
// import Draw from '../Drawer/index';
// //import Dialog from '../Dialog/index';
// import Radio from '../RadioButton/index';
// import ButtonPress from '../components/home/index';
import Dialog from '../components/home/dialog';

// components
import {
    ActionButton,
    Avatar,
    //ListItem,
    Toolbar,
    BottomNavigation,
    //Icon,
    Subheader,
    // Button, 
} from 'react-native-material-ui/src';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import {Actions, ActionConst} from 'react-native-router-flux';
import { red100 } from 'react-native-material-ui/src/styles/colors';

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
        //this.db = new ListView.DataSource({ rowHasChanged: (r1, r2 => r1 !== r2)  })

        this.state = {
            selected: [],
            children: [],
            searchText: '',
            active: '',
            moveAnimated: new Animated.Value(0),
            loading: false,
            
        };
    }
    
    async componentDidMount(){

        let token = localStorage.getItem("key");
        
        if(!localStorage.getItem("key")){
            Actions.LoginScreen();
        }

       let parent_id = localStorage.getItem("user_id");

        console.log('mount');
        Axios.get('http://192.168.43.133:3000/parents/'+parent_id+'/children',{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token,
            },
        })
        .then(res => {
            this.setState({loading: true});
            const data = res.data;

            setTimeout(()=> this.setState({
                loading: false,
                children: data
            }), 100)

            
        }).catch = (e) => {
            console.error('error ',e)
        }
    }

    removeChild = (child_id) =>{
        let token = localStorage.getItem("key");
        Axios.post("http://192.168.43.133:3000/"+child_id,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token,
            },
        })
        .then(res => {
            Alert("Deleted");
        }).catch(error => {
            console.log("error ",error);
        })
    }

    onChild = (child_id) => {
        
        localStorage.setItem("child_id", child_id);
        

        Alert.alert(
            'Menu',
            'Make your choice',
            [
              
              {text: 'Cancel', onPress: () => {},  style: 'cancel'},
              {text: 'Child location', onPress: () => {Actions.ChildLocation()}},
              {text: 'Today report', onPress: () => {Actions.ChildRecordScreen()}},
              {text: 'Remove Child', onPress: () => {this.removeChild(child_id)}},
            
            ]
        )      
        console.log('pppp')

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
                onLeftElementPress={() => {Actions.FrontScreen()}}
                //onLeftElementPress={() => {}}
                centerElement="Parent"
                
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

        const run =() =>{
            this.setState({ active: 'Logout' })
            localStorage.setItem("key", "");
            localStorage.setItem("role","")
            localStorage.setItem("id","");
            console.log(localStorage.getItem("key"));
            Actions.LoginScreen();
        }

        const onPressProfile = () => {
            this.setState({ active: 'profile' })
            var id = localStorage.getItem("key");
            console.log("FUCK ID",id);

            Actions.ProfileScreen();
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
            Alert.alert(
                'Menu',
                'Make your choice',
                [
                
                    {text: 'Cancel', onPress: () => {},  style: 'cancel'},
                    {text: 'Add Contact', onPress: () => {Actions.ContactAddScreen()}},
                    {text: 'View Contacts', onPress: () => {Actions.ViewTrustedContactScreen()}},
                
                ]
            )
        }

        const  onPressLocation = () => {
            //this.setState({ active: 'location' })
            Actions.Location1();
        }

        const childAdd =(action) => {
            console.log('fuck');
            Actions.ChildRegScreen();
        }

        return (
            <Container >
                
                {this.renderToolbar()}
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode="interactive"
                    onScroll={this.onScroll}
                    //onPress={run()}
                >
                    <Dialog/>
                    <Text style={styles.titleText}>YOUR CHILDREN</Text>
                    {this.state.children.map((appoints) => (
                         <View    >
                            
                             {/* <Text></Text> 
                             <Text></Text> */}
                          {/* //  <Button 
                        //         style={{marginHorizontal: 100, paddingBottom: 10,}} 
                        //         title={appoints.first_name+" "+appoints.last_name}
                        //         onPress = {()  => this.onChild(appoints.user_id)}
                           //     /> */}
                            
                                <ListItem  >
                                <Image source={require('../image/iconchild.jpg')} style={{height:20, width: 20}} />
                                    <TouchableOpacity onPress = {()  => this.onChild(appoints.user_id)}  >
                                        
                                        <Text style={{fontWeight:"bold", color:"grey"}}>{appoints.first_name+" "+appoints.last_name}</Text>
                                    </TouchableOpacity>
                                </ListItem>
                                
                                                    
                         </View>

                        
                    ))}
                        {/* <Content>
                            <List
                                dataSource={this.db.cloneWithRows(this.state.children)}
                                renderRow={data =>
                                    <ListItem>
                                        <Text>{data.first_name} {data.last_name}</Text>
                                    </ListItem>
                                }
                            />
                        </Content> */}
                    
                    {/* <ButtonPress/> */}
                    
                </ScrollView>
                <ActionButton
                    actions={[
                        //{ icon: 'email', label: 'Email' },
                        {label: "back to home"}
                    ]}
                    hidden={this.state.bottomHidden}
                    icon="add"
                    transition="speedDial"
                    onPress={childAdd}
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

export default Home;
