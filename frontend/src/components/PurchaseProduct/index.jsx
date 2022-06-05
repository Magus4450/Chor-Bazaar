import React from 'react';
import { LinkContainer } from 'react-router-bootstrap'
import { Card, Col, Button } from 'react-bootstrap';
import './PurchaseProduct.css'


const PurchaseProduct = ({ _id, name, image, price }) => {
    return (
        <Col sm={12} md={6} lg={4}>
            <Card className="my-3 p-3 ">
                <Card.Img className="image card-image mx-auto" src={image} variant="top" />
                <Card.Body>
                   
                        <Card.Title className="title">
                            <strong>{name}</strong>
                        </Card.Title>
                    
                    
                    <Card.Text>
                        <h4>RS.{price}</h4>
                    </Card.Text>
                  
                        <Button className="btn-preview" varient="success" style={{backgroundColor:'black', right: '20px' }}>Preview here</Button>
                   
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PurchaseProduct
