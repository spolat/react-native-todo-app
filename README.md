# React Native Android Todo App

##For Rest Api => [React Native Todo App Rest Api](https://github.com/spolat/android-note-app-service)
![image](https://user-images.githubusercontent.com/25878632/27616685-24803504-5bba-11e7-836b-ec1972fbfed7.png)
![image](https://user-images.githubusercontent.com/25878632/27616725-7690b7b0-5bba-11e7-8ffd-e20e1fac77b0.png)

Send notes to rest api
```javascript
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
```
Get notes from rest api
```javascript
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
```
Fill notes to view
```javascript
for(var i = 0; i < responseData.length; i++)
      {
        this.state.noteArray.push({'date' : responseData[i].date , 'note' : responseData[i].note});
        this.setState({noteArray : this.state.noteArray});
        this.setState({noteText : ''});
      }
```
