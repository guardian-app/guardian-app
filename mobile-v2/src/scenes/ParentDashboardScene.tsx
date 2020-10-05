import React, { useCallback } from 'react';
import { BottomNavigation, } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { default as ParentChildrenScene } from './ParentChildrenScene';
import { default as ParentProfileScene } from './ParentProfileScene';
import { Navigation } from '../types';
import { userLogout } from '../actions';

type Props = {
    navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => {
    const dispatch = useDispatch()
    const logout = useCallback(
        () => dispatch(userLogout()),
        [dispatch]
    );

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'children', title: 'Children', icon: 'account-child' },
        { key: 'profile', title: 'Profile', icon: 'account' },
    ]);

    const renderScene = ({ route, jumpTo }: any) => {
        switch (route.key) {
            case 'children':
                return <ParentChildrenScene navigation={navigation} />;
            case 'profile':
                return <ParentProfileScene navigation={navigation} />;
        };
    };

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            sceneAnimationEnabled={true}
        />
    );
};

export default Dashboard;