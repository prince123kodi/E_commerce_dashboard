import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom"
import Dashboard from './container/Dashboard';
import Header from './component/Header';
import Footer from './component/Footer';
import AddAdmin from './container/AddAdmin';
import Login from './container/Login';
import Register from './container/Register';
import Viewadmin from './container/Viewadmin';
import Category from './container/Category';
import Addproduct from './container/Addproduct';

function App() {

  let sessionData = sessionStorage.getItem('username');
  return (
    <div className='d-flex flex-column'>

      {sessionData !== null?<Header />:""}
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/addadmin' element={<AddAdmin/>}/>
        <Route path="/view_admin" element={<Viewadmin />} />
        <Route path='/add_category' element={<Category/>} />
        <Route path="/add_product" element={<Addproduct /> } />
        <Route path="/register" element={<Register/>}/>
        {sessionData !== null?<Route path="/dashboard" element={<Dashboard/>}/> :<Route path='/' element={<Login/>}/>}
      </Routes>
      {sessionData !== null?<Footer /> :""}
    </div>
  );
}

export default App;
