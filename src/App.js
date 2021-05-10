import React,{useState,Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Note from './Note'
import Header from './Header'

class App extends Component{
  constructor(){
    super()
    this.state={
      notes:[]
    }
    this.fetchData=this.fetchData.bind(this);
    this.updateItems=this.updateItems.bind(this);
  }

  componentDidMount(){
    this.fetchData();
  }

  updateItems(notesTemp){
    this.setState({
      notes:notesTemp
    })
  }

  fetchData(){
    fetch('http://chandra.getenjoyment.net/getNotes.php',{
    method:'GET'
    }).then(response => response.json().then(res => {
      console.log("HTTP Responseeee"+res.data)
      const data=res.data;
      this.updateItems(res.data);
      })).catch(error=>{
          console.log(error);
          });
  }


  render(){
    return(
      <div className="App">
      <Header methodCall={this.fetchData}/>
      {this.state.notes.map(note => <Note heading={note.title} content={note.content}/>)}
      
    </div>
    )
  }
}
export default App;
