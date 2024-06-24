import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 


function CustomerList() {
  const navigate = useNavigate(); 
  const [ products, setProducts ] = useState([]);
  const [ selectedProductId, setProductId] = useState(null);
    
    
    useEffect( () => {
     
      console.log('Component is Mounted')
      
      async function fetchProducts(){
        try {
          const response = await axios.get("http://127.0.0.1:5000/products")
          setCustomers(response.data); 
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
        const response = await axios.delete(`http://127.0.0.1:5000/products${id}`)
        console.log(response)
        
        let currentProducts = [ ...products ]
        currentProducts = currentProducts.filter( product => product.product_id != id)
        setCustomers(currentProduct)
        
        
      } catch(error){
        console.log(error)
      }
    }
    
  return (
    <Container className="border border-white rounded p-4 w-75">
      <h3>Products</h3>
      <ListGroup>
        {products.map( (products) => (
            <Container key={products.product_id} className="mb-3">
              <ListGroup.Item onClick={ () => handleProductId(products.product_id)} className="li rounded border mb-2">{product.name}</ListGroup.Item>
              <Button onClick={ () => navigate(`/edit-products/${products.product_id}`)} variant="outline-info" size="sm">Edit</Button>
              <Button onClick={ () => handleDeleteProduct(products.product_id)} variant="outline-danger" size="sm" className="ms-2">Delete</Button>
            </Container>
        ))}
      </ListGroup>
      {selectedProductId && <ProductList productId={selectedProductId} />}
    </Container>
  )
}

export default CustomerList
