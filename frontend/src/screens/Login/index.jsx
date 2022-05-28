import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'

import FormContainer from '../../components/FormContainer'
import { login } from '../../actions/userAction'

const LoginComponent = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        console.log(userInfo)
        if (userInfo) {
            history.push("/")
        }else if(error){
            setMessage("Email or Password doesn't match")
        }
    }, [userInfo, history, redirect, error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
      
    }

    return (
        <FormContainer>
           
            <h1 style={{ marginTop: '120px' }}>Sign In</h1>
            {message && <Message variant='danger'>{message}</Message>}
           
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label style={{ marginTop: '10px'}}>Email Address<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="nic"
                        placeholder="Enter email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label style={{ marginTop: '10px'}}>Password <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" style={{ marginTop: '10px', backgroundColor:"black"}}>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col style={{ marginBottom: '50px' }}>
                    New Customer? <Link to={'/register' } style={{color: "blue"}}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginComponent
