/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Note from './app/components/Note';
Globals = require('./Globals');

export default class todoapp extends Component {

  state = {
    noteArray : [],
    noteText : '',
  }

  render() {
    if(Globals.isCalledGetNotes)
    {
      this.getNotes();
      Globals.isCalledGetNotes = false;
    }
    let notes = this.state.noteArray.map((val,key) => {
      return <Note key={key} keyval={key} val={val} deleteMethod={() => this.deleteNote(key)}/>
    });
    return(
      <View style={styles.container}>

        <View style={styles.header}>

          <Text style={styles.headerText}>- TODO LİST -</Text>

        </View>

        <ScrollView style={styles.scrollContainer} ref="scrollView"
          onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>
          {notes}
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>

            <Text style={styles.addButtonText}>+</Text>

          </TouchableOpacity>

          <TextInput
          onChangeText={(noteText) => this.setState({noteText})} value={this.state.noteText}
          style={styles.textInput} placeholder='> Text Here <' placeholderTextColor='black' underlineColorAndroid='transparent'>
          </TextInput>

        </View>

      </View>
    );
  }

  addNote() {
    if(this.state.noteText){
      var d = new Date();
    fetch('https://androidtodoapp.herokuapp.com/saveNote' , {
        method : 'POST',
        headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
        },
          body : JSON.stringify({
            date : d.getFullYear() + "/" + (d.getMonth() +1) + "/" +  d.getDate(),
            note : this.state.noteText
          })
      })
      .then((response) => {
        if(response.status == 200)
        {
          this.state.noteArray.push({'date': d.getFullYear() + "/" + (d.getMonth() +1) + "/" +  d.getDate() , 'note': this.state.noteText});
          this.setState({noteArray : this.state.noteArray});
          this.setState({noteText : ''});
        }
      })
      .catch((error) => {
      });
    }
  }

  getNotes(){
    fetch('http://androidtodoapp.herokuapp.com/getNotes' , {
      method : 'POST',
      headers : {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      for(var i = 0; i < responseData.length; i++)
      {
        this.state.noteArray.push({'date' : responseData[i].date , 'note' : responseData[i].note});
        this.setState({noteArray : this.state.noteArray});
        this.setState({noteText : ''});
      }
    })
    .catch((error) => {
      Alert.alert(error.toString());
    })
  }

  deleteNote(key){
    this.state.noteArray.splice(key,1);
    this.setState({noteArray: this.state.noteArray});
  }
}

const styles = StyleSheet.create({
    container : {
      flex : 1,
    },
    header : {
      backgroundColor : '#2196F3',
      alignItems : 'center',
      justifyContent : 'center',
      borderBottomWidth : 10,
      borderBottomColor : '#ddd',
    },
    headerText : {
      color : 'white',
      fontSize : 18,
      padding : 20,
    },
    scrollContainer : {
      flex : 1,
      marginBottom : '20%'
    },
    footer : {
      position : 'absolute',
      alignItems : 'center',
      bottom : 0,
      left : 0,
      right : 0,
    },
    addButton : {
      backgroundColor : '#2196F3',
      width : 60,
      height : 60,
      borderRadius : 50,
      borderColor : '#ccc',
      alignItems : 'center',
      justifyContent : 'center',
      elevation : 8,
      alignSelf : 'flex-end',
      marginRight : 1,
      marginBottom : -60,
      zIndex : 10,
    },
    addButtonText : {
      color : '#fff',
      fontSize : 24,
    },
    textInput : {
      alignSelf : 'flex-start',
      color : '#000',
      padding : 20,
      borderRadius : 50,
      width : '83%',
      height : 60,
      marginLeft : 1,
      paddingTop : 25,
      marginBottom : 5,
      backgroundColor : '#E0E0E0',
      borderWidth : 1,
      borderColor : '#B3E5FC',
    }
});

AppRegistry.registerComponent('todoapp', () => todoapp);
