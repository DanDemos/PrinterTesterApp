import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'util/color';

export const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: THEME_COLOR.dark_gray,
    borderRadius: 26,
    width: 300,
    minHeight: 350,
    overflow: 'hidden',
    paddingVertical: 20,
  },
});