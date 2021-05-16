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
      isLogged:store.getState().isLogged
    }
    this.fetchData=this.fetchData.bind(this);
    this.updateItems=this.updateItems.bind(this);
  }

  componentDidMount(){
    if(this.state.isLogged){
      console.log('logged')
    }else{
      const { history } = this.props;
      if(history) history.push('/');
    }
    this.fetchData();
  }

  updateItems(notesTemp){
    this.setState({
      notes:notesTemp
    })
  }

  fetchData(){
    fetch('http://chandra.getenjoyment.net/reactPractice/getNotes.php',{
    method:'GET'
    }).then(response => response.json().then(res => {
      console.log("HTTP Responseeee"+res.data)
      this.updateItems(res.data);
      })).catch(error=>{
          console.log(error);
          });
  }


  render(){
    return(
      <div className="App">
      <Header methodCall={this.fetchData}/>
      {this.state.notes.map(note => <Note key={note.id} heading={note.title} content={note.content}/>)}
      
    </div>
    )
  }
}

export default withRouter(App);
