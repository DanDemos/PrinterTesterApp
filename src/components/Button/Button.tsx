import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator, View} from 'react-native';
import {styles} from './styles';

interface ButtonProps {
  onPress: () => void;
  title: string;
  loading: boolean;
  disable: boolean;
  style: any;
}
export const Button = ({onPress, title, loading, disable, style}: ButtonProps) => {
  return disable ? (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{...styles.darkcontainer, ...style}}
      disabled={loading ? true : disable ? true : false}>
      <Text style={[styles.darktext, loading && styles.hidden]}>{title}</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
        </View>
      ) : null}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{...styles.container, ...style}}
      disabled={loading ? true : disable ? true : false}>
      <Text style={[styles.text, loading && styles.hidden]}>{title}</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
