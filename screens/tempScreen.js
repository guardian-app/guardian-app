import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { ListItem, Toolbar,ActionButton } from 'react-native-material-ui';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

const TempScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
           
            <ActionButton
                    actions={['email', { icon: 'phone', label: 'Phone' }, 'sms', 'favorite']}
                    icon="share"
                    transition="speedDial"
                />    
            <Toolbar
                leftElement="arrow-back"
                onLeftElementPress={() => navigation.goBack()}
                centerElement="Action buttons"
            />
            <ListItem
                divider
                centerElement="With toolbar transition"
                onPress={() => this.props.navigation.navigate('actionButtonToolbar')}
            />
            <ListItem
                divider
                centerElement="With speed dial transition"
                onPress={() => this.props.navigation.navigate('actionButtonSpeedDial')}
            />
        </View>
    );
}

TempScreen.propTypes = propTypes;

export default TempScreen;
//export default TempScreen;