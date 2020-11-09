import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
const Roll = require('react-reveal/Roll');

interface loginStatusType {
    msg: string;
    state: number;
}

interface loginType {
    username: string;
    password: string;
}

// {
//     username: '',
//         password: ''
// }

export const LogIn = () => {

    const [userInput, setUserInput] = useState<loginType>({
        username: '',
        password: ''
    });
    const [loginStatus, setLoginStatus] = useState<loginStatusType>({
        msg: "",
        state: 0
    });
    const { msg, state } = loginStatus;
    const usernameRef = useRef<HTMLInputElement>(null);
    const URL = "http://localhost:7777";

    useEffect(() => {
        (
            async () => {
                const response = await fetch(`${URL}/test`);
                const data = await response.json();
                console.log(data);
            }
        )();
    })

    useEffect(() => {
        usernameRef.current?.focus();
    }, [])

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        const PATH = `${URL}/movie/login/`;
        console.log('userInput', userInput)

        const response = await fetch(PATH, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(userInput),
        })
        const data = await response.json();
        setLoginStatus(data);

    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserInput({
            ...userInput,
            [name]: value,
        });

        //     console.log('value', value)
        //     console.log('name', name)

    }

    return (
        <Roll left>
            <div >
                {state !== 200 ?
                    <div className="login-section">
                        <div className="login" >
                            <h2>Log In</h2>
                            <input type="text" placeholder="Username" onChange={handleChange} name="username" ref={usernameRef} />
                            <input type="text" placeholder="Password" onChange={handleChange} name="password" />
                            <div>{msg}</div>
                        </div>
                        <div className="button-section">
                            <button type="submit" onClick={handleClick} className="signIn-button">Sign In</button>
                            <button className="signup"><Link to="/signup" className="signup-link">Sign Up</Link></button>
                        </div>
                    </div>
                    :
                    <div className="success-page">
                        <h2>{loginStatus.msg}</h2>
                        <Link to="/bulletin" className="link-board">Go to Board</Link>
                    </div>
                }
            </div>
        </Roll>
    )
}
