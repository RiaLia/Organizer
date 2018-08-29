import React, { Component } from 'react';
import { Text, View, TextInput, Button, AlertIOS } from 'react-native';
import styles from './Styles';

 export default class ListScreen extends Component {

   constructor(props) {
     super(props)
     this.state = {
       userLists: [],
       userName: undefined,
       newList: undefined,
       listName: undefined
     }
     this.addPressed = this.addPressed.bind(this)
     this.listPressed = this.listPressed.bind(this)
     this.deletePressed = this.deletePressed.bind(this)
   }

   componentDidMount(){
     const { navigation } = this.props;
     const userName = navigation.getParam('userName', 'NN');
     this.setState({userName: userName})

     fetch('http://localhost:3000/lists/' + userName )
     .then(response => response.json())
     .then(result => {
       this.setState({userLists: result})
     })
   }

   addPressed(){
     AlertIOS.prompt(
       'Add New List',
       null,
       [
         {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
         {text: 'Add', onPress: (text) => {
           this.setState({newList: text})
           fetch("http://localhost:3000/lists/" + this.state.userName, {
             body: JSON.stringify({
             listName: this.state.newList
           }),
           headers: {
             "Content-Type": "application/json"
           },
           method: "POST"
         })
         .then(() => {
           fetch('http://localhost:3000/lists/' + this.state.userName )
           .then(response => response.json())
           .then(result => {
             this.setState({userLists: result})
           })
         })
         }},
       ]
     );
   }

   listPressed(id, name){
     this.props.navigation.navigate('Detail', {userName: this.state.userName, listId: id, listName: name})
   }

   deletePressed(id){

     fetch("http://localhost:3000/lists/" + this.state.userName +'/' + id , {
       method: "DELETE"
   })
     fetch('http://localhost:3000/lists/' + this.state.userName )
     .then(response => response.json())
     .then(result => {
       this.setState({userLists: result})
     })

}
  render() {
    var listsToRender = this.state.userLists.map(list =>
      <View key={list._id} id={list._id}>
    <Text style={styles.listItem} onPress={() => this.listPressed(list._id, list.listName)} >
          {list.listName}
          <Button title='🗑' onPress={() => this.deletePressed(list._id)}></Button>
        </Text>
        </View>
  )


    return <View style={styles.main}>
      <View style={styles.nav}>
        <Text style={styles.text}>{this.state.userName}</Text>
        <Button title='➕' onPress={this.addPressed}></Button>
        <View>{listsToRender}</View>
      </View>

  </View>
  }
}
