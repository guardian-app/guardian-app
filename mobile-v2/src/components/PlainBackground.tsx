import React, { memo } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

type Props = {
    children: React.ReactNode;
};

const PlainBackground = ({ children }: Props) => (
    <View style={styles.container}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
});

export default memo(PlainBackground);