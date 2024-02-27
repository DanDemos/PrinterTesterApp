import { THEME } from "@interface"

const ALL_COLOR = new THEME("light", [
  {
    name: 'primary',
    code: '#fd9e4a'
  },
  {
    name: 'secondary',
    code: '#333333'
  },
  {
    name: 'whitish',
    code: "#eeeeee"
  },
  {
    name: 'tertiary',
    code: '#A1BF4F'
  },
  {
    name: 'success',
    code: '#28a745'
  },
  {
    name: 'danger',
    code: '#dc3545'
  },
  {
    name: 'warning',
    code: '#ffc107'
  },
  {
    name: 'warning2',
    code: '#A1BF4F'
  },
  {
    name: 'info',
    code: '#17a2b8'
  },
  {
    name: 'light',
    code: '#f8f9fa'
  },
  {
    name: 'dark',
    code: '#343a40'
  },
  {
    name: 'white',
    code: '#fff'
  },
  {
    name: 'gray',
    code: '#EEEEEE'
  },
  {
    name: 'background',
    code: '#f3f3f3'
  },
  {
    name: 'dark_gray',
    code: '#A5A5A5'
  },
  {
    name: 'text',
    code: '#333333'
  },
  {
    name: 'transparent',
    code: 'transparent'
  },
  {
    name: 'border',
    code: '#6c757d'
  },
  {
    name: 'info_light',
    code: '#47E9EE'
  },
  {
    name: 'success_light',
    code: '#92DD4D'
  },
  {
    name: 'green',
    code: '#009874'
  },
  {
    name: 'dark_brown',
    code: '#5D5D5D'
  },
  {
    name: 'white_gray',
    code: '#F5F5F5'
  },
  {
    name: 'blue',
    code: '#088EF1'
  },
  {
    name: 'orange',
    code: '#ED7852'
  },
  {
    name: 'yellow',
    code: '#FFB300'
  },
  
])

export const THEME_COLOR = ALL_COLOR.getColors()

export const color_array = () => {
  let arr = []
  for (const key in colors) {
    if (Object.hasOwnProperty.call(colors, key)) {
      arr.push(colors[key])
    }
  }
  return arr
}