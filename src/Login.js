import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import './Login.css';
import { connect } from 'react-redux';

import { fetchUser } from './redux/loginActions';

let id='';
let pass='';
const Login=(props)=> {
    const setusernamevalue=(value)=>{
        id=value
    }
    const setuserpassvalue=(value)=>{
        pass=value
    }

    useEffect(()=>{
        if(props.isLogged){
            props.history.push('/dashboard')
        }
    })

        return (
            <div className="container-fluid login-container">
                <div className="loginContainer">
                    <Card className="text-left">
                        <Card.Title>
                        <Card.Text className="text-primary text-center">Login</Card.Text>
                        </Card.Title>
                        <Card.Body>
                            <Form >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="username" placeholder="Username" onChange={(e)=>setusernamevalue(e.target.value)} />
                    
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"   placeholder="Password" onChange={(e)=>setuserpassvalue(e.target.value)}/>
                                    <Form.Label className="text-danger">{props.error}</Form.Label>
                                </Form.Group>
                                <br/>
                                <Button variant="primary"  onClick={props.fetchUser}>
                                    {props.isLoading?"Loading..":"Login"}
                                </Button>
                                
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-muted ">Not Registered?<Card.Text className="text-primary">Click here</Card.Text></Card.Footer>
                    </Card>
                </div>
            </div>
        )
}
const mapStateToProps=state=>{
    return{
        isLogged:state.isLogged,
        isLoading:state.isLoading,
        userNumber:state.userNumber,
        error:state.error
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        fetchUser:()=>dispatch(fetchUser(id,pass))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);