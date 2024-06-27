
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
import style from './ReviewForm.module.css'

function ReviewForm() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [validated, setValidated] = useState(false); 
  const [show, setShow] = useState(false); 
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState("Success!");
  const [formData, setFormData] = useState({
    productId: "",
    customerId: "",
    date: "",
    rating: "",
    review: ""
    
  })

 function handleChange(event){
    console.log(event.target)
    
    const { productId, value } = event.target; 
    console.log(productId, value)
    setFormData({ ...formData, [productId]: value }) 
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
              const response = await axios.put(` http://127.0.0.1:5000/reviews`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "application/json"
                    }
                  }
                )
            
              console.log(response)
              setMessage(`Successfully Updated Review: ${formData.review}`)
              
              } catch(error) {
                console.log(error)
                setMessageType("Error")
                setMessage("Error Updating Review to the Server. Please Try Again")
              }
          } else {
            
                  try {
                  const response = await axios.post(`http://127.0.0.1:5000/reviews`,
                    formData,
                    {
                      headers: {
                        "Content-Type": "application/json"
                      }
                    }
                  )
                  
                  console.log(response)
                  setMessage(`Successfully Added Review: ${formData.review}`)
                  
                  
                } catch(error) {
                  console.log(error)
                  setMessageType("Error")
                  setMessage("Error Adding Review to the Server. Please Try Again")
                }
        
          }
    
      setShow(true);
      
    }
  }
  
  function handleClose(){
    setShow(false);
    navigate('/reviews');
  }
  
  return (
    <Container>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="border border-white rounded p-4">
      <h3>Add/Edit Reviews</h3>

      <FloatingLabel
        htmlFor="productId"
        label="Product Id"
        className="mb-3 text-dark">
        <Form.Control type="text" id="productId" name="productId" pattern="[\d]{1}*" placeholder="Product Id here" onChange={handleChange} required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please Enter a Valid Product Id</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
        htmlFor="customerId"
        label="Customer Id"
        className="mb-3 text-dark">
        <Form.Control type="text" size="sm" id="customerId" name="customerId" pattern="[\d]{1}" placeholder="Customer Id" onChange={handleChange} required/>
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
        htmlFor="rating"
        label="Rating"
        className="mb-3 text-dark">
        <Form.Control type="text" size="sm" id="rating" name="rating" pattern="[\d]{1}" placeholder="Please enter A 1-5 Rating" onChange={handleChange} required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please Enter a Rating</Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel
        htmlFor="review"
        label="review"
        className="mb-3 text-dark">
        {/* determine why we can't adjust the Form.Control height with the size attribute */}
        <Form.Control type="text" size="sm" id="review" name="review" pattern="\w+(?:\s+\w+)**" placeholder="Customer Id" onChange={handleChange} required/>
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">Please Enter a Review</Form.Control.Feedback>
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
export default ReviewForm
