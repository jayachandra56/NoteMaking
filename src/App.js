import React,{Component} from 'react';
import './App.css';
import Note from './Note'
import Header from './Header'
import store from './store'
import { withRouter } from 'react-router-dom';


class App extends Component{
  constructor(){
    super()
    this.state={
      notes:[],
      isLogged:store.getState().isLogged,
      usernumber:store.getState().userNumber,
      updated:false
    }
    this.fetchData=this.fetchData.bind(this);
    this.updateItems=this.updateItems.bind(this);
    this.updatedItem=this.updatedItem.bind(this)
  }

  componentDidMount(){
    if(this.state.isLogged){
    }else{
      const { history } = this.props;
      if(history) history.push('/');
    }
    this.fetchData();
  }

  updateItems(notesTemp){
    this.setState({
      notes:notesTemp,
      updated:false
    })
  }

  updatedItem(){
    this.fetchData()
    this.setState({
      updated:true
    })
  }

  fetchData(){
    let formData = new FormData();
    formData.append('number', this.state.usernumber);
    const requestOptions = {
        method: 'POST',
        body:formData
    };
    fetch('http://chandra.getenjoyment.net/reactPractice/getNotes.php',requestOptions)
    .then(response => response.json().then(res => {
      console.log("HTTP Responseeee"+JSON.stringify(res))
      this.updateItems(res.data);
      })).catch(error=>{
          console.log(error);
          });
  }


  render(){
    return(
      <div className="App">
      <Header updatedItem={this.updatedItem}/>
      {this.state.notes.map(note => <Note key={note.id} heading={note.title} content={note.content} updatedItem={this.updatedItem}/>)}
      
    </div>
    )
  }
}

export default withRouter(App);
