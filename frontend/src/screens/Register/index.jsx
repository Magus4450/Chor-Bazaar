import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    Form,
    Button,
    Row,
    Col
} from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../../components/FormContainer'


const Register = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cropSelection, setCropSelection] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [spouseName, setSpouseName] = useState('')
    const [country, setCountry] = useState('Nepal')
    const [province, setProvince] = useState('Province 1')
    const [address, setAddress] = useState('')
    const [gender, setGender] = useState('Male')
    const [maritalStatus, setMaritalStatus] = useState('Single')
    const [message, setMessage] = useState(null)

    // const dispatch = useDispatch()

    // const userRegister = useSelector(state => state.userRegister)
    // const { loading, userInfo, error } = userRegister
    // const redirect = location.search ? location.search.split('=')[1] : '/'

    // useEffect(() => {
    //     if (userInfo) {
    //         history.push(redirect)
    //     }
    // }, [userInfo, history, redirect])

    const submitHandler = (e) => {

  
        e.preventDefault()
    //     if (password !== confirmPassword) {
    //         setMessage('Passwords do not match')
    //     } else {
    //         dispatch(register(name, email, password, cropSelection, fatherName, motherName, spouseName, gender, maritalStatus, country, address, province))
    //     }
    // }

    return (

        <FormContainer>
            <h1 style={{ marginTop: '120px' }}>Sign Up</h1>
            {/* {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name <span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address<span style={{ color: 'red' }}>*</span></Form.Label>
                            <Form.Control
                                type="nic"
                                placeholder="Enter email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                     
                        <Button type="submit" variant="primary">Register</Button>
                    </Col>
                </Row>
            </Form>
            
            <Row className='py-3'>
                <Col style={{ marginBottom: '30px' }}>
                    Have an Account? <Link to={'/'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
}

export default Register
