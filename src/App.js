import ItemExplorer from './ItemExplorer/ItemExplorer';
import Login from './Login/Login';
import SignUp from './Sign-up/SignUp';
import Cart from './Cart/Cart';
import { Route, Routes , Link } from "react-router-dom";
import './App.css';
import DashBoard from './DashBoard/DashBoard';
import { useState} from 'react';
import WishList from './WishList/WishList';
import PassWordUpdate from './PassWordUpdate/PassWordUpdate';

function App() {
  const [cartItem,setCartItems]=useState([]);
  const loggedUser = JSON.parse(localStorage.getItem('loggedIn') || '[]');
  const [registeredUser,setRegisterUser]=useState(loggedUser.loggedInUser);
  const LoggedInUser= loggedUser.loggedInUser ?`${loggedUser.name}`:'Guest User';

  function handleLoggedInUser(val){
    setRegisterUser(val.loggedInUser);
  }
function handleLogOut(){
   loggedUser['loggedInUser']=false;
   setRegisterUser(loggedUser.loggedInUser);
   localStorage.setItem('loggedIn',JSON.stringify(loggedUser));
  }

// // function addedItemHandler(items){
//   const newItem=cartItem;
//   newItem.push(items);
//   setCartItems(newItem);
//   console.log(cartItem);
// }
  return (
    <div className="App">
      <div className='Header-container'>
        <h2>E-Commerce Website</h2>
        <div className='Login-option'>
         {!registeredUser && <Link to='/sign-up' className='links'>Sign-up</Link>}
         <Link to='/login'  className='links' onClick={handleLogOut}>Logout</Link>
          { registeredUser &&<Link to='/cart'><i className=" links fa-solid fa-cart-shopping"></i></Link>}
          {registeredUser && <Link to ='/dashBoard' className='links'>DashBoard</Link>}
          <div>Welcome <div> {LoggedInUser}</div></div>
        </div>
     </div>
     <Routes>
        <Route path="/itemExlporer" element={<ItemExplorer loggedUser={loggedUser.loggedInUser}/>} />
        <Route path="/wishList" element={<WishList />}/>
        <Route path="/passwordUpdate" element={<PassWordUpdate />}/>
        <Route path="/cart" element={<Cart cartItems={cartItem}/>}/>
        <Route path='/dashBoard' element={<DashBoard loggedInuser={loggedUser}/>} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login handleLoggedInUser={handleLoggedInUser} />}/>
        <Route path='/' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
