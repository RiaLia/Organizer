import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import styles from './Styles'

export default class LoginScreen extends React.Component {

 constructor(props) {
   super(props)
   this.state = {
     text: undefined,
     login: undefined,
     password: undefined
   },
   this.buttonPressed = this.buttonPressed.bind(this)
 }


 buttonPressed() {
   fetch("http://localhost:3000/users")
   .then(response => response.json())
   .then(result => {
      for(var i = 0; i < result.length; i++) {
        if(result[i].userName == this.state.login && result[i].password == this.state.password){
          this.setState({text: undefined})
          this.props.navigation.navigate('List', {userName: result[i].userName})
          return;
        } else {
          this.setState({text: 'Wrong username/password'})
        }
      }
   })
 }


 render() {
   return <View style={styles.main}>

     <Text style={styles.text}>Organizer!</Text>
     <Text style={styles.text}>{this.state.text}</Text>
     <TextInput style={styles.input} placeholder='UserName' onChangeText={(login) => this.setState({login}) }></TextInput>
     <TextInput style={styles.input} keyboardType='number-pad' secureTextEntry={true} placeholder='Password' onChangeText={(password) => this.setState({password}) }></TextInput>
     <Button style={styles.button} title='Go' onPress={this.buttonPressed}></Button>
       <Button
        title="New User"
        onPress={() => this.props.navigation.navigate('NewUser')}
      />

 </View>
 }

}
