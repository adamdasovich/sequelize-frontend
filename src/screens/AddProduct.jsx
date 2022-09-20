import React, {useState} from 'react'
import {Form, Container, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

const api = axios.create({
	baseURL: "http://localhost:8080/api/products",
});

const AddProduct = () => {
	const [title, setTitle] = useState('')
	const [price, setPrice] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')

	const navigate = useNavigate()

	const addProductHandler = async (e) => {
		e.preventDefault()
		//const product = {
		//	title,
		//	price,
		//	description,
		//	published: true,
		//}
		const formData = new FormData()
		formData.append('image', image)
		formData.append('title', title)
		formData.append('price', price)
		formData.append('description', description)
		formData.append('published', true)


		const {data} = await api.post('addProduct', formData)
		console.log(data)
		navigate('/products')
	}


  return (
	<>
	<Container className='mt-5
		 p-2'>
			<h1>Add Product</h1>
			<hr />
	<Form onSubmit={addProductHandler} method='POST' encType='multipart/form-data'>

	<Form.Group controlId="fileName" className='mb-3'>
		<Form.Label>Upload Image</Form.Label>
		<Form.Control 
			type='file' 
			name='image'
			onChange={(e) => setImage(e.target.files[0])} 
			size='lg' />
	</Form.Group>

      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control 
			value={title}
			onChange={(e) => setTitle(e.target.value)}
			type="text"
			  />        
      </Form.Group>

	  <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price ($)</Form.Label>
        <Form.Control 
			value={price}
			onChange={(e) => setPrice(e.target.value)}
			type="number"  />        
      </Form.Group>

	  <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control 
			value={description}
			onChange={(e) => setDescription(e.target.value)}
			as='textarea'  />        
      </Form.Group>


      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
		</Container>
	</>
  )
}

export default AddProduct