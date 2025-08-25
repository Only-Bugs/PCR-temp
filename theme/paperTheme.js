import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.eco.green[500],
    secondary: colors.eco.purple,
    background: colors.neutral.gray50,
    surface: colors.neutral.white,
    text: colors.neutral.gray900,
    outline: colors.neutral.gray200,
  },
  fonts: {
    ...DefaultTheme.fonts,
    bodyLarge: { fontFamily: typography.fontFamily, fontSize: 16 },
    bodyMedium: { fontFamily: typography.fontFamily, fontSize: 14 },
    bodySmall: { fontFamily: typography.fontFamily, fontSize: 12 },
    titleLarge: {
      fontFamily: typography.fontFamily,
      fontSize: 20,
      fontWeight: '700',
    },
    titleMedium: {
      fontFamily: typography.fontFamily,
      fontSize: 18,
      fontWeight: '600',
    },
    titleSmall: {
      fontFamily: typography.fontFamily,
      fontSize: 16,
      fontWeight: '600',
    },
  },
  spacing, // keep tokens available for custom components
};

export default paperTheme;
