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
import { createProduct } from '../../actions/productAction'


const SellProduct = ({ location, history }) => {

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [tags, settags] = useState('')
    const [discount, setDiscount] = useState('')
    const [quantity, setQuantity] = useState('')
    const [description, setDescription] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {
        if (!userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])
    const submitHandler = async(e) => {
        e.preventDefault()
        await dispatch(createProduct(name,category,price,tags,discount,quantity,description))
            setMessage('');
      
    }

    return (
        <FormContainer>
           
            <h1 style={{ marginTop: '120px' }}>Sell Product</h1>
            {message && <Message variant='danger'>{message}</Message>}
           
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label style={{ marginTop: '10px'}}>Email Product Name<span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter Product Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                
                <Form.Group controlId='price'>
                    <Form.Label style={{ marginTop: '10px'}}>Enter Price <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="numeric"
                        placeholder="Enter Price"
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='tags'>
                    <Form.Label style={{ marginTop: '10px'}}>Tags <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Ex:(jeans,fashion)"
                        value={tags}
                        required
                        onChange={(e) => settags(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='discount'>
                    <Form.Label style={{ marginTop: '10px'}}>Discount <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="numeric"
                        placeholder="Enter Discount"
                        value={discount}
                        required
                        onChange={(e) => setDiscount(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='quantity'>
                    <Form.Label style={{ marginTop: '10px'}}>Quantity <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="numeric"
                        placeholder="Enter Quantity of you product"
                        value={quantity}
                        required
                        onChange={(e) => setQuantity(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group>
                        <Form.Label style={{ marginTop: '10px'}}>Select Category <span style={{ color: 'red' }}>*</span></Form.Label>

                        <div className='container  p-1'>
                <select Classname="custom select" 
                 required
                 style={{fontSize: 17, color: 'grey'}}
                onChange={(e) => {
                    const selectedCategory = e.target.value;
                   
                    setCategory(selectedCategory)
                }}
                >
                    <option value={""}> Select Category  </option>

                    <option value="Clothing" >Clothing</option>
                    
                    <option value="Electronic" > Electronic </option>

                    <option value="Tools" > Tools </option>

                    <option value="Movies" > Movies </option>

                    <option value="Daily Appliances" > Daily Appliances </option>

                    <option value="Outdoor" > Outdoor </option>

                    </select>
                    
                    </div>

                    </Form.Group>
               
                <Form.Group controlId='description'>
                    <Form.Label style={{ marginTop: '10px'}}>Description <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        type="description"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" style={{ marginTop: '10px', backgroundColor:"black"}}>Sell</Button>
            </Form>
           
        </FormContainer>
    )
}

export default SellProduct
