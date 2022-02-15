import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../css/Login.css'
import Axios from 'axios'
import swal from 'sweetalert'


function Login() {


    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')


    const submitLogin = () => {

        const e = document.getElementById("email").value;
        const p = document.getElementById("password").value;

        if (e === "") {
            swal({
                title: "Failed",
                text: "Your email is not filled correctly",
                icon: "warning",
            })
        }
        else if (p === "") {
            swal({
                title: "Failed",
                text: "Your password is not filled correctly",
                icon: "warning",
            })
        }

        else {



            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (e.match(validRegex)) {

                Axios.post('http://localhost:3001/api/login', {
                    email: loginEmail,
                    password: loginPassword
                }).then((response) => {

                    if (response.data.message) {
                        swal({
                            title: "Failed",
                            text: "Sorry wrong email/password combination",
                            icon: "warning",
                        })
                    }
                    else {
                        swal({
                            title: "Thankyou",
                            text: "You Have Successfully Logged in",
                            icon: "success",
                        })
                    }

                })


            } else {

                swal({
                    title: "Failed",
                    text: "Invalid email address!",
                    icon: "warning",
                })

            }




        }

        document.getElementById('email').value = ""
        document.getElementById('password').value = ""


    }

    return (
        <div className='login'>

            <div className='head'>Login</div><br /><br />


            <div className="form__group field">
                <input type="email" className="form__field" placeholder="Email" name="email" id='email' required onChange={(e) => {
                    setLoginEmail(e.target.value)
                }} />
                <label htmlFor="email" className="form__label">Email</label>
            </div>
            <br />
            <div className="form__group field">
                <input type="password" className="form__field" placeholder="Password" name="password" id='password' required onChange={(e) => {
                    setLoginPassword(e.target.value)
                }} />
                <label htmlFor="password" className="form__label">Password</label>
            </div><br /><br /><br />



            <button className="button success" onClick={submitLogin} id='button'>Login</button>

            <br /><br /><br />



            <Link to='/register'>Don't have an account</Link>
        </div>
    )
}

export default Login