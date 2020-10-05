import { View, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Button, Subheader, Toolbar } from 'react-native-material-ui';
import Container from '../../Container';

const styles = StyleSheet.create({
    rowContainer: {
        paddingTop: 100,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        marginHorizontal: 8,
    },
    container: {
        
        //flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};

class ButtonPage extends Component {
    render() {
        return (
            <Container style={styles.container}>

                <Subheader text="Your children" />
                <View style={styles.rowContainer}>
                    <View style={styles.button}>
                        <Button raised primary text="Children" />
                    </View>
                    <View style={styles.button}>
                        <Button raised accent text="Accent" />
                    </View>
                </View>
                
            </Container>
        );
    }
}

ButtonPage.propTypes = propTypes;

export default ButtonPage;
