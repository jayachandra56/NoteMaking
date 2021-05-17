import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Note.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Snackbar, SnackbarContent, TextareaAutosize } from '@material-ui/core';
import store from './store';
import { withRouter } from 'react-router-dom';

function Note(props){
    const {heading,content}=props;
    const [titleTemp,setTitle]=React.useState(heading);
    const [contentTemp,setContent]=React.useState(content);
    const [submitText,setSubmitText]=React.useState('Submit');
    const [open,setOpen]=React.useState(false);
    const [opensnack,setOpenstack]=React.useState(false);
    const [message, setmessage] = React.useState('')
    let vertical='bottom';
    let horizontal='center';
    function clickNote(){
            setOpen(true);
    };
    const dialogClose=()=>{
            setOpenstack(false);
            setOpen(false);
    }
    const dialogCancel=()=>{
        setOpenstack(false);
        setOpen(false);
}
const getTitle=(val)=>{
    setTitle(val);
}
const getContent=(val)=>{
    setContent(val);
}
const submitNote=()=>{
    setSubmitText('Updating..')
    let formData = new FormData();
    formData.append('title', titleTemp);
    formData.append('content', contentTemp);
    formData.append('number', store.getState().userNumber);
    const requestOptions = {
        method: 'POST',
        body:formData
    };
    fetch('http://chandra.getenjoyment.net/reactPractice/editNote.php', requestOptions)
    .then(response => response.json().then(res => {
        setmessage(res.message)
        setOpen(false)
        setOpenstack(true)
        props.updatedItem()
}))
    .catch(error =>{
        setmessage(error)
        setOpenstack(true)
    })
    // .then(data => this.setState({ postId: data.id }));
  }
    return(
        <>
        <div className="container" onClick={clickNote}>
            <h3 className="text">{heading}</h3>
            <p className="text">{content}</p>
        </div>
        <div className="DialogContainer">
                    <Dialog open={open} onClose={dialogClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title"><TextField
                    disabled
                    value={titleTemp}
                    margin="dense"
                    id="name"
                    label="Title"
                    type="text"
                    fullWidth
                    onChange={(e)=>setTitle(e.target.value)}
                    /></DialogTitle>
                    <DialogContent>
                    <TextareaAutosize value={contentTemp} autoFocus aria-label="minimum height" rowsMin={10} placeholder="Enetr your note" onChange={(e)=>setContent(e.target.value)} />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={dialogCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submitNote} color="primary">
                        {submitText}
                    </Button>
                </DialogActions>
                </Dialog>
                </div>
                <Snackbar
                
                open={opensnack}
                onClose={dialogCancel}
                // message={result.message}
                key={vertical + horizontal}
                >
                    <SnackbarContent style={{
                        backgroundColor:'green',  
                        }}
                        message={<span id="client-snackbar">{message}</span>}
                    />
                </Snackbar>
        </>
    )
}
export default withRouter(Note);