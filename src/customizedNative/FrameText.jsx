import React from 'react';
import { Text } from 'react-native';
import { THEME_COLOR } from '../util/color';

function hexToRGBA(hex, alpha = 1) {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  return rgba;
}

function getOpacity(inputString) {
  const regex = /\((.{3})\)/g;
  const matches = regex.exec(inputString);
  if (matches && matches[1]) {
    return matches[1];
  }
  return 1;
}

function containsHexCode(inputString) {
  inputString = inputString.toLowerCase();
  const hexCodeRegex = /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/;
  const match = inputString.match(hexCodeRegex);
  return match ? hexToRGBA(match[0], getOpacity(inputString)) : null;
}

function containsColorKey(inputString) {
  inputString = inputString.toLowerCase();
  for (const key in THEME_COLOR) {
    if (inputString.includes(key.toLowerCase())) {
      return hexToRGBA(THEME_COLOR[key], getOpacity(inputString));
    }
  }
  return null; 
}

function containsRGB(inputString) {
  inputString = inputString.toLowerCase();
  const rgbRegex = /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/i;
  const match = inputString.match(rgbRegex);
  return match ? match[0] : null;
}

function containsRGBA(inputString) {
  inputString = inputString.toLowerCase();
  const rgbaRegex = /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/i;
  const match = inputString.match(rgbaRegex);
  return match ? match[0] : null;
}

export const FrameText = props => {
  let finalColor;

  if (containsHexCode(props.color)) {
    finalColor = containsHexCode(props.color);
  } else if (containsColorKey(props.color)) {
    finalColor = containsColorKey(props.color);
  } else if (containsRGB(props.color)) {
    finalColor = containsRGB(props.color);
  } else if (containsRGBA(props.color)) {
    finalColor = containsRGBA(props.color);
  } else {
    finalColor = null
  }

  let modifiedStyle = props.style
  let modifiedProps = props

  if (finalColor != null) {
    modifiedStyle = {
      ...props.style,
      color: finalColor
    };
    modifiedProps = {
      ...props,
      style: modifiedStyle
    };
  }

  return (
    <Text
      // lang={props.lang || lang || 'en'}
      style={modifiedStyle}
      {...modifiedProps}
    >
      {props.children}
    </Text>
  );
};
