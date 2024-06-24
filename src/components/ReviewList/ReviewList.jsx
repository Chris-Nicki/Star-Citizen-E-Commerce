
// External Import
import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 




function ReviewList() {
  const navigate = useNavigate(); 
  const [ reviews, setReviews ] = useState([]);
  const [ selectedReviewId, setReviewId] = useState(null);
    
   
    useEffect( () => {
      
      console.log('Component is Mounted')
      
      async function fetchReviews(){
        try {
          const response = await axios.get("http://127.0.0.1:5000/reviews")
          setOrders(response.data); 
        } catch (error){
          console.log(error)
        }
        
      }
      
      
      fetchReviews();
      
      
      
    }, []); 
    
    
    useEffect( () => {
      if (selectedReviewId !== null){
        alert(`New review selected: ID ${selectedReviewId}`)
      }
    }, [selectedReviewId]);
    
    function handleReviewId(id){
      setReviewId(id);
    }
    
    async function handleDeleteReview(id){
      try {
        const response = await axios.delete(`http://127.0.0.1:5000/reviews${id}`)
        console.log(response)
        
        let currentReviews = [ ...Reviews ]
        currentReviews = currentReviews.filter( reviews => reviews.review_id != id)
        setReviews(currentReviews)
        
       
      } catch(error){
        console.log(error)
      }
    }
    
  return (
    <Container className="border border-white rounded p-4 w-75">
      <h3>Reviews</h3>
      <ListGroup>
        {reviews.map( (reviews) => (
            <Container key={reviews.review_id} className="mb-3">
              <ListGroup.Item onClick={ () => handleReviewId(reviews.review_id)} className="li rounded border mb-2">{reviews.id}</ListGroup.Item>
              <Button onClick={ () => navigate(`/edit-reviews/${reviews.review_id}`)} variant="outline-info" size="sm">Edit</Button>
              <Button onClick={ () => handleDeleteReview(review.review_id)} variant="outline-danger" size="sm" className="ms-2">Delete</Button>
            </Container>
        ))}
      </ListGroup>
      {selectedReviewId && <ReviewList reviewId={selectedReviewId} />}
    </Container>
  )
}

export default ReviewList