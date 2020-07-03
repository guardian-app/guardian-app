import { DefaultTheme } from 'react-native-paper';
import { default as colors } from './colors';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        secondary: colors.secondary,
        error: colors.error,
    }
};

export default theme;