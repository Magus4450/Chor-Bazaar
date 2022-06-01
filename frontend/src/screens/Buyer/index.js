import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Button, Alert } from 'react-bootstrap'
import PurchaseProduct from '../../components/PurchaseProduct';
import './Product.css'

import Message from './../../components/Message';


import { listProducts } from './../../actions/productAction.js'


const ProductScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { error, product } = productList

    const [numberOfItems, setNumberOfItems] = useState(3);

    useEffect(() => {
        dispatch(listProducts())
      
    }, [dispatch])

    const showMore = () => {
        if (numberOfItems + 3 <= product.length) {
            setNumberOfItems(numberOfItems + 3)
        } else {
            setNumberOfItems(product.length)
        }
    }

    return (

        <div className="ProductScreen">
            <Container>
                <h1 className="p-3" style={{ textAlign: 'center' }}>Latest Products</h1>
                     
                            
                            <Row>
                                {
                                    product
                                        .slice(0, numberOfItems)
                                        .map(product => (
                                            <PurchaseProduct
                                                key={product._id}
                                                _id={product._id}
                                                name={product.name}
                                                image={product.image}
                                                price={product.price}
                                            />
                                        ))
                                }
                                {
                                    numberOfItems >= product.length
                                        ? <Alert style={{ backgroundColor: 'red' }} className="col-md-12 text-center">Finished</Alert>
                                        : ''
                                }
                                <Button className="col-md-12 text-center" variant="success outline-dark" onClick={showMore} style={{backgroundColor:'black'}}>Show more</Button>
                            </Row>
                
            </Container>
        </div>
    )
}

export default ProductScreen
