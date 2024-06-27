
// External Import
import { useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'; 

//internal import
import style from './OrderForm.module.css'

function OrderForm() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [validated, setValidated] = useState(false); 
  const [show, setShow] = useState(false); 
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState("Success!");
  const [formData, setFormData] = useState({
    customerId: "",
    date: "",
    productId: ""
    
  })

 function handleChange(event){
    console.log(event.target)
    
    const { name, value } = event.target; 
    console.log(name, value)
    setFormData({ ...formData, [name]: value }) 
    console.log(formData)
  }
  
  async function handleSubmit(event){
    event.preventDefault();
    console.log(event);
    const form = event.target; 
    
    
    if (form.checkValidity() === false && id === undefined){
      event.stopPropagation();
      setValidated(true); 
    } else {
          if (id) {
              try {
              const response = await axios.put(` http://127.0.0.1:5000/orders`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "application/json"
                    }
                  }
                )
            
              console.log(response)
              setMessage(`Successfully Updated Order: ${formData.order}`)
              // alert(`Updated Customer: ${formData.name}`)
              } catch(error) {
                console.log(error)
                setMessageType("Error")
                setMessage("Error Updating Order to the Server. Please Try Again")
              }
          } else {
            
                  try {
                  const response = await axios.post(`http://127.0.0.1:5000/orders`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "application/json"
                      }
                    }
                  )
                  
                  console.log(response)
                  setMessage(`Successfully Added Order: ${formData.order}`)
                  // alert(`Submitted Customer: ${formData.name}`)
                  
                } catch(error) {
                  console.log(error)
                  setMessageType("Error")
                  setMessage("Error Adding Order to the Server. Please Try Again")
                }
        
          }
    
      setShow(true);
      
    }
  }
  
  function handleClose(){
    setShow(false);
    navigate('/orders');
  }
  
  return (
    <Container>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="border border-white rounded p-4">
      <h3>Add/Edit Orders</h3>
      <FloatingLabel
        htmlFor="customerId"
        label="Customer Id"
        className="mb-3 text-dark">
        {/* determine why we can't adjust the Form.Control height with the size attribute */}
        <Form.Control type="text" size="sm" id="customerId" name="customerId" pattern="[\d]{1}*" placeholder="Customer Id" onChange={handleChange} required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please Enter a Customer ID</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
        htmlFor="date"
        label="Date"
        className="mb-3 text-dark">
        <Form.Control type="date" size="sm" id="date" name="date"  onChange={handleChange} required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please Enter a Valid Date</Form.Control.Feedback>
        </FloatingLabel>
    
        <FloatingLabel
        htmlFor="productId"
        label="Product Id"
        className="mb-3 text-dark">
        <Form.Control type="text" id="productId" name="productId" pattern="[\d]{1}*" placeholder="Product Id here" onChange={handleChange} required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please Enter a Valid Product Id</Form.Control.Feedback>
        </FloatingLabel>
      
      <Button type="submit" className={`${style.button} btn btn-primary w-25`}>Submit</Button>
    </Form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{messageType}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{message}</Modal.Body>
        </Modal>
    </Container>
  )
  
}
export default OrderForm
