import React, { memo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
    FAB,
    TouchableRipple,
    Button,
    Menu,
    Divider,
    Provider,
    Appbar,
    List
} from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    PlainBackground,
    Background,
    Header,
    Paragraph
} from '../components';
import { User, Navigation } from '../types';
import { childFetch, userLogout } from '../actions';
import { colors } from '../styles';

type Props = {
    navigation: Navigation;
};

const ChildrenList = ({ children, navigation }: Props & { children: User[] }) => {
    const listItems = children.map(child =>
        <TouchableRipple
            onPress={() => navigation.navigate("ChildMapScene", { user_id: child.user_id })}
            rippleColor="rgba(0, 0, 0, .32)"
            key={child.user_id}>
            <List.Item
                title={`${child.first_name} ${child.last_name}`}
                description={child.email_address}
                left={props => <List.Icon {...props} icon="account-child" />}
            />
        </TouchableRipple>
    );

    const placeholder = (
        <Background>
            <Header>Welcome!</Header>
            <Paragraph>
                Create accounts for your children to continue.
            </Paragraph>
        </Background>
    );

    return children.length ? <>{listItems}</> : placeholder;
};

const ParentChildren = ({ navigation }: Props) => {
    const _handleSearch = () => console.log('Searching');
    const _handleMore = () => console.log('Shown more');

    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const children = useSelector((state: any) => state.childReducer.children);

    const dispatch = useDispatch()

    const _childFetch = useCallback(
        () => dispatch(childFetch()),
        [dispatch]
    );

    const logout = useCallback(
        () => dispatch(userLogout()),
        [dispatch]
    );

    useEffect(() => {
        _childFetch();
    }, []);

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="My Children" />
                <Appbar.Action icon="magnify" onPress={_handleSearch} />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="dots-vertical" color="white" onPress={openMenu} />}>
                    <Menu.Item onPress={logout} title="Logout" />
                </Menu>
            </Appbar.Header>

            <PlainBackground>
                <ChildrenList children={children} navigation={navigation} />
            </PlainBackground>

            <FAB
                style={styles.fab}
                icon="plus"
                color={colors.ultralight}
                onPress={() => navigation.navigate("AddChildScene")}
            />

            <StatusBar style="light" />
        </>
    );
};


const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 48,
        right: 0,
        bottom: 0,
        backgroundColor: colors.light
    },
});

export default memo(ParentChildren);