import React, {useState} from 'react'
import {Form, Container, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const api = axios.create({
	baseURL: "http://localhost:8080/api/products",
});



const EditProduct = () => {

	const [title, setTitle] = useState('')
	const [price, setPrice] = useState(0)
	const [description, setDescription] = useState('')

	const {id} = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		const getDataById = async () => {
			const {data} = await api.get(`/${id}`)
			setTitle(data.title)
			setPrice(data.price)
			setDescription(data.description)
		}
		getDataById()
	} , [id])


	const updateHandler = async (e) => {
		e.preventDefault()
		const {data} = await api.put(`/${id}`, {
			title,
			price,
			description,
			published: true,
		})
		console.log(data)
		navigate('/products')
	}
  return (
	<>
	<Container className='mt-5
		 p-2'>
			<h1>Edit Product</h1>
			<hr />
	<Form onSubmit={updateHandler}>

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
        Edit Product
      </Button>
    </Form>
		</Container>
	</>
  )
}

export default EditProduct