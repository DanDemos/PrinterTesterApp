// import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Map } from 'components/map/map';
// import CustomContainer from 'screens/layout/CustomContainer';


// const TreverPage = props => {
//   const navigation = useNavigation()
//   return (
//     <CustomContainer children={ChildComponent()} />
//   );
// };

// const ChildComponent = props => {
//   const navigation = useNavigation()
//   return (
//     <Map
//       load={reloaded}
//       onPermissionChange={res => setLocationPermission(res)}
//       currentLocation={e => {
//         setFormdata({ ...formdata, ...e })
//       }}
//       center={geofencing ? coord1 : false}
//       // center={geofencing ? coord : false}
//       range={key_finder(profile.info.general_info, "Radius(m)")}
//       onRefreshing={refresh}
//     />
//   )
// }

// export default TreverPage;