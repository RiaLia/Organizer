import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './Login'
import ListScreen from './List'
import NewUserScreen from './NewUser'
import DetailListScreen from './DetailList'
import styles from './Styles'



export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    List: ListScreen,
    NewUser: NewUserScreen,
    Detail: DetailListScreen
  },
  {
    initialRouteName: 'Login',
  }
);
