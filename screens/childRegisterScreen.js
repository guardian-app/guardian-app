// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import Back from '../components/registration/regback';
// import Form from '../components/registration/parentreg';


// export default class RegistrationScreen extends Component {
//   render() {
//     return (
//       <Back>
//       </Back>
//     );
//   }
// }

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ToastAndroid, ScrollView, Platform, Animated, Easing } from 'react-native';

//import routes from '../routes';

import Container from '../Container';
// components
import {
    ActionButton,
    Avatar,
    ListItem,
    Toolbar,
    BottomNavigation,
    Icon,
} from 'react-native-material-ui/src';

import ChildReg from "../components/registration/childReg";
import { Actions } from 'react-native-router-flux';

const UP = 1;
const DOWN = -1;

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class RegBack extends Component {
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
        if(!localStorage.getItem("key")){
            Actions.LoginScreen();
        }
    }

    onAvatarPressed = (value) => {
        const { selected } = this.state;

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

        console.log(this.props.navigation)
        return (
            <Toolbar
                key="toolbar"
                leftElement="arrow-back"
                onLeftElementPress={() => this.props.navigation.goBack()}
                centerElement="Child Registration"
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
        return (
            <Container>
                {this.renderToolbar()}
                <ScrollView
                    //keyboardShouldPersistTaps="always"
                    //keyboardDismissMode="interactive"
                    //onScroll={this.onScroll}
                >
                    <ChildReg/>
                </ScrollView>
                
            </Container>

        );
    }
}

RegBack.propTypes = propTypes;

export default RegBack;
