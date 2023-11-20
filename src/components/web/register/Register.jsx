import React from 'react'
import Input from '../../pages/Input.jsx';
import { useFormik } from 'formik';

function Register() {

    const formik = useFormik({
        initialValues:{
            userName: '',
            email: '',
            password: '',
        },
        onSubmit: values => {
            console.log(values);
        },
        validate: values=> {
            let errors = {};
            if(!values.userName){
                errors.userName = "Username is required";
            }
            if(!values.email){
                errors.email = "Email is required";
            }
            if(!values.password){
                errors.password = "Password is required";
            }
            return errors;
        },
    })

    const inputs = [
        {
            id: 'username',
            type: 'text',
            name: 'userName',
            title: 'Username',
            value: formik.values.userName,
        },
        {
            id:"email",
            type: "email",
            name: 'email',
            title: 'Email',
            value: formik.values.email,
        },
        {
            id: 'password',
            type: 'password',
            name: 'password',
            title: 'Password',
            value: formik.values.password,
        }
    ];

    const renderInputs = inputs.map((input, index) => 
        <Input 
            id={input.id} 
            type={input.type} 
            name={input.name} 
            title={input.title} 
            key={index} 
            errors={formik.errors}
            onChange={formik.handleChange} 
        />
    );


  return (
    <div className='container'>
        <h2>Create Account</h2>
        <form onSubmit={formik.handleSubmit}>
            {renderInputs}
            <input type="submit" />
        </form>
    </div>
  )
}

export default Register