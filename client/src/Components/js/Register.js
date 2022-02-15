import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Register.css'
import Axios from 'axios'
import swal from 'sweetalert'

function Register() {


    const [regEmail, setRegEmail] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regName, setRegName] = useState('')


    const submitRegister = () => {

        const n = document.getElementById('name').value;
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

        else if (n === "") {
            swal({
                title: "Failed",
                text: "Your name is not filled correctly",
                icon: "warning",
            })
        }

        else {
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (e.match(validRegex)) {

                Axios.post('http://localhost:3001/api/register', {
                    name: regName,
                    email: regEmail,
                    password: regPassword
                }).then((response) => {
                    if (response.data.message) {
                        swal({
                            title: "Retry",
                            text: "This Email already exists",
                            icon: "warning",
                        })
                    }
                    else {
                        swal({
                            title: "Thankyou",
                            text: "You Have Successfully Registered",
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
        document.getElementById('name').value = ""
        document.getElementById('password').value = ""

    }

    return (
        <div className='register'>


            <div className='head'>Register</div><br /><br />


            <div className="form__group field">
                <input type="text" className="form__field" placeholder="Name" name="name" id='name' required onChange={(e) => {
                    setRegName(e.target.value)
                }} />
                <label htmlFor="name" className="form__label">Name</label>
            </div><br />


            <div className="form__group field">
                <input type="email" className="form__field" placeholder="Email" name="email" id='email' required onChange={(e) => {
                    setRegEmail(e.target.value)
                }} />
                <label htmlFor="email" className="form__label">Email</label>
            </div>
            <br />
            <div className="form__group field">
                <input type="password" className="form__field" placeholder="Password" name="password" id='password' required onChange={(e) => {
                    setRegPassword(e.target.value)
                }} />
                <label htmlFor="password" className="form__label">Password</label>
            </div>

            <br /><br /><br />

            <button className="button success" onClick={submitRegister} id='button'>Register</button>





            <br /><br />
            <Link to='/login'>Already have an account</Link>
        </div>
    )
}

export default Register