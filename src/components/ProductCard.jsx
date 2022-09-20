import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
	<>
	
	<Card className='shadow-sm' style={{ width: '18rem' }}>
		<Card.Img src={product.image} />
      <Card.Body>		
        <Card.Title>Title: {product.title}</Card.Title>
		<Card.Title>Price: ${product.price}</Card.Title>		
		<Card.Text>Description: {product.description}</Card.Text>
		<Card.Text>Published: {product.published}</Card.Text>
 		</Card.Body>
		<Link to={`/product/${product.id}`}>
			<Button>Detail</Button>
		</Link>	      
	  
    </Card>
	
	
	</>
  )
}

export default ProductCard