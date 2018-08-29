import React, { Component } from 'react';
import { Text, View, TextInput, Button, AlertIOS} from 'react-native';
import { CheckBox } from 'react-native-elements'
import styles from './Styles';

export default class DetailListScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list : [],
      userName: undefined,
      listId: undefined,
      listName: undefined
    }
    this.addNewItem = this.addNewItem.bind(this)
    this.checkBoxPressed = this.checkBoxPressed.bind(this)
  }

  componentDidMount(){
    const { navigation } = this.props;
    const userName = navigation.getParam('userName', 'NN');
    const listId = navigation.getParam('listId', 'NN');
    const listName = navigation.getParam('listName', 'NN');
    this.setState({userName: userName})
    this.setState({listId: listId})
    this.setState({listName: listName})

      fetch('http://localhost:3000/lists/' + userName + '/' + listId )
      .then(response => response.json())
      .then(result => {
        this.setState({list: result})
      })
  }

  addNewItem(){
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Add', onPress: (item) => {
          fetch("http://localhost:3000/lists/" + this.state.userName + "/" + this.state.listId, {
            body: JSON.stringify({
              "objects": [
		              {
			              "item": item,
			              "done": false
		               }
	                ]
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "PUT"
        })
        .then(() => {
          fetch('http://localhost:3000/lists/' + this.state.userName + "/" + this.state.listId )
          .then(response => response.json())
          .then(result => {
            this.setState({list: result})
          })
        })
        }},
      ]
    );

  }

  checkBoxPressed(done, index){
    var objectsList = this.state.list
    objectsList[0].objects[index].done = !done
    this.setState({list: objectsList})

    fetch("http://localhost:3000/lists/" + this.state.userName + "/" + this.state.listId + "/change", {
      body: JSON.stringify({
        "objects": this.state.list[0].objects
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "PUT"
  })
  }

  render() {

      var listItemToRender = this.state.list.map(item =>
        <View key={item._id}>
          {item.objects.map((innerItem, index) =>
            <View key={innerItem.item}>
              <Text style={styles.listItem} key={innerItem.item}>{innerItem.item}
                <CheckBox right={true} checkedColor='blue' onPress={() => this.checkBoxPressed(innerItem.done, index)} checked={innerItem.done}></CheckBox>
              </Text>
            </View>
          )}

        </View>
      )
    return <View style={styles.view}>
      <Text>{this.state.listName}</Text>
      <Button title='➕' onPress={this.addNewItem}></Button>
      <Text>{listItemToRender}</Text>
    </View>

  }
}
