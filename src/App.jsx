//external imports
import { Routes, Route } from 'react-router-dom';
//internal imports
import HomePage from './components/HomePage/HomePage';
import CustomerList from './components/CustomerList/CustomerList';
import CustomerForm from './components/CustomerForm/CustomerForm';
import NotFound from './components/NotFound/NotFound';
import NavBar from './components/NavBar/NavBar';
import OrderList from './components/OrderList/OrderList';
import OrderForm from './components/OrderForm/OrderFrom';
import ReviewList from './components/ReviewList/ReviewList';
import ReviewForm from './components/ReviewForm/ReviewForm';
import ProductForm from './components/ProductForm/ProductForm';
import ProductList from './components/ProductList/ProductList';

import './App.css'; 

function App() {


  return (
    <div id="app-container">
      <NavBar />
      <Routes>
        {/* 2 most important routes, HomePage/base and then NotFound */}
        <Route path='/' element={ <HomePage />} />
        {/* Catch All Route for undefined paths */}
        <Route path='*' element={ <NotFound />} />
        <Route path='/customers' element={ <CustomerList />} />
        <Route path='/add-customer' element={ <CustomerForm />} />
        <Route path='/edit-customers/:id' element={ <CustomerForm />} />
        <Route path='/orders' element={ <OrderList />} />
        <Route path= '/add-orders' element={ <OrderForm />} />
        <Route path='/edit-orders/:id' element={ <OrderForm />} />
        <Route path='/reviews' element={ <ReviewList />} />
        <Route path='/add-reviews' element={ <ReviewForm />} />
        <Route path='/edit-reviews' element={ <ReviewForm />} />
        <Route path='/products' element={ <ProductList />} />
        <Route path='/add-products' element={ <ProductForm />} />
        <Route path='/edit-products' element={ <ProductForm />} />
      </Routes>
    </div>
  )
}

export default App
