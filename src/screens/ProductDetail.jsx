import React, {useEffect, useState} from 'react'
import { Card, Button, Container, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router'


const api = axios.create({
	baseURL: "http://localhost:8080/api/products",
});

const ProductDetail = () => {

	const {id} = useParams()
	const navigate = useNavigate()
	
	const [title, setTitle] = useState('')
	const [price, setPrice] = useState(0)
	const [productDescription, setProductDescription] = useState('')
	const [published, setPublished] = useState(true)
	const [image, setImage] = useState('')
	
	// rating, reviewDescription
	const [reviews, setReviews] = useState([])
	const [description, setDescription] = useState('')
	const [rating, setRating] = useState(0)

	useEffect(() => {
		const getSingleProductData = async () => {
			const {data} = await api.get(`/reviews/${id}`)
			console.log(data)

			setTitle(data[0].title)
			setPrice(data[0].price)
			setProductDescription(data[0].description)
			setPublished(data[0].published)
			setImage(data[0].image)
			// for reviews
			setReviews(data[0].review)
		}
		getSingleProductData()
	},[id])

	//handle delete
	const deleteHandler = async () => {
		const {data} = await api.delete(`/${id}`)
		console.log(data)
		navigate('/products')
	}
	//handle add review
	const addReviewHandler = async (e) => {
		e.preventDefault()
		const {data} = await api.post(`/addReview/${id}`, {
			description,
			rating,
			product_id: id
		})
		console.log(data)
		navigate('/products')
	}

  return (
	<>
	<Container>
		<h1>Product Detail</h1>	
	<Card className='shadow-sm' style={{ width: '18rem' }}>
		<Card.Img src={`http://localhost:3000/${image}`} />
      <Card.Body>
        <Card.Title>Title: {title}</Card.Title>
		<Card.Title>Price: ${price}</Card.Title>
		<Card.Text>Description: {productDescription}</Card.Text>
		<Card.Text>
			Published: {published ? (<small>True</small>) : (<small>False</small>)}
		</Card.Text>
		<br />

		<h4>Reviews: </h4><br />
		{reviews.length > 0 ? (
			reviews.map(review => {
			return <p key={review.id}>Rating: {review.rating} <br /> {review.description}</p>
			})
		):(<p>No reviews for this product</p>)
		}		
 	
		<Link to={`/product/edit/${id}`}>
			<Button>Edit</Button>
		</Link>
		
			<Button 
			onClick={() => deleteHandler(id)}
			className="btn btn-danger m-2">Delete</Button>		      
	  </Card.Body>
    </Card>
	</Container>
	<Container>
		<h2>Add Review</h2>
		<hr />
	<Form onSubmit={addReviewHandler}>

      <Form.Group className="mb-3" controlId="rating">
        <Form.Label>Rating</Form.Label>
        <Form.Control 
			value={rating}
			onChange={(e) => setRating(e.target.value)}
			type="number"
			  />        
      </Form.Group>

	  <Form.Group className="mb-3" controlId="reviewDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control 
			value={description}
			onChange={(e) => setDescription(e.target.value)}
			as='textarea'  />        
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Review
      </Button>
    </Form>
	</Container>
	</>
  )
}

export default ProductDetail