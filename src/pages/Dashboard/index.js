import React, { useState, useEffect } from 'react';
import axios from 'axios'; //https://www.npmjs.com/package/axios //exemplos e documentação
import { Link } from 'react-router-dom';

import Header from '../../components/Header';

export default function Dashboard() {
    //Variables
    const [usuario, setUsuario] = useState();

    //Functions
    useEffect(() => {
        console.log('Inicio do useEffect')
        axios({
            method: 'post',
            url: 'http://localhost:5000/checkToken',
            data: {
                token: localStorage.getItem('token')
            }
        })
            .then(function (res) {
                console.log('retornou uma resposta')
                if (res.data.status) {
                    console.log('Foi com status === true')
                    setUsuario(res.data.usuario);
                    console.log('Usuario agora tem os valores')
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <Header title="Dashboard" />
            <hr className="my-3" />
            <p>
                {/* 
                1) usuario && usuario.nome ? usuario.nome : '' = se existir usuario E existor usuario.nome mostrar usuario.nome senão mostra ''
                <code> {usuario && usuario.nome ? usuario.nome : ''}, {usuario && usuario.email ? usuario.email : ''} logado com sucesso! ^-^ </code>

                Essa não é a melhor maneira porque repara que fica estranho porque quando carrega a página os lugares dos
                campos ficam em branco e depois de 1s eles aparecem.
                
                2)
                Se existir usuário mostra <code>...</code> senão mostra <></>
                <></> = no react isso é nada, não é uma div e nem nada. não ocupa nenhuma espaço

                Tem como usar essas verificações para fazer o que quiser, colocar animações e etc.
                */}
                {usuario ?
                    <code> {usuario.nome}, {usuario.email} logado com sucesso! ^-^ </code>
                    :
                    <></>
                }

            </p>
            <Link to="/logout" className="btn btn-outline-primary"> Logout </Link>
        </div>
    )
}