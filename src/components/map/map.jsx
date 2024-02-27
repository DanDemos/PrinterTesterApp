// import React from 'react'
// import { Linking, Text, TouchableOpacity } from 'react-native'
// import { rgba } from 'polished'
// import { Circle, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
// import { geolocation, colors, permission } from 'app/utils'
// import { Img } from '../img'
// import { Style } from './style'
// import { useIsFocused } from '@react-navigation/native'

// import { Dimensions, StatusBar } from 'react-native';
// import { SIZE } from "@interface";

// export const win = Dimensions.get('window')
// export const win_width = win.width


// export const gap: SIZE = {
//   xxs: 2,
//   xs: 4,
//   sm: 8,
//   md: 12,
//   lg: 14,
//   xl: 16,
//   xxl: 20,
//   xxxl: 40
// }

// export const Map = (props) => {

//   const { center, range, onRefreshing } = props

//   const [coord, setCoord] = React.useState([])
//   const [current, setCurrent] = React.useState(props.current)
//   const [within, setWithin] = React.useState()
//   const [status, setStatus] = React.useState(null)

//   // console.log(center, 'center')

//   const isFocused = useIsFocused()

//   React.useEffect(_ => {
//     if (isFocused) {
//       permission.location()
//         .then(res => {
//           props.onPermissionChange && props.onPermissionChange(res)
//           if (res === "granted") {
//             geolocation.current(e => {
//               props.currentLocation && props.currentLocation(e)
//               setCurrent(e)
//               // center ? [{latitude:16.741033,longitude:96.132161},{latitude:16.642044,longitude:96.132199}].map(x=>coord.push(x)) : setCoord(e)
//               center ? center.map(x => coord.push({ latitude: x.location_lat, longitude: x.location_log })) : setCoord(e)
//             })
//             center &&
//               center.map(x =>
//                 geolocation.withinRadius(coord, range, e => {
//                   // console.log(e,"within e")
//                   setWithin(e.inbound)
//                 })
//               )
//           }
//           setStatus(res)
//         })
//     }
//   }, [isFocused])

//   // console.log(coord, 'map coord test')


//   if (range === 0 || !current) {
//     return (
//       <View style={{
//         width: "100%",
//         height: win_width / 1.7 + "px",
//         borderRadius: gap.md + "px",
//         overflow: "hidden",
//         position: "relative",
//       }}>
//         <Style.MapWebView source={{ html: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d122172.00215561698!2d96.157696!3d16.882073600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2smm!4v1654160983122!5m2!1sen!2smm" style="border:0; width: 100%; height: 100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' }} />
//         <Style.Warning>
//           {
//             status === "denied" ?
//               <>
//                 <Text>need-location-permission</Text>
//                 <TouchableOpacity onPress={_ => Linking.openSettings()}>
//                   <Text>check-setting</Text>
//                 </TouchableOpacity>
//               </>
//               :
//               <Text>map-not-support-device</Text>
//           }
//           {
//             range === 0 && <Text>range-error</Text>
//           }
//         </Style.Warning>
//       </Style.NotSupportedView >
//     )
//   }

//   return (
//     <Style.Container>
//       {
//         coord &&
//         <Style.Map
//           initialRegion={{
//             ...current,
//             latitudeDelta: 0.009,
//             longitudeDelta: 0.009,
//           }}>
//           {
//             (center && range) &&
//             <>
//               {
//                 range &&
//                 coord.map(x =>
//                   <Circle
//                     center={x}
//                     radius={range}
//                     fillColor={rgba(colors.success, .2)}
//                     strokeColor={rgba(colors.primary, .3)}
//                   />
//                 )
//               }
//               {
//                 range &&
//                 coord?.map(x =>
//                   <Marker coordinate={x}>
//                     <Img icon name="office-building-marker" type="mcommunity" color={colors.primary} size={40} />
//                   </Marker>
//                 )
//               }
//             </>
//           }
//           <Marker coordinate={current}>
//             <Img icon name="man" type="entypo" color={colors.info} size={40} />
//           </Marker>
//         </Style.Map>
//       }

//     </Style.Container>
//   )
// }