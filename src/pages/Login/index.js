import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import Header from '../../components/Header';

export default function Login(props) {
    //Variables
    const [redirect, setRedirect] = useState(false);
    const [message] = useState(props.location.state ? props.location.state.message : '');
    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    //Functions
    useEffect(() => {
        if (redirect) {
            props.history.push("/admin")
        }
    }, [redirect, props.history])
    const signIn = () => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/logar',
            data: {
                email: login.email,
                senha: login.password
            }
        })
            .then(function (res) {
                if (res.data.status) {
                    console.log('usuario -> ', res.data.usuario);
                    localStorage.setItem('_id', res.data.usuario._id);
                    localStorage.setItem('nome', res.data.usuario.nome);
                    localStorage.setItem('email', res.data.usuario.email);
                    localStorage.setItem('token', res.data.token);
                    setRedirect(true)
                }
                //console.log(res.data); //É o que vai vim do backend
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    //Render
    return (
        <div className="col-md-6">
            <Header title="Login" />
            <hr className="my-3" />
            {
                message !== '' ? (
                    <Alert color="danger" className="text-center"> {message} </Alert>
                ) : ''
            }
            <Form>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" value={login.email} id="email" onChange={e => setLogin({ ...login, email: e.target.value })} placeholder="Digite seu e-mail" />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Senha</Label>
                    <Input type="password" value={login.password} id="password" onChange={e => setLogin({ ...login, password: e.target.value })} placeholder="Digite sua senha" />
                </FormGroup>
                <Button color="primary" block onClick={signIn}> Entrar </Button>
            </Form>
        </div>
    )
}
