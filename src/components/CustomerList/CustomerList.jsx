import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 
// useNavigate allows us to navigate to certain Routes we have defined
// very similar to Link however we can use this in any element

//internal import
import OrderList from '../OrderList/OrderList';

function CustomerList() {
  const navigate = useNavigate(); 
  const [ customers, setCustomers ] = useState([]);
  const [ selectedCustomerId, setCustomerId] = useState(null);
    
    // making an API call as soon as we enter the page
    // we want to grab the Customer Information from the server right away & display it!
    useEffect( () => {
      // Similate fetching data from an API
      // alert('Component is Mounted')
      console.log('Component is Mounted')
      
      async function fetchCustomers(){
        try {
          const response = await axios.get("http://127.0.0.1:5000/customer")
          setCustomers(response.data); //assigning it to state management using useState
        } catch (error){
          console.log(error)
        }
        
      }
      
      
      fetchCustomers();
      
      
      // alert('Component is Unmounted')
    }, []); //empty dependency list means this will run as soon as the componnent mounts to DOM but not after
    
    // this useEffect only gets called based on the changes to the selectedCustomerId variable
    useEffect( () => {
      if (selectedCustomerId !== null){
        alert(`New customer selected: ID ${selectedCustomerId}`)
      }
    }, [selectedCustomerId]);
    
    function handleCustomerId(id){
      setCustomerId(id);
    }
    
    async function handleDeleteCustomer(id){
      try {
        const response = await axios.delete(`http://127.0.0.1:5000/customers${id}`)
        console.log(response)
        
        let currentCustomers = [ ...customers ]
        currentCustomers = currentCustomers.filter( customer => customer.customer_id != id)
        setCustomers(currentCustomers)
        
        // window.location.reload()
      } catch(error){
        console.log(error)
      }
    }
    
  return (
    <Container className="border border-white rounded p-4 w-75">
      <h3>Customers</h3>
      <ListGroup>
        {customers.map( (customers) => (
            <Container key={customer.customer_id} className="mb-3">
              <ListGroup.Item onClick={ () => handleCustomerId(customer.customer_id)} className="li rounded border mb-2">{customer.name}</ListGroup.Item>
              <Button onClick={ () => navigate(`/edit-customers/${customer.customer_id}`)} variant="outline-info" size="sm">Edit</Button>
              <Button onClick={ () => handleDeleteCustomer(customer.customer_id)} variant="outline-danger" size="sm" className="ms-2">Delete</Button>
            </Container>
        ))}
      </ListGroup>
      {selectedCustomerId && <OrderList customerId={selectedCustomerId} />}
    </Container>
  )
}

export default CustomerList
