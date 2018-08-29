import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import styles from './Styles'

export default class NewUserScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newLogin: undefined,
      newPassword: undefined
    },
    this.savePressed = this.savePressed.bind(this)
  }

  savePressed(){
    fetch("http://localhost:3000/users", {
      body: JSON.stringify({
      userName: this.state.newLogin,
      password: Number(this.state.newPassword)
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  .then(response => response.json())
  .then(result => {
    console.log(result);
    })
  }

  render(){
    return <View style={styles.main}>
      <TextInput style={styles.firstInput} placeholder='Choose a username' onChangeText={(newLogin) => this.setState({newLogin}) }></TextInput>
      <TextInput style={styles.input} placeholder='Choose Password' onChangeText={(newPassword) => this.setState({newPassword}) }></TextInput>
      <Button title='Save' onPress={this.savePressed}></Button>
    </View>
  }
}
