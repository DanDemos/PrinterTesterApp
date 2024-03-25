// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import callApi from '../../services/api/apiClient';
// import { useNavigation } from '@react-navigation/native';
// import CustomContainer from 'screens/layout/CustomContainer';
// import { THEME_COLOR } from 'util/color';

// import React, { useEffect } from 'react';
// import { usePrintersDiscovery } from 'react-native-esc-pos-printer';
// import { PrintersList, Button, ScreenTitle } from '../../components';

// const TreverPage = props => {
//   return (
//     <CustomContainer children={ChildComponent()}
//       scrollview={false}
//       HeaderOption={{
//         center:
//           <View>
//             <Text style={{ fontSize: 18, color: THEME_COLOR.dark_brown, fontWeight: "bold" }}>
//               tr3v3r EPOS
//             </Text>
//           </View>,
//         right:
//           <View>
//             <Text style={{ color: THEME_COLOR.dark_brown }}>
//               Right
//             </Text>
//           </View>
//       }}
//     >
//     </CustomContainer>
//   );
// };

// const ChildComponent = (props) => {
//   const { start, printerError, isDiscovering, printers } =
//     usePrintersDiscovery();
//   const navigation = useNavigation();

//   useEffect(() => {
//     if (printerError) {
//       console.log(printerError, "printerError")
//     }
//   }, [printerError]);

//   async function search (){
//     start()
//   }

//   return (
//     <View style={styles.container}>

//       <View style={styles.contentCotainer}>
//         <ScreenTitle title="tr3v3r/react-native-esc-pos-printer" />
//       </View>
//       <PrintersList
//         onPress={(printer) => {
//           if (printer) {
//             navigation.navigate('SimplePrint', { printer });
//           }
//         }}
//         printers={printers}
//       />
//       <View style={styles.contentCotainer}>
//         <Button
//           loading={isDiscovering}
//           title="Search"
//           onPress={() => search()}
//         />
//         {printerError ? (
//           <Text style={styles.errorText}>{printerError.message}</Text>
//         ) : null}
        
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     margin: 0,
//     padding: 0,
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   header: {
//     marginBottom: 20,
//   },
//   title: {
//     color: THEME_COLOR.whitish,
//     fontSize: 30,
//     fontWeight: 'bold',
//     // color: 'yellow'
//   },
//   button: {
//     backgroundColor: THEME_COLOR.primary,
//     padding: 10,
//     borderRadius: 5,
//     margin: 10
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   contentCotainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//     marginTop: 20,
//   },
// })

// export default TreverPage;