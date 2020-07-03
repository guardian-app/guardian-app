import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    Logo,
    Header,
    Paragraph,
    Button,
    Background
} from '../components';
import { Navigation } from '../types';
import { userLogout } from '../actions';

type Props = {
    navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const logout = useCallback(
        () => dispatch(userLogout()),
        [dispatch]
    );

    return (
        <Background>
            <Logo />
            <Header>Child Dashboard</Header>
            <Paragraph>
                Your amazing app starts here. Open you favourite code editor and start
                editing this project.
            </Paragraph>
            <Button mode="outlined" onPress={logout}>
                Logout
            </Button>
        </Background>
    );
};

export default Dashboard;