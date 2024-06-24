import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 
// useNavigate allows us to navigate to certain Routes we have defined
// very similar to Link however we can use this in any element



function OrderList() {
  const navigate = useNavigate(); 
  const [ orders, setOrders ] = useState([]);
  const [ selectedOrderId, setOrderId] = useState(null);
    
    // making an API call as soon as we enter the page
    // we want to grab the Customer Information from the server right away & display it!
    useEffect( () => {
      // Similate fetching data from an API
      // alert('Component is Mounted')
      console.log('Component is Mounted')
      
      async function fetchOrders(){
        try {
          const response = await axios.get("http://127.0.0.1:5000/orders")
          setOrders(response.data); //assigning it to state management using useState
        } catch (error){
          console.log(error)
        }
        
      }
      
      
      fetchOrders();
      
      
      // alert('Component is Unmounted')
    }, []); //empty dependency list means this will run as soon as the componnent mounts to DOM but not after
    
    // this useEffect only gets called based on the changes to the selectedCustomerId variable
    useEffect( () => {
      if (selectedOrderId !== null){
        alert(`New order selected: ID ${selectedOrderId}`)
      }
    }, [selectedOrderId]);
    
    function handleOrderId(id){
      setOrderId(id);
    }
    
    async function handleDeleteOrder(id){
      try {
        const response = await axios.delete(`http://127.0.0.1:5000/orders${id}`)
        console.log(response)
        
        let currentOrders = [ ...Orders ]
        currentOrders = currentOrders.filter( orders => orders.order_id != id)
        setOrders(currentOrders)
        
        // window.location.reload()
      } catch(error){
        console.log(error)
      }
    }
    
  return (
    <Container className="border border-white rounded p-4 w-75">
      <h3>Orders</h3>
      <ListGroup>
        {orders.map( (orders) => (
            <Container key={order.order_id} className="mb-3">
              <ListGroup.Item onClick={ () => handleOrderId(order.order_id)} className="li rounded border mb-2">{order.id}</ListGroup.Item>
              <Button onClick={ () => navigate(`/edit-customers/${order.order_id}`)} variant="outline-info" size="sm">Edit</Button>
              <Button onClick={ () => handleDeleteOrder(order.order_id)} variant="outline-danger" size="sm" className="ms-2">Delete</Button>
            </Container>
        ))}
      </ListGroup>
      {selectedOrderId && <OrderList customerId={selectedCustomerId} />}
    </Container>
  )
}

export default OrderList