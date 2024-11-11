
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import  HeaderComponent  from './components/HeaderComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import DashboardComponent from './components/DashboardComponent';
import Products from './components/Products';
import ProductDescription from './components/ProductDescription';
import UserProfile from './components/UserProfile';
import ContactUs from './components/ContactUs';
import Cart from './components/Cart';
import Checkout from './components/CheckoutInformation';
import CheckoutReceipt from './components/CheckoutReceipt';
import OrderConfirmation from './components/OrderConfirmation';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className= "container">
          <Routes>
              <Route path = "/" element = { <LoginComponent /> }></Route>
              <Route path = "/signup" element = { <RegisterComponent /> }></Route>
              <Route path='/login' element = { <LoginComponent /> }></Route>
              <Route path='/dashboard' element = { <DashboardComponent /> }></Route>
              <Route path='/products' element = { <Products /> }></Route>
              <Route path ='/product/:productId' element = { <ProductDescription /> }></Route>
              <Route path='/profile' element = { <UserProfile /> }></Route>
              <Route path = '/ContactUs' element = { <ContactUs /> }></Route>
              <Route path = '/Cart' element ={ <Cart />}></Route>
              <Route path = '/checkout/customerInformation' element = { <Checkout />}></Route>
              <Route path = '/CheckoutReceipt' element = { <CheckoutReceipt />}></Route>
              <Route path = '/orderConfirmation' element = { <OrderConfirmation />}></Route>
            </Routes>
        </div>  
        <FooterComponent />
        </BrowserRouter>
    </div>
  );
}

export default App;
