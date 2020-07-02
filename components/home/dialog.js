import { View, StyleSheet, Text } from 'react-native';
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import { Dialog, DialogDefaultActions, Toolbar } from 'react-native-material-ui';
import Container from '../../Container';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};

class DialogSpec extends Component {
    constructor(props) {
        super(props);

        this.state = { checked: false };
    }
    render() {
        return (
            <Container>  
                <View style={styles.container}>
                    <Dialog>
                        <Dialog.Title><Text>Guidelines</Text></Dialog.Title>
                        <Dialog.Content>
                            <Text>
                                You can track your child's location history through this.
                                You have to allow location permissions on your children's device.
                                If you want to get locations with high accuracy, 
                                you have to have a good internet connection on both devices
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                           
                        </Dialog.Actions>
                    </Dialog>
                </View>
            </Container>
        );
    }
}

DialogSpec.propTypes = propTypes;

export default DialogSpec;
