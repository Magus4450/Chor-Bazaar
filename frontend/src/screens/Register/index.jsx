import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {register} from '../../actions/userAction'
import Message from '../../components/Message'
import FormContainer from '../../components/FormContainer'


const Register = ({ location, history }) => {

    const [first_name, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setConfirmPassword] = useState('')
    const [last_name, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDOB] = useState('')
    const [user_type, setUserType] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {userInfo } = userRegister
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    const submitHandler = async (e) => {

  
        e.preventDefault()
        if (password !== password2) {
            setMessage('Passwords do not match')
        } else {
            await dispatch(register(first_name, last_name, phone, email, password, password2, gender, user_type, dob))
            setMessage('Register Successfull')
        }
    
    }

    return (

        <FormContainer>
            <h1 style={{ marginTop: '120px' }}>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            <Form onSubmit={submitHandler}>
                        <Form.Group controlId='firstName'>
                            <Form.Label style={{ marginTop: '10px'}}>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                value={first_name}
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='lastName'>
                            <Form.Label style={{ marginTop: '10px'}}>Last Name<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                value={last_name}
                                required
                                onChange={(e) => setLastName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label style={{ marginTop: '10px'}}>Email Address<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email address"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='phoneNumber'>
                            <Form.Label style={{ marginTop: '10px'}}>Phone Number<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="phone"
                                placeholder="Enter phone number"
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Label style={{ marginTop: '10px'}}>Password<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword'>
                            <Form.Label style={{ marginTop: '10px'}}>Confirm Password<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password again"
                                value={password2}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label style={{ marginTop: '10px'}}>Select Gender</Form.Label>

                        <div className='container  p-1'>
                <select Classname="custom select" 
                 required
                 style={{fontSize: 17, color: 'grey'}}
                onChange={(e) => {
                    const selectedGender = e.target.value;
                    setGender(selectedGender)
                }}
                >
                    <option value="Male" >Male</option>
                    
                    <option value="Female" > Female </option>

                    <option value="Bisexual" > Bisexual </option>

                    <option value="Homosexual" > Homosexual </option>

                    <option value="Bitch" > Bitch </option>

                    <option value="Not preffered to say" > Not preffered to say </option>

                    </select>
                    
                    </div>

                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{ marginTop: '10px'}}>Select UserType</Form.Label>

                        <div className='container  p-1'>
                <select Classname="custom select" 
                 required
                 style={{fontSize: 17, color: 'grey'}}
                onChange={(e) => {
                    const selectedUserType = e.target.value;
                    setUserType(selectedUserType)
                }}
                >
                    <option value="Buyer" > Buyer </option>
                    
                    <option value="Seller" > Seller </option>


                    </select>
                    
                    </div>

                    </Form.Group>
                     
                    <Form.Group controlId='dob'>
                            <Form.Label style={{ marginTop: '10px'}}>Date of Birth <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="dob"
                                placeholder="YYYY-MM-DD Format"
                                value={dob}
                                required
                                onChange={(e) => setDOB(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary" style={{backgroundColor: "black", marginTop: '10px'}}>Register</Button>
                
            </Form>
            
            <Row className='py-3'>
                <Col style={{ marginBottom: '30px' }}>
                    Have an Account?  <Link to={redirect ? `/?redirect=${redirect}` : '/'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}


export default Register
