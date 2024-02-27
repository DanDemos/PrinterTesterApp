import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomContainer from 'screens/layout/CustomContainer';

const ContactPage = props => {
  const navigation = useNavigation()

  return (
    <CustomContainer children={ChildComponent()}
    HeaderOption={{
        left:
          <TouchableOpacity onPress={() => navigation?.openDrawer()}>
            <IconComp icon name="menu" type="entypo" size={40} />
          </TouchableOpacity>
        ,
        center:
          <View>
            <Text>
              Home
            </Text>
          </View>,
        right:
          <View>
            <Text>
              Right
            </Text>
          </View>
      }} />
  )
};

const ChildComponent = () => {
  return (


    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact Page</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.buttonText}>Login Page</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={_ => {
            // console.log(navigation, "onCLick")
            navigation?.openDrawer()
          }}>
            <Text style={styles.buttonText}>Drawer Page</Text>
          </TouchableOpacity> */}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactPage;