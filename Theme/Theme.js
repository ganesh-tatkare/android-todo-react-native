import { DefaultTheme } from 'react-native-paper';

export const lightTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#282928', // for text
    accent: '#666678', //action keys
    background:"#e3e3e1", //for background
    similar:"#FFFFFF",
    contrast:"#000000",
  },
};

export const darkTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fffefa', // for text
    accent: '#818191', //action keys
    background:"#252526", //for background
    similar:"#000000",
    contrast:"#FFFFFF",
  },
};