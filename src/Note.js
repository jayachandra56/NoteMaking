import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Note.css'
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Snackbar, SnackbarContent, TextareaAutosize } from '@material-ui/core';

function Note(props){
    const {heading,content}=props;
    const [titleTemp,setTitle]=React.useState(heading);
    const [contentTemp,setContent]=React.useState(content);
    const [submitText,setSubmitText]=React.useState('Submit');
    const [open,setOpen]=React.useState(false);
    const [opensnack,setOpenstack]=React.useState(false);
    let vertical='bottom';
    let horizontal='center';
    function clickHandle(){
            setOpen(true);
    };
    const handleClose=()=>{
            setOpenstack(false);
            setOpen(false);
    }
    const handleCancel=()=>{
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

}
    return(
        <>
        <div className="container" onClick={clickHandle}>
            <h3 className="text">{heading}</h3>
            <p className="text">{content}</p>
        </div>
        <div className="DialogContainer">
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title"><TextField
                    autoFocus
                    value={titleTemp}
                    margin="dense"
                    id="name"
                    label="Title"
                    type="text"
                    fullWidth
                    onChange={(e)=>setTitle(e.target.value)}
                    /></DialogTitle>
                    <DialogContent>
                    <TextareaAutosize value={contentTemp} aria-label="minimum height" rowsMin={10} placeholder="Enetr your note" onChange={(e)=>setContent(e.target.value)} />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
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
                // onClose={handleCloseSnack}
                // message={result.message}
                key={vertical + horizontal}
                >
                    <SnackbarContent style={{
                        backgroundColor:'green',  
                        }}
                        // message={<span id="client-snackbar">{this.state.result.message}</span>}
                    />
                </Snackbar>
        </>
    )
}
export default Note;