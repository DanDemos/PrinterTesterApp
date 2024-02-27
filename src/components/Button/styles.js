import { StyleSheet } from 'react-native';
import { THEME_COLOR } from 'util/color';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME_COLOR.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    width: 300,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  darkcontainer: {
    backgroundColor: THEME_COLOR.dark_brown,
    borderWidth:  2,
    borderRadius: 20,
    borderColor: THEME_COLOR.primary,
    width: 300,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darktext: {
    fontSize: 16,
    fontWeight: '600',
    color: THEME_COLOR.primary,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    opacity: 0,
  },
});