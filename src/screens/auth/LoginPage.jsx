import React, { useEffect, useState } from 'react'
import callApi from '../../services/api/apiClient';
import { useSelector } from 'react-redux';
import LoadingComponent from '../../components/loading/LoadingComponent';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const signIn_data = {
  login: '09989002021',
  password: '123',
};

const LoginPage = props => {
  const navigation = useNavigation()
  // console.log(navigation, "navigationnavigation")
  const [loadingID_arr, setloadingID_arr] = useState([]);
  let b = {
    userid: "uid_112",
    row: 2,
    olala: ["hae", "awef", "aewfla",]
  };
  let hello
  async function login() {
    callApi('auth/login').withHeaders(signIn_data).withKeyParameter(b).loadingGroup(1).executeDispatch();
    // callApi('auth/login').withHeaders(signIn_data).loadingGroup('g').execute();
    // callApi('auth/login').withHeaders(signIn_data).loadingGroup('g').execute();
    // callApi('auth/login').withHeaders(signIn_data).execute().then((res) => { setloadingID_arr(res) });
    // const e = callApi('auth/login').withHeaders(signIn_data).loadingGroup('g').executeDispatch();
  }
  function login2() {
    callApi('auth/login').withHeaders(signIn_data).loadingGroup('g').execute();
    callApi('auth/login').withHeaders(signIn_data).loadingGroup('g').execute();
    callApi('auth/login').withHeaders(signIn_data).loadingGroup('g').execute();
    callApi('auth/login').withHeaders(signIn_data).loadingGroup('g').execute();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LoadingComponent loadingGroup={1}><Text>Shazam!! I'm fully charged</Text></LoadingComponent>
        <LoadingComponent loadingGroup={"g"} loadingDesign={<Text>ooooooooooo</Text>}></LoadingComponent>
        <Text style={styles.title}>{loadingID_arr.user_id}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TreverPage')}>
        <Text style={styles.buttonText} >Go to home page</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text>call api</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={login2}>
        <Text>call api2</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;