import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import './LoginPage.css';
import { Link, Redirect } from 'react-router-dom';
import Parse from 'parse';
import UserModel from '../../model/UserModel';
import airplane from '../../assets/airplane-48.png';


function LoginPage({ activeUser, onLogin }) {
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [showInvalidLogin, setShowInvalidLogin] = useState();


    //when logout users will get out to the Home page
    if (activeUser) {
        return <Redirect to="/" />
    }


    function login(e) {
        //for not reset the values
        e.preventDefault(e);

        // Pass the username and password to logIn function
        Parse.User.logIn(email, pass).then((parseUser) => {
            // Do stuff after successful login
            console.log('Logged in user', parseUser);
            const activeUser = new UserModel(parseUser);
            console.log('user of UserModel', activeUser);
            onLogin(activeUser);
        }).catch(error => {
            setShowInvalidLogin(error);
            console.error('Error while logging in user', error);
        })
    }

    return (
        <div className="p-login">
            <Container>
                <h3><img width="25px" src={airplane} />  Sky Flight</h3>
                <h1>Login to continue</h1>
                {showInvalidLogin ? <Alert variant="danger">{showInvalidLogin}</Alert> : null} {/*Invalid Credentails!*/}
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
                    </Form.Group>
                    <Button variant="success" type="submit" onClick={login} block>
                        Log In
                </Button>
                    <Link to="/signup" >create new account</Link>
                </Form>
            </Container>
        </div>
    );
}

export default LoginPage;