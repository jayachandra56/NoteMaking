import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import './Login.css';


class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.HandleSubmit=this.HandleSubmit.bind(this);
        this.setUserName=this.setUserName.bind(this);
        this.setPassword=this.setPassword.bind(this);
    }

    componentDidMount() {
        // fetch('')
        //     .then()
        //     .catch();
    }

    HandleSubmit(event){
        event.preventDefault();
        let formData = new FormData();
        formData.append('number', this.state.username);
        formData.append('password', this.state.password);
    
        fetch('http://chandra.getenjoyment.net/sports/login.php',{
            method:'POST',
            body:formData
        })
        .then(response=>response.json().then(res=> {
            console.log(res.message)
            if(res.login){
                console.log('condition satisfied')
            }
        }
            ))
        .catch(error => console.log(error))
    }

    setUserName(value){
        this.setState({
            username:value
        })
    }
    setPassword(value){
        this.setState({
            password:value
        })
    }

    render() {
        return (
            <div className="container-fluid center align-middle">
                <div className="loginContainer">
                    <Card className="text-left">
                        <Card.Body>
                            <Form >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="username" placeholder="Username" onChange={(e)=>this.setUserName(e.target.value)} />
                    
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password"   placeholder="Password" onChange={(e)=>this.setPassword(e.target.value)}/>
                                </Form.Group>
                                <br/>
                                <Button variant="primary" type="submit" onClick={this.HandleSubmit}>
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-muted">Not Registered?<Card.Text className="text-primary">Click here</Card.Text></Card.Footer>
                    </Card>
                </div>
            </div>
        )
    }
}
export default Login;