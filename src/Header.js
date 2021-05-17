import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Snackbar, SnackbarContent, TextareaAutosize } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './redux/loginActions';

class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            open:false,
            title:'',
            content:'',
            submitText:'Save',
            result:'',
            opensnack:false,
            vertical:'bottom',
            horizontal:'center'
        }
        this.handleClose=this.handleClose.bind(this);
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.getContent=this.getContent.bind(this);
        this.getTitle=this.getTitle.bind(this);
        this.submitNote=this.submitNote.bind(this);
        this.handleCloseSnack=this.handleCloseSnack.bind(this);
        // this.handleLogout=this.handleLogout.bind(this)
        this.handleCancel=this.handleCancel.bind(this);
        
    }

    handleClickOpen () {
        this.setState({
            open:true
        })
      };
      handleCloseSnack(){
        this.setState({
            opensnack:false
        })
      }
      handleCancel(){
        this.setState({
            open:false,
            opensnack:false
        }); 
      }
      handleClose(){
        this.setState({
            open:false,
            opensnack:true
        });
      };
      submitNote(){
        this.setState({
            submitText:'Saving...'
        })
        let formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('content', this.state.content);
        formData.append('number', this.props.userNumber);
        const requestOptions = {
            method: 'POST',
            
            body:formData
        };
        fetch('http://chandra.getenjoyment.net/reactPractice/createNote.php', requestOptions)
        .then(response => response.json().then(res => {
            console.log("HTTP Response"+res.message)
            this.props.updatedItem()
            this.setState({
                result:res
            },()=>{
                this.handleClose(); 

            // console.log("HTTP Response"+response.json());
        })
    }))
        .catch(error =>{
            console.log("Error in fetch"+error);
        })
        // .then(data => this.setState({ postId: data.id }));
      }

      getContent(content){
        this.setState({
            content:content
        })
      }
      getTitle(title){
        this.setState({
            title:title
        })
      }

      componentDidUpdate(){
          if(!this.props.isLogged){
            const { history } = this.props;
            if(history) history.push('/');
          }
      }

    render(){
        return(
            <div className="container-fluid header">
                {/* <OpenFormDialog/> */}
                <div className="header-sub d-flex justify-content-between">
                    <h3 className="logo-header">Note Making</h3>
                    <h4 className="logo-header">Welcome, Mr.{this.props.UserName}</h4>
                    <button className="btn btn-primary" onClick={this.handleClickOpen}>Create Note</button>
                    <button className="btn btn-primary" onClick={this.props.logoutM}>Logout</button>
                </div>
                <div className="DialogContainer">
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title"><TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title"
                    type="text"
                    fullWidth
                    onChange={(e)=>this.getTitle(e.target.value)}
                    /></DialogTitle>
                    <DialogContent>
                    <TextareaAutosize aria-label="minimum height" rowsMin={10} placeholder="Enetr your note" onChange={(e)=>this.getContent(e.target.value)} />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.submitNote} color="primary">
                        {this.state.submitText}
                    </Button>
                </DialogActions>
                </Dialog>
                </div>
                <Snackbar
                
                open={this.state.opensnack}
                onClose={this.handleCloseSnack}
                message={this.state.result.message}
                key={this.state.vertical+this.state.horizontal}
                >
                    <SnackbarContent style={{
                        backgroundColor:'green',  
                        }}
                        message={<span id="client-snackbar">{this.state.result.message}</span>}
                    />
                </Snackbar>
    
            </div>
        );
    }
}

const mapStateToProps=state=>{
   
    return{
        isLogged:state.isLogged,
        isLoading:state.isLoading,
        userNumber:state.userNumber,
        UserName:state.UserName,
        error:state.error
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        logoutM:()=>dispatch(logout())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( withRouter(Header))