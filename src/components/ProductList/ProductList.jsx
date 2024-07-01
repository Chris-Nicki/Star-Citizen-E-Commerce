import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 

import './ProductList.module.css'

function ProductList() {
  const navigate = useNavigate(); 
  const [ products, setProducts ] = useState([]);
  const [ selectedProductId, setProductId] = useState(null);
    
    
    useEffect( () => {
     
      console.log('Component is Mounted')
      
      async function fetchProducts(){
        try {
          const response = await axios.get("http://127.0.0.1:5000/products")
          setProducts(response.data); 
        } catch (error){
          console.log(error)
        }
        
      }
      
      
      fetchProducts();
      
      
      
    }, []); 
    
    
    useEffect( () => {
      if (selectedProductId !== null){
        alert(`New product selected: ID ${selectedProductId}`)
      }
    }, [selectedProductId]);
    
    function handleProductId(id){
      setProductId(id);
    }
    
    async function handleDeleteProduct(id){
      try {
        const response = await axios.delete(`http://127.0.0.1:5000/products/${id}`)
        console.log(response)
        
        let currentProducts = [ ...products ]
        currentProducts = currentProducts.filter( product => product.product_id != id)
        setProducts(currentProducts)
        
        
      } catch(error){
        console.log(error)
      }
    }
    
  return (
    <Container className="border border-white rounded p-4 w-75">
      <h3>Products</h3>
      <ListGroup>
        {products.map( (product) => (
            <Container key={product.product_id} className="mb-3">
              <ListGroup.Item onClick={ () => handleProductId(product.product_id)} className="li rounded border mb-2">Product Id: {product.product_id}</ListGroup.Item>
              <ListGroup.Item onClick={ () => handleProductId(product.product_id)} className="li rounded border mb-2">Product: {product.name}</ListGroup.Item>
              <ListGroup.Item onClick={ () => handleProductId(product.product_id)} className="li rounded border mb-2">Price: {product.price} UEC</ListGroup.Item>
              <Button onClick={ () => navigate(`/edit-products/${product.product_id}`)} variant="btn btn-primary" size="sm">Edit</Button>
              <Button onClick={ () => handleDeleteProduct(product.product_id)} variant="btn btn-danger" size="sm" className="ms-2">Delete</Button>
            </Container>
        ))}
      </ListGroup>
      {/* {selectedProductId && <ProductList productId={selectedProductId} />} */}
    </Container>
  )
}

export default ProductList
