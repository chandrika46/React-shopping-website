import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Cart.css';

export default function Cart(){
    const items=JSON.parse(localStorage.getItem('cartList'));
    const [cartItemsList,setCartItemsList]=useState(items || []);
    const navigate=useNavigate();

    const handleINCChange =(id)=>{
            setCartItemsList(cartItemsList => cartItemsList.map(item=> {
            return item.key===id?{...item,quantity:item.quantity+(item.quantity < 10? 1 :0)}:item}));
            console.log(cartItemsList.quantity);
            cartItemsList['quantity']=cartItemsList.quantity;
            console.log(cartItemsList.quantity);
            localStorage.setItem('cartList',JSON.stringify(cartItemsList));
    }
    const handleDECChange =(id)=>{
        setCartItemsList(cartItemsList => cartItemsList.map(item=> {
        return item.key===id?{...item,quantity:item.quantity-(item.quantity > 1 ? 1 :0)}:item}));
        localStorage.setItem('cartList',JSON.stringify(cartItemsList));
}

     function handleDelete( id){
         let cartList=cartItemsList;
         cartList=cartList.filter(item=>item.key!==id);
         setCartItemsList(cartList);
         localStorage.setItem('cartList',JSON.stringify(cartList));
     }

     function handleClick(){
          navigate('/itemExlporer');
     }
    return(
        <div>
            <h2>Cart Items</h2>
            <div className='Cart-container'>
            <table className='cart-items'>
                    <thead className='table-header'>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Sub Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    {cartItemsList.map((item)=>( 
                    <tbody> 
                         <tr key={item.key}>
                               <td><h4>{item.productName}</h4></td>
                               <td className='quantity-change-button'>
                                   <button onClick={()=>handleDECChange(item.key)} >-</button>
                                   <span >{item.quantity}</span>
                                   <button onClick={()=>handleINCChange(item.key)}>+</button>
                                </td>
                               <td>{item.price}</td>
                               <td>{item.quantity*item.price}</td>
                               <td className='cart-buttons'>
                               <button onClick={()=>handleDelete(item.key)}>X</button>
                               </td>
                            </tr> 
                    </tbody>
                     ))}
                </table>
                <div>
                <table className="cart-table-footer">
                    <tfoot>
                       <tr>
                         <td><h4>Total Price :</h4></td>
                         <td>
                            <h3>{cartItemsList.reduce((total, item)=>total+(item.price*item.quantity),0)} </h3>
                         </td>
                        </tr>
                    </tfoot>
                </table>
                </div>
            </div>
            <button className='shop-more-button' onClick={handleClick}>Shop More</button>
        </div>
    )
}