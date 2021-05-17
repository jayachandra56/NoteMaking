import React,{useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import './Login.css';
import { connect } from 'react-redux';

import { fetchUser } from './redux/loginActions';
import { Snackbar, SnackbarContent } from '@material-ui/core';

const Signup=(props)=> {
    const [Username, setUsername] = useState('')
    const [Number, setNumber] = useState('')
    const [Password, setPassword] = useState('')
    const [Error, setError] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [message, setmessage] = useState('')
    const [opensnack, setopensnack] = useState(false)



    useEffect(()=>{
        if(props.isLogged){
            props.history.push('/dashboard')
        }
    })
    const handleCloseSnack=()=>{
        setopensnack(false)
    }

    const HandleSignup=()=>{
        let formData = new FormData();
        formData.append('name', Username);
        formData.append('number',Number);
        formData.append('password',Password);
        fetch('http://chandra.getenjoyment.net/reactPractice/register.php',{
            method:'POST',
            body:formData
        })
        .then(response=>response.json().then(res=> {
            console.log(res)
            if(res.register){
                setopensnack(true)
                setError('')
                setmessage(res.message)
            }else{
                setError(res.message)
            }
        }
            ))
        .catch(error=>{
            console.log(error)
            // setError(error)
        })
    }

        return (
            <div className="container-fluid login-container">
                <div className="loginContainer">
                    <Card className="text-left">
                        <Card.Title>
                        <Card.Text className="text-primary text-center">Register</Card.Text>
                        </Card.Title>
                        <Card.Body>
                            <Form >
                            <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="username" onChange={(e)=>setUsername(e.target.value)} />
                    
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control type="text" placeholder="number" onChange={(e)=>setNumber(e.target.value)} />
                    
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"   placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                    <Form.Label className="text-danger">{Error}</Form.Label>
                                </Form.Group>
                                <br/>
                                <Button variant="primary"  onClick={HandleSignup}>
                                    {isLoading?"Loading..":"Register"}
                                </Button>
                                
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-muted "> Have an account?<Card.Text className="text-primary btn" onClick={()=>{props.history.push('/login')}}>Login here</Card.Text></Card.Footer>
                    </Card>
                </div>
                <Snackbar
                
                open={opensnack}
                onClose={handleCloseSnack}
                // message={result.message}
                key={'bottom' + 'center'}
                >
                    <SnackbarContent style={{
                        backgroundColor:'green',  
                        }}
                         message={<span id="client-snackbar">{message}</span>}
                    />
                </Snackbar>
            </div>
        )
}

export default Signup