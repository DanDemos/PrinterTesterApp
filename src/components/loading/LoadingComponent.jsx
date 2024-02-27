import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useSelector } from "react-redux";
import { Text } from "react-native";

const LoadingComponent = ({ loadingGroup, children, loadingDesign, size = "small" }) => {
  const selectedData = useSelector(state => state.loading[loadingGroup]);

  return (
    selectedData ? (loadingDesign || <ActivityIndicator size={size} />) : children
  );
};

export default LoadingComponent;
